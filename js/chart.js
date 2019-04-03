// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let tickValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

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

const rx = 2.5;
const ry = 2.5;

// Get the data
d3.csv("./new-data2/United Kingdom_national.csv", function(error, data) {

    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.age = d.ages;
        d.onepointfive = +d["1.5C"];
        d.two = +d["2C"];
    });

    // Scale the range of the data
    x.domain(data.map(function(d) { return d.age; }));
    y.domain([-100, 1600]);

    // append the rectangles for 2C
    svg.selectAll(".bar1")
        .data(data)
        .enter().append("path")
        .attr("class", "bar1")
        .attr("d", d => `
            M${x(d.age)},${y(d.two) + ry}
            a${rx},${ry} 0 0 1 ${rx},${-ry}
            h${x.bandwidth() - 2 * rx}
            a${rx},${ry} 0 0 1 ${rx},${ry}
            v${height - y(d.two) - ry}
            h${-(x.bandwidth())}Z
            `)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    // append the rectangles for 1.5C
    svg.selectAll(".bar2")
        .data(data)
        .enter().append("path")
        .attr("class", "bar2")
        .attr("d", d => `
            M${x(d.age)},${y(d.onepointfive) + ry}
            a${rx},${ry} 0 0 1 ${rx},${-ry}
            h${x.bandwidth() - 2 * rx}
            a${rx},${ry} 0 0 1 ${rx},${ry}
            v${height - y(d.onepointfive) - ry}
            h${-(x.bandwidth())}Z
            `)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

        function mouseover (d) {

            d3.select(this)
            .transition()
            .duration(200)
            .style("stroke-width", 1);

            div.html(
                "<p><b>Age:</b>" + d.age + "</p>" +
                "<p><div class='tooltip-key' style='background-color: #2f8fce;'></div><p class='inline'>" + d.onepointfive + "</p></p>" +
                "<p><div class='tooltip-key' style='background-color: #c7432b;'></div><p class='inline'>" + d.two + "</p></p>"
            )
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 20) + "px");

            div.transition()
            .duration(100)
            .style("opacity", .9);
    
        }
        
        function mouseout () {
            d3.select(this)
            .transition()
            .duration(200)
            .style("stroke-width", "0px");
            // hide tooltip
            div.transition()
            .duration(100)
            .style("opacity", 0);
        }  


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

    let file = "./new-data2/" + region + "_" + emissions + ".csv";

    console.log(file);

    // Get the data
    d3.csv(file, function(error, data) {

        if (error) throw error;

        // format the data
        data.forEach(function(d) {
            d.age = d.ages;
            d.onepointfive = +d["1.5C"];
            d.two = +d["2C"];
        });
        
        console.log("data loaded");

        // Scale the range of the data
        x.domain(data.map(function(d) { return d.age; }));
        y.domain([-100, 1600]);

        svg.selectAll(".bar1")
            .data(data)
            .transition()
            .delay(function(d, i) {
                return i * 2;
            })
            .duration(750)
            .attr("d", d => `
                M${x(d.age)},${y(d.two) + ry}
                a${rx},${ry} 0 0 1 ${rx},${-ry}
                h${x.bandwidth() - 2 * rx}
                a${rx},${ry} 0 0 1 ${rx},${ry}
                v${height - y(d.two) - ry}
                h${-(x.bandwidth())}Z
            `);

        svg.selectAll(".bar3")
            .data(data)
            .transition()
            .delay(function(d, i) {
                return i * 2;
            })
            .duration(750)
            .attr("d", d => `
                M${x(d.age)},${y(d.two) + ry}
                a${rx},${ry} 0 0 1 ${rx},${-ry}
                h${x.bandwidth() - 2 * rx}
                a${rx},${ry} 0 0 1 ${rx},${ry}
                v${height - y(d.two) - ry}
                h${-(x.bandwidth())}Z
            `);

        svg.selectAll(".bar2")
            .data(data)
            .transition()
            .delay(function(d, i) {
                return i * 2;
            })
            .duration(750)
            .attr("d", d => `
                M${x(d.age)},${y(d.onepointfive) + ry}
                a${rx},${ry} 0 0 1 ${rx},${-ry}
                h${x.bandwidth() - 2 * rx}
                a${rx},${ry} 0 0 1 ${rx},${ry}
                v${height - y(d.onepointfive) - ry}
                h${-(x.bandwidth())}Z
            `);

        svg.selectAll(".bar1")
            .style("fill", "#E3A195")
            .filter(function(d) { return d.age == age; })
            .style("fill", "#CC5540");

        svg.selectAll(".bar2")
            .style("fill", "#97C7E6")
            .filter(function(d) { return d.age == age; })
            .style("fill", "#439AD2");

        // svg.selectAll(".bar3")
        //     .style("opacity", 0)
        //     .filter(function(d) { return d.age == age; })
        //     .style("opacity", "0.2");

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