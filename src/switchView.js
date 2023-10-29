import { variables } from './const.js';

export const switchView = (view) => {
    switch (view) {
        case 1:
            textStart.style.display = "block";
            labelSbutton.style.display = "block";
            searchButton.style.display = "block";
            searchInput.style.display = "block";
            backButton.style.display = "none";
            searchResultTitel.style.display = "none";
            searchResult.style.display = "none";
            wishListH2.style.display = "none";
            cart.style.display = "none";
            productDiv.style.display = "none";
            history.pushState(null, null, "index.html");
            break;
        case 2:
            textStart.style.display = "none";
            labelSbutton.style.display = "none";
            searchButton.style.display = "none";
            searchInput.style.display = "none";
            backButton.style.display = "block";
            searchResultTitel.style.display = "block";
            searchResult.style.display = "block";
            wishListH2.style.display = "none";
            cart.style.display = "none";
            productDiv.style.display = "none";
            history.pushState(null, null, "Ergebnis");
            break;
        case 3:
            textStart.style.display = "none";
            labelSbutton.style.display = "none";
            searchButton.style.display = "none";
            searchInput.style.display = "none";
            backButton.style.display = "block";
            searchResultTitel.style.display = "none";
            searchResult.style.display = "none";
            wishListH2.style.display = "block";
            cart.style.display = "block";
            productDiv.style.display = "none";
            history.pushState(null, null, "Wunschliste");
            break;
        case 4:
            textStart.style.display = "none";
            labelSbutton.style.display = "none";
            searchButton.style.display = "none";
            searchInput.style.display = "none";
            backButton.style.display = "block";
            searchResultTitel.style.display = "none";
            searchResult.style.display = "none";
            wishListH2.style.display = "none";
            cart.style.display = "none";
            productDiv.style.display = "block";
            history.pushState(null, null, "Produktdetail");
            break;

    }
}
const navigateBack = () => {
    if (currentView > 1) {
        currentView--;
        switchView(currentView);
    }
} 