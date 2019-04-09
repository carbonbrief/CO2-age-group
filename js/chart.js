// set the dimensions and margins of the graph
var margin = {top: 70, right: 50, bottom: 50, left: 50},
    width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

let tickValues = [1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// set the ranges
var x = d3.scaleBand().range([width, 0]).padding(0.12);
var y = d3.scaleLinear().range([height, 0]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .attr('transform', 'translate(0,-7)')
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var zeroLine = d3.line()
    .x(function(d) { return x(d.age); })
    .y(function(d) { return y(0); });

// Define the axes
var xAxis = d3.axisBottom(x).tickValues(tickValues);
var yAxis = d3.axisLeft(y);

const decimalFormat = d3.format(".0f");
const decimalFormat2 = d3.format(".1f");
const rx = 2;
const ry = 2;

let budgetUser;
let budgetReference;

let line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.x) + 3; })
    .y(function(d) { return y(d.y); });

// Get the data
d3.csv("./data/United Kingdom_national.csv", function(error, data) {

    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.age = d.birth_year;
        d.onepointfive = +d["1.5C"];
        d.two = +d["2C"];
    });

    // Scale the range of the data
    x.domain(data.map(function(d) { return d.age; }));
    y.domain([-200, 1400]);

    // Add the line at the origin
    svg.append("path")
        .data([data])
        .attr("class", "zero-line")
        .attr("d", zeroLine);

    // ADD GENERATION LABELS

    // Pre Gen Z
    svg.append("rect")
    .attrs({ x: x(2013), y: y(0), width: ((x(2017) + x.bandwidth()) - x(2013)), height: 20, rx: 2, ry: 2, "class": "bar-label" });

    // Gen Z
    svg.append("rect")
    .attrs({ x: x(1997), y: y(0), width: (x(2013) - x(1997)), height: 20, rx: 2, ry: 2, "class": "bar-label" });

    svg.append("text")
    .attrs({x: x(2005), y: y(-60), "class": "gen-label"})
    .text("Gen Z");

    // millenials
    svg.append("rect")
    .attrs({ x: x(1981), y: y(0), width: (x(1997) - x(1981)), height: 20, rx: 2, ry: 2, "class": "bar-label" });

    svg.append("text")
    .attrs({x: x(1989), y: y(-60), "class": "gen-label"})
    .text("Millenials");

    // Gen Y
    svg.append("rect")
    .attrs({ x: x(1965), y: y(0), width: (x(1981) - x(1965)), height: 20, rx: 2, ry: 2, "class": "bar-label" });

    svg.append("text")
    .attrs({x: x(1973), y: y(-60), "class": "gen-label"})
    .text("Gen Y");

    // Boomers
    svg.append("rect")
    .attrs({ x: x(1946), y: y(0), width: (x(1965) - x(1946)), height: 20, rx: 2, ry: 2, "class": "bar-label" });

    svg.append("text")
    .attrs({x: (x(1955) + 2), y: y(-60), "class": "gen-label"})
    .text("Boomers");

    // Pre boomers
    svg.append("rect")
    .attrs({ x: x(1917), y: y(0), width: (x(1946) - x(1917)), height: 20, rx: 2, ry: 2, "class": "bar-label" });

    svg.append("text")
    .attrs({x: x(1931), y: y(-60), "class": "gen-label"})
    .text("Pre-Boomers");


    // append the rectangles for 2C
    svg.selectAll(".bar1")
        .data(data)
        .enter().append("path")
        .attr("class", "bar1")
        .attr("d", function (d) {
            if (d.two > 0) {
                return `
                    M${x(d.age)},${y(d.two) + ry}
                    a${rx},${ry} 0 0 1 ${rx},${-ry}
                    h${x.bandwidth() - 2 * rx}
                    a${rx},${ry} 0 0 1 ${rx},${ry}
                    v${height - y(d.two - 200) - ry}
                    h${-(x.bandwidth())}Z
                    `
            } else {
                return `
                M${x(d.age)},${y(d.two) + ry}
                a${rx},${-ry} 0 0 0 ${rx},${ry}
                h${x.bandwidth() - 2 * rx}
                a${rx},${ry} 0 0 0 ${rx},${-ry}
                v${height - y(d.two - 200) - ry}
                h${-(x.bandwidth())}Z
                `
            }
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

    // append the rectangles for 1.5C
    svg.selectAll(".bar2")
        .data(data)
        .enter().append("path")
        .attr("class", "bar2")
        .attr("d", function (d) {
            if (d.onepointfive > 0) {
                return `
                    M${x(d.age)},${y(d.onepointfive) + ry}
                    a${rx},${ry} 0 0 1 ${rx},${-ry}
                    h${x.bandwidth() - 2 * rx}
                    a${rx},${ry} 0 0 1 ${rx},${ry}
                    v${height - y(d.onepointfive - 200) - ry}
                    h${-(x.bandwidth())}Z
                    `
            } else {
                return `
                M${x(d.age)},${y(d.onepointfive) + ry}
                a${rx},${-ry} 0 0 0 ${rx},${ry}
                h${x.bandwidth() - 2 * rx}
                a${rx},${ry} 0 0 0 ${rx},${-ry}
                v${height - y(d.onepointfive - 200) - ry}
                h${-(x.bandwidth())}Z
                `
            }
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

    function mouseover (d) {

        // to help deal with bug where some strokes are left visible
        d3.selectAll(".bar1")
        .transition("hide all strokes")
        .duration(200)
        .style("stroke-width", "0px");

        d3.selectAll(".bar2")
        .transition("hide all strokes")
        .duration(200)
        .style("stroke-width", "0px");

        d3.select(this)
        .transition("show stroke")
        .duration(200)
        .style("stroke-width", 1);

        div.html(
            "<h4>Born in " + d.age + "</h4>" +
            "<p><div class='tooltip-key' style='background-color: #439AD2;'></div><p class='inline'><b>1.5C allowance</b></p></p>" + 
            "<p>" + decimalFormat(d.onepointfive) + " tonnes of CO2</p>" +
            "<p><div class='tooltip-key' style='background-color: #CC5540;'></div><p class='inline'><b>2C allowance</b></p></p>" +
            "<p>" + decimalFormat(d.two) + " tonnes of CO2</p>"
        )
        .style("left", (d3.event.pageX - 55) + "px")
        .style("top", (d3.event.pageY - 165) + "px");

        div.transition("show div")
        .duration(100)
        .style("opacity", 1);

    }

    function mousemove (d) {


        div.html(
            "<h4>Born in " + d.age + "</h4>" +
            "<p><div class='tooltip-key' style='background-color: #439AD2;'></div><p class='inline'><b>1.5C allowance</b></p></p>" + 
            "<p>" + decimalFormat(d.onepointfive) + " tonnes of CO2</p>" +
            "<p><div class='tooltip-key' style='background-color: #CC5540;'></div><p class='inline'><b>2C allowance</b></p></p>" +
            "<p>" + decimalFormat(d.two) + " tonnes of CO2</p>"
        )
        .style("left", (d3.event.pageX - 55) + "px")
        .style("top", (d3.event.pageY - 165) + "px");

        div.transition("show div")
        .duration(100)
        .style("opacity", 1);

    }
    
    function mouseout () {
        d3.select(this)
        .transition("hide stroke")
        .duration(200)
        .style("stroke-width", "0px");
        // hide tooltip
        div.transition("hide div")
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
        .text("Tonnes of CO2");

    svg.append("text")
        .attr("class", "axis label")
        .attr("y", 0 + (height + margin.bottom - 15))
        .attr("x",0 + (width/2))
        .attr("dy", ".5em")
        .style("text-anchor", "middle")
        .text("Year born");

    // VARIABLE FOR FIRST LINE

    budgetUser = d3.selectAll("placeholder")
        .data(data)
        .enter()
        .filter(function(d) { return d.age == 1980; });

    budgetUser = budgetUser.nodes()[0].__data__.onepointfive;

    // ADD LINE HIGHLIGHT

    age = 1980;

    let lineData = [
        {
            values: [
                {
                    x: age,
                    y: budgetUser
                },
                {
                    x: age,
                    y: 1480
                },
                {
                    x: 1917,
                    y: 1480
                },
                {
                    x: 1917,
                    y: 1650
                }
            ]
        }
    ]

    svg.selectAll('.indicator')
    .data(lineData)
    .enter()
    .append('path')
    .attr('class', 'indicator')  
    .attr("d", function(d) { return line(d.values); });

});

function update () {

    let file = "./data/" + region + "_" + emissions + ".csv";

    console.log(file);

    // Get the data
    d3.csv(file, function(error, data) {

        if (error) throw error;

        // format the data
        data.forEach(function(d) {
            d.age = d.birth_year;
            d.onepointfive = +d["1.5C"];
            d.two = +d["2C"];
        });
        
        console.log("data loaded");

        // Scale the range of the data
        x.domain(data.map(function(d) { return d.age; }));
        y.domain([-200, 1400]);

        // ADD BARS
        svg.selectAll(".raised")
        .each( function() {
            // move previous negative values to back before transition
            // to avoid messing up the order
            d3.select(this).lower().classed("raised", false);
        });

        svg.selectAll(".bar1")
            .data(data)
            .transition("data update bar 1")
            .delay(function(d, i) {
                return i * 2;
            })
            .duration(750)
            .attr("d", function (d) {
                // ensure that origin is at zero
                if (d.two > 0) {
                    return `
                        M${x(d.age)},${y(d.two) + ry}
                        a${rx},${ry} 0 0 1 ${rx},${-ry}
                        h${x.bandwidth() - 2 * rx}
                        a${rx},${ry} 0 0 1 ${rx},${ry}
                        v${height - y(d.two  - 200) - ry}
                        h${-(x.bandwidth())}Z
                        `
                } else {
                    return `
                    M${x(d.age)},${y(d.two) + ry}
                    a${rx},${-ry} 0 0 0 ${rx},${ry}
                    h${x.bandwidth() - 2 * rx}
                    a${rx},${ry} 0 0 0 ${rx},${-ry}
                    v${height - y(d.two - 200) - ry}
                    h${-(x.bandwidth())}Z
                    `
                }
            })
            .each(function(d) {

                    if (d.two < 0) {
                        // move negative values to the front
                        d3.select(this).raise().classed("raised", true);
                    }

            });

        svg.selectAll(".bar2")
            .data(data)
            .transition("data update bar 2")
            .delay(function(d, i) {
                return i * 2;
            })
            .duration(750)
            .attr("d", function (d) {
                // ensure that origin is at zero
                if (d.onepointfive > 0) {
                    return `
                        M${x(d.age)},${y(d.onepointfive) + ry}
                        a${rx},${ry} 0 0 1 ${rx},${-ry}
                        h${x.bandwidth() - 2 * rx}
                        a${rx},${ry} 0 0 1 ${rx},${ry}
                        v${height - y(d.onepointfive  - 200) - ry}
                        h${-(x.bandwidth())}Z
                        `
                } else {
                    return `
                    M${x(d.age)},${y(d.onepointfive) + ry}
                    a${rx},${-ry} 0 0 0 ${rx},${ry}
                    h${x.bandwidth() - 2 * rx}
                    a${rx},${ry} 0 0 0 ${rx},${-ry}
                    v${height - y(d.onepointfive - 200) - ry}
                    h${-(x.bandwidth())}Z
                    `
                }
            });


        // UPDATE UI TEXT

        budgetUser = d3.selectAll("placeholder")
        .data(data)
        .enter()
        .filter(function(d) { return d.age == age; });

        budgetUser = budgetUser.nodes()[0].__data__.onepointfive;

        d3.selectAll("#budgetUser")
        .text(decimalFormat(budgetUser));

        budgetReference = d3.selectAll("placeholder")
        .data(data)
        .enter()
        .filter(function(d) { return d.age == 1950; });

        budgetReference = budgetReference.nodes()[0].__data__.onepointfive;

        let reference = budgetReference/budgetUser;

        d3.selectAll("#budgetReference")
        .text(decimalFormat2(reference) + " times");

        // hide text for negative numbers and 1950

        if (age == 1950 || budgetUser < 0) {
            $("#comparison").css("visibility", "hidden");
        } else {
            $("#comparison").css("visibility", "visible");
        }

        // UPDATE LINE HIGHLIGHT

        let lineData = [
            {
                values: [
                    {
                        x: age,
                        y: budgetUser
                    },
                    {
                        x: age,
                        y: 1480
                    },
                    {
                        x: 1917,
                        y: 1480
                    },
                    {
                        x: 1917,
                        y: 1650
                    }
                ]
            }
        ]

        svg.selectAll('.indicator')
        .data(lineData)
        .transition()
        .duration(0)
        .attr("d", function(d) { return line(d.values); });

        // fade lines as transition takes place

        svg.selectAll(".indicator")
        .attr("opacity", 0)
        .transition()
        .duration(850)
        .ease(d3.easePolyIn)
        .attr("opacity", 1);

        // HIGHLIGHT AGE

        svg.selectAll(".bar1")
            .style("fill", "#E3A195")
            .filter(function(d) { return d.age == age; })
            .style("fill", "#CC5540");

        svg.selectAll(".bar2")
            .style("fill", "#97C7E6")
            .filter(function(d) { return d.age == age; })
            .style("fill", "#439AD2");

        // DOWNLOAD BUTTON

        // no need to go up a filepath since will be adding this to the homepage
        let fileName = region + "_" + emissions + ".csv";
        let filePath = "data/" + fileName;

        document.getElementById("download-button").setAttribute("download", fileName);
        document.getElementById("download-button").setAttribute("href", filePath);

    });

}