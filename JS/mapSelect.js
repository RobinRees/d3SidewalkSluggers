const slides = document.querySelectorAll(".slide");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const tooltip = document.getElementById("tooltip")

let currentSlide = 0;

showSlide();

function showSlide() {

    slides.forEach(slide => {
        slide.classList.remove("active");
        slide.classList.remove("left");
        slide.classList.remove("right");
    });

    let leftSlide = currentSlide - 1;
    let rightSlide = currentSlide + 1;

    if (leftSlide < 0) {
        leftSlide = slides.length - 1;
    }

    if (rightSlide >= slides.length) {
        rightSlide = 0;
    }

    slides[currentSlide].classList.add("active");
    slides[leftSlide].classList.add("left");
    slides[rightSlide].classList.add("right");
}

nextButton.addEventListener("click", () => {

    currentSlide++;
 
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide();
});

previousButton.addEventListener("click", () => {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide();
});

const mapSelectionCarusel = document.getElementById("mapSelectionCarusel");
const mapFooter = document.querySelector(".mapFooter");
const pickedMapSideBar = document.getElementById("pickedMapSidebar");

/* Detta är knapparna som skiftar mellan att välja map och sen se grafer, Får footern att förstoras och sidebaren att visas*/

document.getElementById("pickMapButton").addEventListener("click", () => {

    const selectedMap = slides[currentSlide];
    const selectedImage = selectedMap.querySelector("img");
    const selectedText = selectedMap.querySelector("p");

    const pickedImage = document.getElementById("pickedImage");
    const pickedName = document.getElementById("pickedMapName");

    console.log(pickedImage)
    pickedImage.src = selectedImage.src;
    pickedName.textContent = selectedText.textContent;

    const selectedLocation = locations[currentSlide];

    currentSelections.location = selectedLocation.id;
    
    console.log(currentSelections);


    mapSelectionCarusel.style.display = "none";
    mapMain.style.flexDirection = "row";
    pickedMapSideBar.style.display = "flex";
    mapFooter.setAttribute("id", "activeMapFooter");
    document.getElementById("pickMapButton").style.display = "none"
    document.getElementById("lollipopGraph").style.display = "block";
    document.getElementById("footerNav").style.display = "flex";
    renderLollipopGraph ()



    console.log(selectedMap);

});

document.getElementById("backButton").addEventListener("click", () => {
    mapMain.style.flexDirection = "column";
    mapFooter.removeAttribute("id", "activeMapFooter");
    mapSelectionCarusel.style.display = "block";
    document.getElementById("pickMapButton").style.display = "block"
    pickedMapSideBar.style.display = "none";
    document.getElementById("lollipopGraph").style.display = "none";
    document.getElementById("footerNav").style.display = "none";

})

/* Robins kod */

const patches = [
    { id: 0, name: "1.1" },
    { id: 1, name: "1.2" },
    { id: 2, name: "1.3" },
    { id: 3, name: "1.4" },
    { id: 4, name: "1.5" },
    { id: 5, name: "1.6" },
    { id: 6, name: "1.7" },
    { id: 7, name: "1.8" },
    { id: 8, name: "1.9" },
    { id: 9, name: "Current" }
];

const disciplineOptions = [
    { id: "average", name: "Average" },
    { id: 1, name: "Discipline #1" },
    { id: 2, name: "Discipline #2" },
    { id: 3, name: "Discipline #3" },
    { id: 4, name: "Discipline #4" },
    { id: 5, name: "Discipline #5" }
];

const currentSelections = {
    location: null,
    patch: 9,
    discipline: "average"
};

const patchGrid = document.getElementById("patchGrid");

patches.forEach(patch => {
    const button = document.createElement("div");

    button.textContent = patch.name;
    button.classList.add("patchButton");

    if (patch.id === currentSelections.patch) {
        button.classList.add("selected");
    }

    button.addEventListener("click", () => {
        document.querySelectorAll(".patchButton")
            .forEach(button => {
                button.classList.remove("selected");
            });

        button.classList.add("selected");
        currentSelections.patch = patch.id;
        console.log(currentSelections);
        renderLollipopGraph ()
    });

    patchGrid.append(button);
});

