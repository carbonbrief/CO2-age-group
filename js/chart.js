// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let tickValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// set the ranges
var x = d3.scaleBand().range([0, width]).padding(0.1);
var y = d3.scaleLinear().range([height, 0]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Define the axes
var xAxis = d3.axisBottom(x).tickValues(tickValues);
var yAxis = d3.axisLeft(y);

const rx = 2;
const ry = 2;

// Get the data
d3.csv("./new-data/United Kingdom_2.6.csv", function(error, data) {

    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.age = d.ages;
        d.global = +d.global;
        d.national = +d.national;
    });

    // Scale the range of the data
    x.domain(data.map(function(d) { return d.age; }));
    y.domain([-100, 1600]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("path")
        .attr("class", "bar")
        .attr("d", d => `
            M${x(d.age)},${y(d.national) + ry}
            a${rx},${ry} 0 0 1 ${rx},${-ry}
            h${x.bandwidth() - 2 * rx}
            a${rx},${ry} 0 0 1 ${rx},${ry}
            v${height - y(d.national) - ry}
            h${-(x.bandwidth())}Z
            `);

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")
        .attr("class", "axis label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Tons of CO2");

    svg.append("text")
        .attr("class", "axis label")
        .attr("y", 0 + (height + margin.bottom - 15))
        .attr("x",0 + (width/2))
        .attr("dy", ".5em")
        .style("text-anchor", "middle")
        .text("Age");

});

function update () {

    let file = "./new-data/" + region + "_" + scenario + ".csv";

    console.log(file);

    // Get the data
    d3.csv(file, function(error, data) {

        if (error) throw error;

        // format the data
        data.forEach(function(d) {
            d.age = d.ages;
            d.global = +d.global;
            d.national = +d.national;
        });
        
        console.log("data loaded");

        // Scale the range of the data
        x.domain(data.map(function(d) { return d.age; }));
        y.domain([-100, 1600]);

        svg.selectAll(".bar")
            .data(data)
            .transition()
            .delay(function(d, i) {
                return i * 2;
            })
            .duration(750)
            .attr("d", d => `
                M${x(d.age)},${y(d[emissions]) + ry}
                a${rx},${ry} 0 0 1 ${rx},${-ry}
                h${x.bandwidth() - 2 * rx}
                a${rx},${ry} 0 0 1 ${rx},${ry}
                v${height - y(d[emissions]) - ry}
                h${-(x.bandwidth())}Z
            `);

        svg.selectAll(".bar")
            .style("opacity", 0.4)
            .filter(function(d) { return d.age == age; })
            .style("opacity", 1);

        // svg.select(".x.axis") // change the x axis
        //     .transition()
        //     .duration(750)
        //     .call(xAxis);
        // svg.select(".y.axis") // change the y axis
        //     .transition()
        //     .duration(750)
        //     .call(yAxis);

    });

}