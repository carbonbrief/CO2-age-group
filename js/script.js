// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
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
    y.domain([0, d3.max(data, function(d) {
        return Math.max(d.national, d.global); })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#2f8fce")
        .attr("d", valueline);

    // Add the valueline2 path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#c7432b")
        .attr("d", valueline2);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

});

function update () {

    console.log("change");

}

document.getElementById('selectorRegion').addEventListener("change", update);
document.getElementById('selectorScenario').addEventListener("change", update);