const footerNav = document.getElementById("footerNav");

disciplineOptions.forEach(discipline => {
    const button = document.createElement("div");
    button.textContent = discipline.name;
    button.classList.add("disciplineButton");

    if (discipline.id === currentSelections.discipline) {
        button.classList.add("selected");
    }

    button.addEventListener("click", () => {
        document.querySelectorAll(".disciplineButton")
            .forEach(button => {
                button.classList.remove("selected");
            });

        button.classList.add("selected");
        currentSelections.discipline = discipline.id;
        console.log(button);
        renderLollipopGraph ()
    });

    footerNav.append(button);
})

function getParticipantTotals() {

    if (currentSelections.location === null) {
        return [];
    }

    const totals = {};

    seasons.forEach(season => {

        if (season.year !== currentSelections.patch) {
            return;
        }

        season.competitionDays.forEach(day => {

            if (day.locationId !== currentSelections.location) {
                return;
            }

            day.events.forEach(event => {

                if (
                    currentSelections.discipline !== "average" &&
                    event.disciplineId !== currentSelections.discipline
                ) {
                    return;
                }

                event.scores.forEach(score => {

                    if (!totals[score.participantId]) {

                        totals[score.participantId] = {
                            total: 0,
                            count: 0
                        };

                    }

                    totals[score.participantId].total += score.score;
                    totals[score.participantId].count++;

                });

            });

        });

    });

    // FINAL ARRAY
    const result = participants.map(participant => {

        let finalScore = 0;

        if (totals[participant.id]) {

            if (
                currentSelections.discipline === "average"
            ) {

                finalScore =
                    totals[participant.id].total /
                    totals[participant.id].count;

            }

            else {

                finalScore =
                    totals[participant.id].total;

            }

        }

        return {
            name: participant.displayName,
            total: finalScore
        };

    });

    return result;
}

function renderLollipopGraph() {


    const container = document.getElementById("lollipopGraph");
    const margin = {top: 50, right: 30, bottom: 90, left: 40};
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;
    const data = getParticipantTotals()
    const maxPoints = data.toSorted((a, b) => b.total - a.total);
    const finalPoints = maxPoints[0].total;


    let svg = d3.select("#lollipopGraph svg");

    if(svg.empty()) {
        svg = d3.select("#lollipopGraph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("display", "block")
    }


    const xAxis = d3.scaleBand()
    .range([0, width])
    .domain(data.map(x => x.name))
    .padding(1);
    

    svg.append("g")
    .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
    .call(d3.axisBottom(xAxis))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    const yAxis = d3.scaleLinear()
    .domain([0 , 16000])
    .range([height + margin.top, margin.top]);
        
    svg.append("g")
    .attr("transform", `translate(${margin.left})`)
    .call(d3.axisLeft(yAxis));


    svg.selectAll(".lollipop-line")
        .data(data, x => x.name)
        .join("line")    
        .attr("class", "lollipop-line")
        .transition()
        .duration(500)
        .attr("x1", x => xAxis(x.name) + margin.left)
        .attr("x2", x => xAxis(x.name) + margin.left)
        .attr("y1", y => yAxis(y.total))
        .attr("y2", yAxis(0))
        .attr("stroke", "white");

    svg.selectAll("circle")
        .data(data, x => x.name)
        .join("circle")
        .on("mouseover", (event, d) => {
            tooltip.style.display = "block"
            tooltip.innerHTML = `<strong>${d.name}</strong>
            <br>
            score: ${Math.round(d.total)}`        
        })
        .on("mousemove", event => {
            tooltip.style.left = event.pageX +  "px";
            tooltip.style.top = event.pageY + "px";
        })
        .on("mouseout", () => {
            tooltip.style.display = "none";
        })        
        .transition()
        .duration(500)
        .attr("cx", x => xAxis(x.name) + margin.left)
        .attr("cy", y => yAxis(y.total))
        .attr("r", 6)
        .style("fill", "gold")
        .attr("stroke", "black")
        


    svg.selectAll("path")
    .attr("stroke", "white");

    svg.selectAll("line")
    .attr("stroke", "white");

    svg.selectAll("text")
    .style("fill", "white")



}



