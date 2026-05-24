const characterSelectButton = document.getElementById("characterSelectButton");
const mapSelectButton = document.getElementById("mapSelectButton");
const leaderboardButton = document.getElementById("leaderboardButton")
const main = document.querySelector("main");
const mapMain = document.getElementById("mapMain")
const leaderboardMain = document.getElementById("leaderboardMain")
const characterSelect = document.getElementById("characterSelect")

/* Eventlisteners för knappar */

mapSelectButton.addEventListener("click", () => {
    main.style.display = "none";
    characterSelect.style.display = "none";
    mapMain.style.display = "flex";
    leaderboardMain.style.display = "none";

})

characterSelectButton.addEventListener("click", () => {
    main.style.display = "grid";
    characterSelect.style.display = "grid";
    mapMain.style.display = "none";
    leaderboardMain.style.display = "none";

})

leaderboardButton.addEventListener("click", () => {
    main.style.display = "none";
    characterSelect.style.display = "none";
    mapMain.style.display = "none";
    leaderboardMain.style.display = "grid";

});

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

            renderStats(p, "statsP1") 
            document.getElementById("imgSpace").style.display = "block";
            }
        });

    container.appendChild(cell);
    });
}

renderCharacterSelect(participants);

function renderRandomPlayerTwo () {
    const playerTwo = document.getElementById("characterFullP2");
    playerTwo.innerHTML = `
                          <div class="previewWrapperTwo">
                                <img src="${participants[31].fullImage}">
                                <div class="previewName">${participants[31].displayName}</div>
                            </div>
                          `
    renderStats(participants[31], "statsP2");
}

renderRandomPlayerTwo();


function renderStats(participant, chartId) {

    const container = document.getElementById(chartId);
    const width = container.clientWidth;
    const height = container.clientHeight;

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

    d3.select(`#${chartId}`).selectAll("*").remove();

    const svg = d3.select(`#${chartId}`)
        .attr("width", width)
        .attr("height", height)

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(stats, d => d.value)])
        .range([0, width]);

    svg.selectAll("rect")
        .data(stats)
        .join("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * 40)
        .attr("width", d => xScale(d.value))
        .attr("height", 30)
        .attr("fill", d => d.color)

        console.log(stats);
}


    