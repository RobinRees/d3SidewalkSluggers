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



document.getElementById("pickMapButton").addEventListener("click", () => {

    const selectedMap = slides[currentSlide];
    const selectedImage = selectedMap.querySelector("img");
    const pickedImage = document.getElementById("pickedImage");
    console.log(pickedImage)
    pickedImage.src = selectedImage.src;


    mapSelectionCarusel.style.display = "none";
    mapMain.style.flexDirection = "row";
    pickedMapSideBar.style.display = "flex";
    mapFooter.setAttribute("id", "activeMapFooter");
    document.getElementById("pickMapButton").style.display = "none"


    console.log(selectedMap);

});