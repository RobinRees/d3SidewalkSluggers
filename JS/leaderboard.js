
const selectedPlayerName = document.getElementById("selectedPlayerName");
const favoriteLocation = document.getElementById("selectedPlayerLocation");
const favoritePlayerDicipline = document.getElementById("selectedPlayerDiscipline");
const favoritePatch = document.getElementById("selectedPlayerSeason");
const avrageScore = document.getElementById("selectedPlayerAverage");
const playedMatches = document.getElementById("selectedPlayerMatches");

const scoreboardRowContainer = document.querySelector("#leaderboardRows")


// segment: patch selector

const patchSelector = document.querySelector("#seasonSelect");
const allTimeBtn = document.createElement("option");
allTimeBtn.classList.add("patchOption");
allTimeBtn.classList.add("selected");
allTimeBtn.textContent = "All time";
allTimeBtn.addEventListener("click", () => {
    scoreboardRowContainer.innerHTML = "";
    document.querySelectorAll(".patchOption")
        .forEach(option => {
            option.classList.remove("selected");
        });

    allTimeBtn.classList.add("selected");
    if (allTimeBtn.classList.contains("selected")) updateScoreboard("All time")
});



patchSelector.append(allTimeBtn);
patches.forEach(patch => {
    const option = document.createElement("option");
    patchSelector.append(option);
    option.classList.add("patchOption")
    option.textContent = patch.name;

    option.addEventListener("click", () => {
        scoreboardRowContainer.innerHTML = "";
        document.querySelectorAll(".patchOption")
            .forEach(option => {
                option.classList.remove("selected");
            });

        option.classList.add("selected");
        if (option.classList.contains("selected")) updateScoreboard(patch.id);
    })
})

// segment: svg creation for Top Characters per Season

function updateScoreboard(patchId) {
    
    if (patchId === "All time") {
        for (let i = 0; i <= 4; i++) {
            const row = document.createElement("div");
            row.classList.add("highscoreRow");
            scoreboardRowContainer.append(row);
            
            const placementNmr = document.createElement("p");
            placementNmr.classList.add("participantPlacement");
            placementNmr.textContent = "#" + (i + 1);
            row.append(placementNmr);

            const charImg = document.createElement("img");
            charImg.classList.add("participantImage");
            charImg.src = findTopFiveOAT(participants)[i].profilePicture;
            row.append(charImg);

            const charNameP = document.createElement("p");
            charNameP.classList.add("participantName");
            charNameP.textContent = findTopFiveOAT(participants)[i].displayName;
            row.append(charNameP);

            const charScoreP = document.createElement("p");
            charScoreP.classList.add("participantScore");
            charScoreP.textContent = findTopFiveOAT(participants)[i].totalScore;
            row.append(charScoreP);
        }
    }


    // patches.forEach(patch => {
    //     if(patch.id == patchId) {

    //     }
    // })
}

updateScoreboard("All time");


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