const highscoreRows = document.querySelectorAll(".highscoreRow");

const selectedPlayerName = document.getElementById("selectedPlayerName");
const favoriteLocation = document.getElementById("selectedPlayerLocation");
const favoritePlayerDicipline = document.getElementById("selectedPlayerDiscipline");
const favoritePatch = document.getElementById("selectedPlayerSeason");
const avrageScore = document.getElementById("selectedPlayerAverage");
const playedMatches = document.getElementById("selectedPlayerMatches");

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

// svg segment

const graphContainer = document.querySelector("#graphContainer");

const hSvg = "100%", wSvg = "100%";
const hPadding = "10%", wPadding = "15%"

const svg = d3.select(graphContainer)
    .append("svg")
    .attr("height", hSvg)
    .attr("width", wSvg)
    .style("border", "2px solid var(--borderBright)");

const topFiveOAT = findTopFiveOAT(participants);

for (let char of topFiveOAT) {
    svg.append("g")
        .selectAll("rect")
        .data()
        
}