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