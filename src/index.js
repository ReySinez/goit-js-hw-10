import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

const loadBreeds = async () => {
  try {
    const breeds = await fetchBreeds();
    populateBreedSelect(breeds);
    showElement(breedSelect);
    hideElement(loader);
  } catch (error) {
    console.error("Error loading cat breeds:", error);
    showError();
  }
};

const populateBreedSelect = (breeds) => {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
  breedSelect.addEventListener("change", handleBreedSelect);
};

const handleBreedSelect = async () => {
  const breedId = breedSelect.value;
  showElement(loader);
  hideElement(catInfo);
  try {
    const catData = await fetchCatByBreed(breedId);
    displayCatInfo(catData);
  } catch (error) {
    console.error("Error loading cat by breed:", error);
    showError();
  }
};

const displayCatInfo = (catData) => {
  const cat = catData[0];
  const image = document.createElement("img");
  image.src = cat.url;
  image.alt = "Cat Image";
  
  const breedName = document.createElement("h2");
  breedName.textContent = cat.breeds[0].name;

  const description = document.createElement("p");
  description.textContent = cat.breeds[0].description;

  const temperament = document.createElement("p");
  temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

  catInfo.innerHTML = "";
  catInfo.appendChild(image);
  catInfo.appendChild(breedName);
  catInfo.appendChild(description);
  catInfo.appendChild(temperament);

  showElement(catInfo);
  hideElement(loader);
};

const showElement = (element) => {
  element.style.display = "block";
};

const hideElement = (element) => {
  element.style.display = "none";
};

const showError = () => {
  showElement(error);
};

document.addEventListener("DOMContentLoaded", loadBreeds);

  