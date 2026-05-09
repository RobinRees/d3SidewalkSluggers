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
      renderStats() // TAS BORT SENARE
      document.getElementById("imgSpace").style.display = "block";
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
                          <div class="previewWrapperTwo">
                                <img src="${participants[31].fullImage}">
                                <div class="previewName">${participants[31].displayName}</div>
                            </div>
                          `
}

renderRandomPlayerTwo();


//BARA FÖR ATT GENERERA STATS, tas bort i framtiden. ONLY FOR SHOW

function renderStats() {

    const stats = [
        {
            name: "Strength",
            value: Math.floor(Math.random() * 10) + 1,
            color: "red"
        },

        {
            name: "Speed",
            value: Math.floor(Math.random() * 10) + 1,
            color: "cyan"
        },

        {
            name: "Defense",
            value: Math.floor(Math.random() * 10) + 1,
            color: "lime"
        },

        {
            name: "Magic",
            value: Math.floor(Math.random() * 10) + 1,
            color: "purple"
        },

        {
            name: "Luck",
            value: Math.floor(Math.random() * 10) + 1,
            color: "gold"
        }
    ];

    const statsContainer = document.getElementById("statsBox");

    statsContainer.innerHTML = "";

    stats.forEach(stat => {


        const row = document.createElement("div");
        row.classList.add("statRow");


        const label = document.createElement("p");

        label.textContent = stat.name;


        label.style.color = stat.color;

        row.appendChild(label);

        const boxes = document.createElement("div");
        boxes.classList.add("statBoxes");


        for (let i = 0; i < 10; i++) {

            const box = document.createElement("div");


            box.style.borderColor = stat.color;

            if (i < stat.value) {

                box.classList.add("filled");

                box.style.backgroundColor = stat.color;
            }

            boxes.appendChild(box);
        }

        row.appendChild(boxes);

        statsContainer.appendChild(row);
    });
}


function renderStatsp2() {

    const stats = [
        {
            name: "Strength",
            value: Math.floor(Math.random() * 10) + 1,
            color: "red"
        },

        {
            name: "Speed",
            value: Math.floor(Math.random() * 10) + 1,
            color: "cyan"
        },

        {
            name: "Defense",
            value: Math.floor(Math.random() * 10) + 1,
            color: "lime"
        },

        {
            name: "Magic",
            value: Math.floor(Math.random() * 10) + 1,
            color: "purple"
        },

        {
            name: "Luck",
            value: Math.floor(Math.random() * 10) + 1,
            color: "gold"
        }
    ];

  const statsContainer2 = document.getElementById("statBox2");

statsContainer2.innerHTML = "";

stats.forEach(stat => {

const row = document.createElement("div");
row.classList.add("statRow");

const label = document.createElement("p");

label.textContent = stat.name;

label.style.color = stat.color;

const boxes = document.createElement("div");
boxes.classList.add("statBoxes");

for (let i = 0; i < 10; i++) {

    const box = document.createElement("div");

    box.style.borderColor = stat.color;

    if (i >= 10 - stat.value) {

        box.classList.add("filled");

        box.style.backgroundColor = stat.color;
    }

    boxes.appendChild(box);
}

// P2 = BOXES FÖRST
row.appendChild(boxes);

row.appendChild(label);

statsContainer2.appendChild(row);
});
}

renderStatsp2() 




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