import { wishListDiv, wishListH2 } from './const.js';
import { switchView } from './switchView.js';
import { loadProductData } from './loadProductData.js';

export const loadUserData = (userId, clickedUsername) => {
    const cartUrl = `https://dummyjson.com/carts/user/${userId}`;
    fetch(cartUrl)
        .then(response => response.json())
        .then(cartData => {
            wishListDiv.innerHTML = ''; //lösche alte Daten

            if (cartData.carts && cartData.carts.length > 0) {
                wishListH2.textContent = "Wunschliste von " + clickedUsername;
                const outerOl = document.createElement("ol");
                document.body.appendChild(outerOl);
                outerOl.className = "list-disc pl-9";

                // Schleife zum abrufen aller Produkte im Cart Array
                for (const cart of cartData.carts) {
                    for (const product of cart.products) {
                        const li = document.createElement("li");
                        li.className = "mb-1";
                        const artikelLink = document.createElement("a");
                        artikelLink.href = "#";
                        artikelLink.className = "product-link underline underline-offset-4";
                        artikelLink.textContent = product.title;
                        artikelLink.productId = product.id;
                        li.appendChild(artikelLink);
                        outerOl.appendChild(li);
                    }
                    outerOl.addEventListener("click", function (event) {
                        if (event.target.classList.contains("product-link")) {
                            event.preventDefault();
                            const clickedProductId = event.target.productId;
                            loadProductData(clickedProductId);
                            console.log("Clicked Product ID: " + clickedProductId);
                        }
                    });

                }

                wishListDiv.appendChild(outerOl);

                //Falls user keinen Warenkorb hat
            } else {
                const noResults = document.createElement("p");
                noResults.className = "text-pink-600 font-bold";
                noResults.textContent = 'Dieser User hat leider keinen Wunschzettel.';
                wishListDiv.appendChild(noResults);
                switchView(3);
            }

            switchView(3);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Warenkorbdaten: ' + error);
        });
}