// script.js
const accessKey = "8b0lgDM9kjoGnudvULIksC5Y4lTRIbuNjm-SiZca0Vc";
const formElement = document.querySelector("form");
const inputElement = document.getElementById("input_search");
const searchResults = document.querySelector(".search_pic"); // Corrected selector
const showMore = document.getElementById("ShowMore_Button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("output_result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html; // Corrected property name
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
