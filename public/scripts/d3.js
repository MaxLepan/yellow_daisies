const data = d3.json("bellis.json");
const width = 200,
    scaleFactor = 10,
    barHeight = 20;

const graph = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", barHeight * data.length);

const bar = graph.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    });

bar.append("rect")
    .attr("width", function(d) {
    return d * scaleFactor;
})
    .attr("height", barHeight - 1);

    bar.append("text")
    .attr("x", function(d) { return (d*scaleFactor); })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });



