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


const patches = {
    year0: "1.1",
    year1: "1.2",
    year2: "1.3",
    year3: "1.4",
    year4: "1.5",
    year5: "1.6",
    year6: "1.7",
    year7: "1.8",
    year8: "1.9",
    year9: "Current"
};



const disciplineOptions = {
    overall: "Overall",
    1: "Discipline #1",
    2: "Discipline #2",
    3: "Discipline #3",
    4: "Discipline #4",
    5: "Discipline #5"
};



const currentSelections = {
    location: 1,
    patch: "year9",
    discipline: "overall"
};



const patchGrid = document.getElementById("patchGrid");
const footerNav = document.getElementById("footerNav");

for (let patch in patches) {

    const patchButton = document.createElement("div");
    patchButton.textContent = patches[patch];
    patchButton.classList.add("patchButton");

    // DEFAULT SELECTED
    if (patch === currentSelections.patch) {
        patchButton.classList.add("selected");
    }



    patchButton.addEventListener("click", () => {

        document.querySelectorAll(".patchButton").forEach(button => {
            button.classList.remove("selected");
        });

        patchButton.classList.add("selected");
        currentSelections.patch = patch;

    });

    patchGrid.append(patchButton);
}

for (let d in disciplineOptions) {
    const disciplineButton = document.createElement("div");
    disciplineButton.textContent = disciplineOptions[d];
    disciplineButton.classList.add("disciplineButton");

    if (d === currentSelections.discipline) {
        disciplineButton.classList.add("selected");
    }



    disciplineButton.addEventListener("click", () => {

        document.querySelectorAll(".disciplineButton").forEach(button => {
            button.classList.remove("selected");
        });

        disciplineButton.classList.add("selected");
        currentSelections.discipline = d;
    });



    footerNav.append(disciplineButton);

}

