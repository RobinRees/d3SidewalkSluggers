const scoreboardRowContainer = document.querySelector("#leaderboardRows")
const patchSelector = document.querySelector("#seasonSelect");
const allTimeOption = document.createElement("option");


allTimeOption.value = "all";
allTimeOption.textContent = "All time";
patchSelector.append(allTimeOption);

patches.forEach(patch => {
    const option = document.createElement("option");

    option.value = patch.id;
    option.textContent = patch.name;

    patchSelector.append(option);
});

patchSelector.addEventListener("change", (e) => {
    updateScoreboard(e.target.value);
    topFiveOATGraph(e.target.value);
});

function updateScoreboard(patchId) {

    scoreboardRowContainer.innerHTML = "";

    let topPlayers = [];

    if (patchId === "all") {
        topPlayers = findTopFiveOAT(participants);
    }

    else {
        topPlayers = findTopFiveByPatch(participants, patchId);
    }

    if (topPlayers.length === 0) {
        for (let i = 0; i <= 4; i++) {
            const row = document.createElement("div");
            row.classList.add("highscoreRow");
            row.innerHTML = `
            <p class="participantPlacement"></p>

            <img>

            <p class="participantName">
                No data
            </p>

            <p class="participantScore"></p>
            `;
            scoreboardRowContainer.append(row);
        }
        return;
    }

    topPlayers.forEach((player, index) => {
        const row = document.createElement("div");
        row.classList.add("highscoreRow");

        if (patchId === "all") {
            row.innerHTML = `
            <p class="participantPlacement">#${index + 1}</p>

            <img 
                class="participantImage"
                src="${player.profilePicture}"
            >

            <p class="participantName">
                ${player.displayName}
            </p>

            <p class="participantScore">
                ${player.totalScore}
            </p>
            `;
            scoreboardRowContainer.append(row);
        } else {
            row.innerHTML = `
            <p class="participantPlacement">#${index + 1}</p>

            <img 
                class="participantImage"
                src="${player.profilePicture}"
            >

            <p class="participantName">
                ${player.displayName}
            </p>

            <p class="participantScore">
                ${player.totalScorePerSeason[`year${patchId}`]}
            </p>
            `;
            scoreboardRowContainer.append(row);
        }


    });


}

updateScoreboard("all");



function topFiveOATGraph(patchId) {
    const graphContainer = document.querySelector("#graphContainer");
    graphContainer.innerHTML = `<div id="charContainer"></div>`;
    const colorArray = ["#1BFF11", "#EB3410", "#2E78F0", "#F02ED9", "#F0B32E"]

    const hSvg = 200, wSvg = 700;
    const hPadding = 20, wPadding = 50

    const xScale = d3.scaleLinear([0, 9], [wPadding, wSvg - wPadding]);
    const yScale = d3.scaleLinear([140000, 200000], [hSvg - hPadding, hPadding]);
    const dMakerFunction = d3.line();
    dMakerFunction.defined(d => Number(d.score) !== 0)
    dMakerFunction.x(d => xScale(d.year));
    dMakerFunction.y(d => yScale(d.score));

    const svg = d3.select(graphContainer)
        .append("svg")
        .attr("height", hSvg)
        .attr("width", wSvg)
        .style("border", "2px solid var(--borderBright)");

    const xAxis = d3.axisBottom(xScale);
    xAxis.tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    xAxis.tickFormat(d => {
        if (d === 9) return "Current"
        return `1.${d + 1}`
    });

    svg.append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${hSvg - hPadding})`)
        .style("color", "white")

    const yAxis = d3.axisLeft(yScale)
        .tickValues([150000, 160000, 170000, 180000, 190000, 200000])
        .tickFormat(d3.format(","));
    
        svg.append("g")
        .call(yAxis)
        .attr("transform", `translate(${wPadding}, 0)`)
        .style("color", "white")

    svg.append("path")
        .attr("d", `
            M ${wPadding - 6} ${hSvg - hPadding - 18}
            L ${wPadding + 6} ${hSvg - hPadding - 12}
            L ${wPadding - 6} ${hSvg - hPadding - 6}
            L ${wPadding + 6} ${hSvg - hPadding}
        `)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    for (let i = 0; i <= 4; i++) {
        let lineDataset = [createDatasetForCoords(i, patchId)];

        svg.append("g")
            .selectAll("rect")
            .data(lineDataset)
            .enter()
            .append("path")
            .attr("stroke", colorArray[i])
            .attr("fill", "none")
            .attr("d", dMakerFunction)
    }


    const charContainer = document.querySelector("#charContainer");

    for (let i = 0; i <= 4; i++) {
        const charDiv = document.createElement("div");
        charDiv.classList.add("charDiv");
        charDiv.style.display = "flex";
        charDiv.style.gap = "10px"
        charContainer.append(charDiv);

        if (patchId === "all") {
            const charPfp = document.createElement("img");
            charPfp.src = findTopFiveOAT(participants)[i].profilePicture;
            charDiv.append(charPfp);

            const charNameP = document.createElement("p");
            charNameP.textContent = `${findTopFiveOAT(participants)[i].displayName}`;
            charNameP.style.color = colorArray[i];
            charDiv.append(charNameP);
        } else {
            const charPfp = document.createElement("img");
            charPfp.src = findTopFiveByPatch(participants, patchId)[i].profilePicture;
            charDiv.append(charPfp);

            const charNameP = document.createElement("p");
            charNameP.textContent = `${findTopFiveByPatch(participants, patchId)[i].displayName}`;
            charNameP.style.color = colorArray[i];
            charDiv.append(charNameP);
        }



    }
};
topFiveOATGraph("all");


(function displayTopStatsPanel() {
    const topStatsPanel = document.querySelector("#topStatsPanel");

    for (let i = 0; i <= 1; i++) {
        const statCard = document.createElement("div");
        statCard.classList.add("topStatCard")

        topStatsPanel.append(statCard);

        const title = document.createElement("p");
        const value = document.createElement("p");
        const name = document.createElement("p");
        const icon = document.createElement("img");

        title.classList.add("topStatTitle");
        value.classList.add("topStatValue");
        name.classList.add("topStatPlayer");
        icon.classList.add("topStatIcon");

        statCard.append(title);
        statCard.append(value);
        statCard.append(name);
        statCard.append(icon);

        if (i === 0) {
            let player = findHighestScoreInASeason();


            title.textContent = "Highest Score In A Season";
            value.textContent = player.score;
            name.textContent = player.player[0].displayName + `, Patch 1.${Number(player.season.slice(4)) + 1}`;
            icon.src = player.player[0].profilePicture;

        } else {
            let player = findTopFiveByPatch(participants, 9).slice(0, 1)
            console.log(player);

            title.textContent = "Highest Score Last Season";
            value.textContent = player[0].totalScorePerSeason.year9;
            name.textContent = player[0].displayName;
            icon.src = player[0].profilePicture;
        }
    }
}());