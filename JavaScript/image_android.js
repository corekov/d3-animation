// изображение android'a относительно точки (0, 0)
function drawAndroid(svg) {
    // группа для робота
    let android = svg.append("g")
        .attr("transform", "translate(0, 0)");

    // Голова (зелёный полукруг с круглыми глазами и палками)
    // полукруг вверх
    const arc = d3.arc()
        .innerRadius(0)          // 0 = заполненный полукруг
        .outerRadius(40)         // Радиус
        .startAngle(-(Math.PI / 2)) //-90°
        .endAngle(Math.PI / 2);     //90°
    // Рисуем полукруг
    android.append("path")
        .attr("d", arc())
        .attr("transform", "translate(0, -15)")
        .style("fill", "#A4C639");  // Зелёный (как у Android)

    // Глаза
    //левый
    android.append("circle")
        .attr("cx", -20)
        .attr("cy", -35)
        .attr("r", 5)
        .style("fill", "white");
    //правый
    android.append("circle")
        .attr("cx", 20)
        .attr("cy", -35)
        .attr("r", 5)
        .style("fill", "white");

    // Тело (основной прямоугольник)
    android.append("rect")
        .attr("x", -40)
        .attr("y", -12)
        .attr("width", 80)
        .attr("height", 60)
        .attr("rx", 12)
        .style("fill", "#A4C639");
    //чтобы были острые углы сверху
    android.append("rect")
        .attr("x", -40)
        .attr("y", -12)
        .attr("width", 80)
        .attr("height", 20)
        .style("fill", "#A4C639");

    // Руки
    //левая
    android.append("rect")
        .attr("x", -58)
        .attr("y", -12)
        .attr("width", 15)
        .attr("height", 50)
        .attr("rx", 8)
        .style("fill", "#A4C639");
    //правая
    android.append("rect")
        .attr("x", 43)
        .attr("y", -12)
        .attr("width", 15)
        .attr("height", 50)
        .attr("rx", 8)
        .style("fill", "#A4C639");

    // Ноги
    // левая 
    android.append("rect")
        .attr("x", -25)
        .attr("y", 25)
        .attr("width", 15)
        .attr("height", 50)
        .attr("rx", 8)
        .style("fill", "#A4C639");
    // правая
    android.append("rect")
        .attr("x", 10)
        .attr("y", 25)
        .attr("width", 15)
        .attr("height", 50)
        .attr("rx", 8)
        .style("fill", "#A4C639");

    // Антенны
    //левая
    android.append("line")
        .attr("x1", -15)
        .attr("y1", -50)
        .attr("x2", -25)
        .attr("y2", -70)
        .style("stroke", "#A4C639")
        .style("stroke-width", 3);
    //правая
    android.append("line")
        .attr("x1", 15)
        .attr("y1", -50)
        .attr("x2", 25)
        .attr("y2", -70)
        .style("stroke", "#A4C639")
        .style("stroke-width", 3);

    return android;
}