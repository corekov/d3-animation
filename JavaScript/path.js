function createPathG() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")

    let data = [];
    const padding = 100;
    //начальное положение рисунка
    let posX = padding;
    let posY = height - padding;
    const h = 5;
    // координаты y - уменьшаются, x - постоянны
    while (posY > padding) {
        data.push( {x: posX, y: posY});
        posY -= h;
    }
    // координаты y - постоянны, x - увеличиваются
    while (posX < width - padding) {
        data.push( {x: posX, y: posY});
        posX += h;
    }
    return data
}

// создаем массив точек, расположенных по кругу
function createPathCircle() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    // используем параметрическую форму описания круга
    // центр расположен в центре svg-элемента, а радиус равен трети высоты/ширины
    for (let t = 0 ; t <= Math.PI * 2; t += 0.1) {
        data.push(
            {x: width / 2 + width / 3 * Math.sin(t),
                y: height / 2 + height / 3 * Math.cos(t)}
        );
    }
    return data;
}

// движение по отрицательной параболе
function createPathParabola() {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    
    let data = [];
    const padding = 100;
    const h = 5;
    
    // Центр параболы по горизонтали
    const centerX = width / 2;
    // Максимальная высота параболы (от верха SVG)
    const parabolaHeight = height - 2 * padding;
    // Ширина параболы
    const parabolaWidth = width - 2 * padding;
    
    // Генерируем точки от левого края до правого
    for (let x = padding; x <= width - padding; x += h) {
        // Нормализованное положение x от -1 до 1
        const normalizedX = (x - centerX) / (parabolaWidth / 2);
        // Вычисляем y по квадратичной функции (перевернутая парабола)
        const y = height - padding - (1 - normalizedX * normalizedX) * parabolaHeight;
        
        data.push({ x: x, y: y });
    }
    
    return data;
}

// рисуем путь
let drawPath = (typePath) => {
    // создаем массив точек
    if(typePath == 0) {
        dataPoints = createPathG();
    } else if(typePath == 1) {
        dataPoints = createPathCircle();
    } else {
        dataPoints = createPathParabola();
    }

    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    const svg = d3.select("svg")
    // создаем путь на основе массива точек
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('stroke', 'none')
        .attr('fill', 'none')
    return path;
}

function translateAlong(path, data) {
    const length = path.getTotalLength();
    const xDiff = (data[1] - data[0]);
    const yDiff = (data[3] - data[2]);
    const angleDiff = (data[5] - data[4]);

    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            const xscale = data[0] + xDiff*t;
            const yscale = data[2] + yDiff*t;
            const angle = data[4] + angleDiff*t;

            return `translate(${x},${y}) scale(${xscale}, ${yscale}) rotate(${angle})`;
        }
    }
}