const characterSelectButton = document.getElementById("characterSelectButton");
const mapSelectButton = document.getElementById("mapSelectButton");
const leaderboardButton = document.getElementById("leaderboardButton")
const main = document.querySelector("main");
const mapMain = document.getElementById("mapMain")
const leaderboardMain = document.getElementById("leaderboardMain")
const characterSelect = document.getElementById("characterSelect")

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
    leaderboardMain.style.display = "flex";

});

function renderCharacterSelect(participants) {
  const container = document.getElementById("characterSelect");
  const preview = document.getElementById("characterFullP1");

  participants.forEach((p) => {
    const cell = document.createElement("div");
    cell.classList.add("characterCell");

    if (p.profilePicture) {
      const img = document.createElement("img");
      img.src = p.profilePicture;
      cell.appendChild(img);
    }

    cell.addEventListener("mouseenter", () => {
      if (p.fullImage) {
        preview.innerHTML = `
                            <div class="previewWrapper">
                                <img src="${p.fullImage}">
                                <div class="previewName">${p.displayName}</div>
                            </div>
`;
      }
    });

    cell.addEventListener("mouseleave", () => {
      preview.innerHTML = "";
    });

    container.appendChild(cell);
  });
}

renderCharacterSelect(participants);

function renderRandomPlayerTwo () {
  const playerTwo = document.getElementById("characterFullP2");
  playerTwo.innerHTML = `
                          <div class="previewWrapper">
                                <img src="${participants[1].fullImage}">
                                <div class="previewName">${participants[1].displayName}</div>
                            </div>
                          `
}

renderRandomPlayerTwo();

/* 

För att vi ska kunna räkna ut skills så måste vi

För att räkna ut stats gör vi så här:

1. Skapa en struktur per participant tex:

Ryu = {
  POWER: [],
  SPEED: [],
  TECHNIQUE: [],
  DEFENSE: [],
  CONSISTENCY: []
}

2. Gå igenom alla competitionDays → events → scores

3. För varje score:
   - Kolla vilken discipline det är (t.ex. D01)
   - Mappa till rätt stat (t.ex. POWER)
   - Lägg in score i rätt array

   Ex:
   Ryu tävlar i D01 och får 1200
   → Ryu.POWER.push(1200)

4. Gör detta för ALLA participants och ALLA disciplines

5. När allt är insamlat:
   - Räkna average (snitt) för varje stat

   Ex:
   POWER = (1200 + 1300 + 1250) / 3

6. Skala värdet till 0–100

Samla alla scores per spelare och stat → räkna snitt → skala till 0–100

7. Resultatet blir:
Ryu = {
  POWER: 82,
  SPEED: 76,
  TECHNIQUE: 88,
  DEFENSE: 70,
  CONSISTENCY: 79
}

*/