document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector("#countryInput");
    const button = document.querySelector("#searchBtn");
    const countryName = document.querySelector("#countryName");
    const capital = document.querySelector("#capital");
    const population = document.querySelector("#population");
    const flagImage = document.querySelector("#flagImage");
    const errorMessage = document.querySelector("#errorMessage");
    const loadingText = document.querySelector("#loadingText");
    const resultSection = document.querySelector("#resultSection");

    button.addEventListener("click", function() {
        const country = input.value.trim();
        if (country === "") {
            alert("Please enter a country name");
            return;
        }

        loadingText.style.display = 'block';
        resultSection.style.display = "none";
        errorMessage.textContent = "";

        fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Country not found");
                }
                return response.json();
            })
            .then(function(data) {
                const countryData = data[0];

                countryName.textContent = countryData.name.common;
                capital.textContent = countryData.capital ? countryData.capital[0] : "N/A";
                population.textContent = countryData.population.toLocaleString();
                flagImage.src = countryData.flags.png;
                resultSection.style.display = 'block';
                loadingText.style.display = "none";
            })
            .catch(function(error) {
                errorMessage.textContent = "Country not found";
                loadingText.style.display = "none";
            });
    });
});