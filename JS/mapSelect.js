const slides = document.querySelectorAll(".slide");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");


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
    { id: "overall", name: "Overall" },
    { id: 1, name: "Discipline #1" },
    { id: 2, name: "Discipline #2" },
    { id: 3, name: "Discipline #3" },
    { id: 4, name: "Discipline #4" },
    { id: 5, name: "Discipline #5" }
];

const currentSelections = {
    location: null,
    patch: 9,
    discipline: "overall"
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
                    currentSelections.discipline !== "overall" &&
                    event.disciplineId !== currentSelections.discipline
                ) {
                    return;
                }

                event.scores.forEach(score => {

                    if (!totals[score.participantId]) {
                        totals[score.participantId] = 0;
                    }

                    totals[score.participantId] += score.score;

                });

            });

        });

    });

    const result = participants.map(participant => {

        return {
            name: participant.displayName,
            total: totals[participant.id] || 0
        };

    });

    return result;
}

function renderLollipopGraph() {



}

renderLollipopGraph ()