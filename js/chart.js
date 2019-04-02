// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.age); })
    .y(function(d) { return y(d.global); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.age); })
    .y(function(d) { return y(d.national); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Define the axes
var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

// Get the data
d3.csv("./new-data/United Kingdom_2.6.csv", function(error, data) {

    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.age = d.ages;
        d.global = +d.global;
        d.national = +d.national;
    });
    
    console.log("data loaded");

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.age; }));
    // y.domain([-100, d3.max(data, function(d) {return Math.max(d.national, d.global); })]);
    y.domain([-100, 1600]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line global")
        .style("stroke", "#2f8fce")
        .attr("d", valueline);

    // Add the valueline2 path.
    svg.append("path")
        .data([data])
        .attr("class", "line national")
        .style("stroke", "#c7432b")
        .attr("d", valueline2);

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

let region = "United Kingdom";
let scenario = "2.6";

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
        x.domain(d3.extent(data, function(d) { return d.age; }));
        // y.domain([-100, d3.max(data, function(d) {return Math.max(d.national, d.global); })]);
        y.domain([-100, 1600]);

        svg = d3.select("#chart").transition();

        svg.select(".global")   // change the line
            .duration(750)
            .attr("d", valueline(data));
        svg.select(".national")   // change the line
            .duration(750)
            .attr("d", valueline2(data));
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

    });

}