const characterSelectButton = document.getElementById("characterSelectButton");
const mapSelectButton = document.getElementById("mapSelectButton");
const leaderboardButton = document.getElementById("leaderboardButton")
const main = document.querySelector("main");
const mapMain = document.getElementById("mapMain")
const leaderboardMain = document.getElementById("leaderboardMain")
const characterSelect = document.getElementById("characterSelect")

function setActiveNav(activeButton){

    characterSelectButton.classList.remove("activeNav");
    mapSelectButton.classList.remove("activeNav");
    leaderboardButton.classList.remove("activeNav");

    activeButton.classList.add("activeNav");
}


/* Eventlisteners för knappar */

mapSelectButton.addEventListener("click", () => {
    main.style.display = "none";
    characterSelect.style.display = "none";
    mapMain.style.display = "flex";
    leaderboardMain.style.display = "none";
    setActiveNav(mapSelectButton);

})

characterSelectButton.addEventListener("click", () => {
    main.style.display = "grid";
    characterSelect.style.display = "grid";
    mapMain.style.display = "none";
    leaderboardMain.style.display = "none";
    setActiveNav(characterSelectButton);

})

leaderboardButton.addEventListener("click", () => {
    main.style.display = "none";
    characterSelect.style.display = "none";
    mapMain.style.display = "none";
    leaderboardMain.style.display = "grid";
    setActiveNav(leaderboardButton);

});

let selectedPlayer = null;
let randomPlayerTwo = null;

/* Funktion för att pre-loada bilderna för folk som inte varit inne på sidan. */

const loadingBar = document.getElementById("loadingBar");

document.getElementById("startButton").addEventListener("click", () => {
    const startScreen = document.getElementById("startScreen");

    let loaded = 0;
    const allImages = [];

    participants.forEach(p => {
        if (p.profilePicture) allImages.push(p.profilePicture);
        if (p.fullImage) allImages.push(p.fullImage);
    });

    const total = allImages.length;

    allImages.forEach(src => {
        const img = new Image();
        img.src = src;

        // Detta betyder att om bilden inte laddas så kommer vi ändå vidare.
        img.onload = img.onerror = () => {
        loaded++;

        //För loadingbar. 
        const progress = loaded / total;
        loadingBar.style.width = (progress * 100) + "%";

        if (loaded === total) {
            startScreen.style.display = "none";
        }
        };
    });
});

function renderCharacterSelect(participants) {
    const container = document.getElementById("characterSelect");
    const preview = document.getElementById("characterFullP1");

    let selectedCell = null;
    let lockedCharacter = false;

    participants.forEach((p) => {
        const cell = document.createElement("div");
        cell.classList.add("characterCell");

        if (p.profilePicture) {
            const img = document.createElement("img");
            img.src = p.profilePicture;
            cell.appendChild(img);
        }

        /* när man hovrar en karaktär */
            cell.addEventListener("mouseenter", () => {
                if (lockedCharacter) return;

                preview.innerHTML = `
                                    <div class="previewWrapper fullscreenPreview">
                                        <img src="${p.fullImage}">
                                        <div class="previewName">${p.displayName}</div>
                                    </div>
                `;
        });

        /* bara för att tömma efter man hovrar och inte valt någon */
        cell.addEventListener("mouseleave", () => {
            if (lockedCharacter) return;

            preview.innerHTML = "";
        })


        /* för att locka in */
        cell.addEventListener("click", () => {
            selectedPlayer = p;
            document.getElementById("playerOne").classList.add("selected");
            document.getElementById("statsP1").style.display = "flex";

            if (selectedCell) {
                selectedCell.style.border = "";
            }

            selectedCell = cell;
            lockedCharacter = true;

            cell.style.border = "5px solid blue";
            if (p.fullImage) {
                preview.innerHTML = `
                                <div class="previewWrapper">
                                    <img src="${p.fullImage}">
                                    <div class="previewName">${p.displayName}</div>
                                </div>
            `;
            }

            renderStats(p, "statsP1")
            updateRadarChart();
        });

        container.appendChild(cell);
    });
}

renderCharacterSelect(participants);

function renderRandomPlayerTwo () {
    randomPlayerTwo = participants[31];
    const playerTwo = document.getElementById("characterFullP2");
    playerTwo.innerHTML = `
                          <div class="previewWrapperTwo">
                                <img src="${participants[31].fullImage}">
                                <div class="previewName">${participants[31].displayName}</div>
                            </div>
                          `
    renderStats(participants[31], "statsP2")
}

renderRandomPlayerTwo();


// Renders bars for both characters

