const data = [
    { name: "Anna", score: 12 },
    { name: "Bob", score: 25 },
    { name: "Clara", score: 18 },
    { name: "David", score: 30 }
];


const container = document.getElementById("graphContainerLollipop");
const margin = {top: 10, right: 30, bottom: 90, left: 40};
const width = container.clientWidth - margin.left - margin.right;
const height = container.clientHeight - margin.top - margin.bottom;

const svg = d3.select("#graphContainerLollipop")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "2px solid black");

const xAxis = d3.scaleBand()
    .range([0, width])
    .domain(data.map(x => x.name))
    .padding(1);

svg.append("g")
    .attr("transform", `translate(${margin.left}, ${height})`)
    .call(d3.axisBottom(xAxis))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

const yAxis = d3.scaleLinear()
    .domain([0, 40])
    .range([height, 0]);

svg.append("g")
    .attr("transform", `translate(${margin.left})`)
    .call(d3.axisLeft(yAxis));


svg.selectAll("myLine")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", d => xAxis(d.name) + margin.left)
    .attr("x2", d => xAxis(d.name) + margin.left)
    .attr("y1", d => yAxis(d.score) + margin.left)
    .attr("y2", yAxis(0))
    .attr("stroke", "blue");

svg.selectAll("mycircle") 
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xAxis(d.name) + margin.left)
    .attr("cy", d => yAxis(d.score) + margin.left)
    .attr("r", "4")
    .style("fill", "red")
    .attr("stroke", "black")