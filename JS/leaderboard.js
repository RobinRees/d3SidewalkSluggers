const highscoreRows = document.querySelectorAll(".highscoreRow");

const selectedPlayerName = document.getElementById("selectedPlayerName");
const favoriteLocation = document.getElementById("selectedPlayerLocation");
const favoritePlayerDicipline = document.getElementById("selectedPlayerDiscipline");
const favoritePatch = document.getElementById("selectedPlayerSeason");
const avrageScore = document.getElementById("selectedPlayerAverage");
const playedMatches = document.getElementById("selectedPlayerMatches");

// segment: patch selector

const patchSelector = document.querySelector("#seasonSelect");
const allTimeBtn = document.createElement("option");
allTimeBtn.classList.add("patchOption");
allTimeBtn.classList.add("selected");
allTimeBtn.textContent = "All time";
allTimeBtn.addEventListener("click", () => {
    document.querySelectorAll(".patchOption")
        .forEach(option => {
            option.classList.remove("selected");
        });

    allTimeBtn.classList.add("selected");
});



patchSelector.append(allTimeBtn);
patches.forEach(patch => {
    const option = document.createElement("option");
    patchSelector.append(option);
    option.classList.add("patchOption")
    option.textContent = patch.name;

    option.addEventListener("click", () => {
        document.querySelectorAll(".patchOption")
            .forEach(option => {
                option.classList.remove("selected");
            });

        option.classList.add("selected");
        if (option.classList.includes("selected")) updateScoreboard(patch.id);
    })
})

// Skapar 5 spelare - Bara 5 översta ingenting som kommer användas senare
for (let i = 0; i < 5; i++) {
    const participant = participants[i];

    const row = highscoreRows[i];

    row.querySelector(".participantName").textContent = participant.displayName;
    row.querySelector(".participantImage").src = participant.profilePicture;
}

const clickedFirstPlace = document.getElementById("firstPlaceRow");


// Visar falsk fakta, bara för show. kommer nog tas bort också
clickedFirstPlace.addEventListener("click", () => {
    clickedFirstPlace.style.border = "solid gold 3px";
    selectedPlayerName.innerHTML = "Adon";
    favoriteLocation.innerHTML = "Madrid #3";
    favoritePlayerDicipline.innerHTML = "Dicipline #3";
    favoritePatch.innerHTML = "1.2";
    avrageScore.innerHTML = "3400";
    playedMatches.innerHTML = "43";
    document.getElementById("selectedPlayerPortrait").src = "https://res.cloudinary.com/datj2chaw/image/upload/v1778003685/AdonFull_sa0man.png"
})

// segment: svg creation for Top Characters per Season

function updateScoreboard(patchId) {

}

// segment: svg creation for Top Characters of All time

function topFiveOATGraph() {
    const graphContainer = document.querySelector("#graphContainer");
    const colorArray = ["#1BFF11", "#EB3410", "#2E78F0", "#F02ED9", "#F0B32E"]

    const hSvg = 200, wSvg = 700;
    const hPadding = 20, wPadding = 50

    const xScale = d3.scaleLinear([0, 9], [wPadding, wSvg - wPadding]);
    const yScale = d3.scaleLinear([150000, 200000], [hSvg - hPadding, hPadding]);
    const dMakerFunction = d3.line();
    dMakerFunction.x(d => xScale(d.year));
    dMakerFunction.y(d => yScale(d.score));

    const svg = d3.select(graphContainer)
        .append("svg")
        .attr("height", hSvg)
        .attr("width", wSvg)
        .style("border", "2px solid var(--borderBright)");

    const xAxis = d3.axisBottom(xScale);
    xAxis.tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    xAxis.tickFormat(d => `1.${d}`);

    d3.select("svg").append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${hSvg - hPadding})`)
        .style("color", "white")

    const yAxis = d3.axisLeft(yScale)
    d3.select("svg").append("g")
        .call(yAxis)
        .attr("transform", `translate(${wPadding}, 0)`)
        .style("color", "white")


    for (let i = 0; i <= 4; i++) {
        let lineDataset = [createDatasetForCoords(i)];
        console.log(lineDataset)

        svg.append("g")
            .selectAll("rect")
            .data(lineDataset)
            .enter()
            .append("path")
            .attr("stroke", colorArray[i])
            .attr("fill", "none")
            .attr("d", dMakerFunction)
    }

    // characters in graph

    const charContainer = document.querySelector("#charContainer");

    for (i = 0; i <= 4; i++) {
        const charDiv = document.createElement("div");
        charDiv.classList.add("charDiv");
        charDiv.style.display = "flex";
        charDiv.style.gap = "10px"
        charContainer.append(charDiv);

        const charPfp = document.createElement("img");
        charPfp.src = findTopFiveOAT(participants)[i].profilePicture;
        charDiv.append(charPfp);

        const charNameP = document.createElement("p");
        charNameP.textContent = `${findTopFiveOAT(participants)[i].displayName}`;
        charNameP.style.color = colorArray[i];
        charNameP.style.fontSize = "16px";
        charDiv.append(charNameP);

    }
};

topFiveOATGraph();