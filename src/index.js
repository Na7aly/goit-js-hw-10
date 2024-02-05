
import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener("DOMContentLoaded", () => {
    const breedSelect = document.querySelector(".breed-select");
    const loader = document.querySelector(".loader");
    const errorElement = document.querySelector(".error");
    const catInfo = document.querySelector(".cat-info");

    fetchBreeds().then(breeds => {
        breeds.forEach(breed => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.text = breed.name;
            breedSelect.appendChild(option);
        });
    });

    breedSelect.addEventListener("change", () => {
        const selectedBreedId = breedSelect.value;

        loader.style.display = "block";
        catInfo.style.display = "none";
        errorElement.style.display = "none";

        fetchCatByBreed(selectedBreedId)
            .then(cat => {
                
                const catBreed = cat.breeds.length > 0 ? cat.breeds[0] : null;

                if (catBreed) {
                    catInfo.innerHTML = `
                        <p>Name: ${catBreed.name}</p>
                        <p>Description: ${catBreed.description}</p>
                        <p>Temperament: ${catBreed.temperament}</p>
                        <img src="${cat.url}" alt="${catBreed.name}" />
                    `;
                } else {
                    console.error('No breed information found for the selected cat.');
                }
            })
            .catch(() => {
                errorElement.style.display = "block";
            })
            .finally(() => {
                loader.style.display = "none";
                catInfo.style.display = "block";
            });
    });
});