function renderStats(participant, chartId) {
    
    const container = document.getElementById(chartId);
    
    const S01ParticipantPerformance = participants.map(p => p.stats.S01);
    const S01BestPerformance = Math.max(...S01ParticipantPerformance);

    const S02ParticipantPerformance = participants.map(p => p.stats.S02);
    const S02BestPerformance = Math.max(...S02ParticipantPerformance);

    const S03ParticipantPerformance = participants.map(p => p.stats.S03);
    const S03BestPerformance = Math.max(...S03ParticipantPerformance);

    const S04ParticipantPerformance = participants.map(p => p.stats.S04);
    const S04BestPerformance = Math.max(...S04ParticipantPerformance);

    const S05ParticipantPerformance = participants.map(p => p.stats.S05);
    const S05BestPerformance = Math.max(...S05ParticipantPerformance);
    
    const stats = [
        {
            name: "Strength",
            value: participant.stats.S01,
            max: S01BestPerformance,
            color: "red"
        },

        {
            name: "Speed",
            value: participant.stats.S02,
            max: S02BestPerformance,
            color: "cyan"
        },

        {
            name: "Defense",
            value: participant.stats.S03,
            max: S03BestPerformance,
            color: "lime"
        },

        {
            name: "Magic",
            value: participant.stats.S04,
            max: S04BestPerformance,
            color: "purple"
        },

        {
            name: "Luck",
            value: participant.stats.S05,
            max: S05BestPerformance,
            color: "gold"
        }
    ];

    console.log(S01ParticipantPerformance);
    console.log(S01BestPerformance);
    console.log(participants);

    const width = container.clientWidth;
    
    const barHeight = 30;
    const gap = 10;
    const padding = 20;

    const height = stats.length * (barHeight + gap + padding);

    d3.select(`#${chartId}`).selectAll("*").remove();

    const svg = d3.select(`#${chartId}`)
        .attr("width", width)
        .attr("height", height)
    /*
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(stats, d => d.max)])
        .range([0, width]);
    */
    svg.selectAll("rect")
        .data(stats)
        .join("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * 40)
        .attr("width", d => (d.value / d.max) * width)
//      .attr("width", d => xScale(d.value))
        .attr("height", 30)
        .attr("fill", d => d.color)

        console.log(stats);
}


// Renders the radarchart comparing the two characters

function updateRadarChart() {

    if (!selectedPlayer || !randomPlayerTwo) return;

    const radarChartContainer = document.querySelector("#radarChartContainer");
    const width = radarChartContainer.clientWidth;
    const height = radarChartContainer.clientHeight;

    const axes = ["S01", "S02", "S03", "S04", "S05"];
    const labels = ["Strength", "Speed", "Defense", "Magic", "Luck"];

    const radius = Math.min(width, height) / 2 - 60;
    const angleSlice = (Math.PI * 2) / axes.length;
    

    d3.select(radarChartContainer).selectAll("*").remove();

    const svg = d3.select(radarChartContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const statMax = {};

    axes.forEach(a => {
        statMax[a] = d3.max(participants, p => p.stats[a])
    })

    const data = [selectedPlayer, randomPlayerTwo].map(p => ({ 
        name: p.displayName,
        values: axes.map(a => ({
            axis: a,
            value: p.stats[a] / statMax[a]
        }))
    }))
    console.log(data);

    const rScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, radius])

    // Background

    const levels = 5;

    for (let level = 1; level <= levels; level++) {
        const r = (radius / levels) * level;

            const points = axes.map((_, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            return [ Math.cos(angle) * r, Math.sin(angle) * r ]
        })

        g.append("polygon")
            .attr("points", points.map(p => p.join(",")).join(" "))
            .attr("fille", "none")
            .attr("stroke", "#333")
            .attr("stroke-width", 1)
    }

    // Axes

    axes.forEach((a, i) => {
        const angle = i * angleSlice - Math.PI / 2;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        g.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", y)
            .attr("stroke", "#555")
            .attr("stroke-width", 1);

        g.append("text")
            .attr("x", x * 1,1)
            .attr("y", y * 1,1)
            .attr("fill", "#ccc")
            .attr("font-size", "16px")
            .attr("text-anchor", "middle")
            .text(labels[i])
    })

    // Players charts

    const line = d3.line()
        .x((d, i) => Math.cos(i * angleSlice - Math.PI / 2) * rScale(d.value))
        .y((d, i) => Math.sin(i * angleSlice - Math.PI / 2) * rScale(d.value))
        .curve(d3.curveLinearClosed);

    g.selectAll(".radar")
        .data(data)
        .join("path")
        .attr("d", d => line(d.values))
        .attr("fill", (d, i) => i === 0 ? "orange" : "lightblue" )
        .attr("fill-opacity", 0.3)
        .attr("stroke", (d, i) => i === 0 ? "orange" : "lightblue ")
        .attr("stroke-width", 2);
}

updateRadarChart();