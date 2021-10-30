// svg area
var svgWidth = 960;
var svgHeight = 660;

// chart margins
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth); 

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// import data
d3.csv("/StarterCode/assets/data/data.csv").then(function(data) {
    console.log(data);

    //parse data and cast as numbers
    data.forEach(function(data) {
        data.age = +data.age;
        data.income = +data.income;
    });

    // scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d=>d.age), d3.max(data, d=>d.age)])
        .range([0, chartWidth]);
    
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.income), d3.max(data, d => d.income)])
        .range([chartHeight, 0]);

    // axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // markers
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.income))
        .attr("r", "20")
        .attr("fill", "blue")
        .attr("opacity", ".5");

    chartGroup.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.income))
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", 9);

        

    // labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 40)
        .attr("x", 0 -(chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Income ($USD)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.bottom + 30})`)
        .attr("class", "axisText")
        .text("Age (years)");

}).catch(function(error) {
    console.log(error);
});

