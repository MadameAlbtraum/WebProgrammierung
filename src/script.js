
import { labelSbutton, searchButton, backButton, cart, productDetails, productDiv, productImage, searchInput, searchResult, searchResultTitel, tableBody, textStart, wishListDiv, wishListH2 } from './const.js';
// Ansichten setzen
import { switchView, navigateBack } from './switchView.js';

switchView(1);//Standardansicht setzen

// nach User suchen und Date laden
import { fetchUserData } from './fetchUserData.js';


// Abruf & Laden der Warenkorbdateen anhand geklickter UserId
import { loadUserData } from './loadUserData.js';


// Produktdaten abfragen und laden
import { loadProductData } from './loadProductData.js';


// Event Listener für Tastatureingabe
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        fetchUserData();
    }
})
// Event-Listener für Buttons
searchButton.addEventListener('click', fetchUserData);
backButton.addEventListener('click', navigateBack);

//Hamburger Menü
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("change", function () {
    if (menuToggle.checked) {
        menu.classList.add("active");
    } else {
        menu.classList.remove("active");
    }
});
