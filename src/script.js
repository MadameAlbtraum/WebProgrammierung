const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const labelSbutton = document.getElementById('sButtonLabel');
const backButton = document.getElementById('back');
const textStart = document.getElementById('textStart');
const searchResultTitel = document.getElementById('searchResult-titel');
const searchResult = document.getElementById('searchResult');
const wishListH2 = document.getElementById('wishListH2')
const cart = document.getElementById('cart');
const wishListDiv = document.getElementById('wishList');
const tableBody = document.getElementById('tabledat');
const productDiv = document.getElementById('product');
const productDetails = document.getElementById('productDetails');
const productImage = document.getElementById('images');
var currentView = 1;//Ansicht, Standard ist 1

function switchView(view) {
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
            break;

    }
}
function navigateBack() {
    if (currentView > 1) {
        currentView--;
        switchView(currentView);
    }
}
switchView(currentView);//Standardansicht setzen

// nach user suchen und Date laden
function fetchUserData() {
    const searchValue = searchInput.value;
    const url = `https://dummyjson.com/users/search?q=${searchValue}`;
    currentView = 2;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = ''; // Lösche vorherige Daten
            if (data.users && data.users.length > 0) {
                for (user of data.users) {
                    const row = tableBody.insertRow();
                    const nameCell = row.insertCell(0);
                    const usernameCell = row.insertCell(1);

                    // Tabelle mit Daten füllen
                    nameCell.innerHTML = user.firstName + ' ' + user.lastName;
                    usernameCell.innerHTML = `<a href="#" class="user-link">${user.username}</a>`;
                    usernameCell.className = "pl-4";

                    // user an link hängen
                    const userLink = usernameCell.querySelector('.user-link');
                    userLink.user = user;
                    userLink.className = "underline underline-offset-4";

                    // Event Listener für Benutzernamen-Link
                    userLink.addEventListener('click', function (event) {
                        event.preventDefault();
                        const clickedUsername = this.user.username;
                        const clickedUser = data.users.find(u => u.username === clickedUsername);

                        if (clickedUser) {
                            const userId = clickedUser.id;
                            loadUserData(userId, clickedUsername);
                            console.log(userId);
                            console.log(clickedUser);
                            console.log(clickedUsername);
                        }
                    });
                }

                switchView(currentView);
            }

            else {
                const row = tableBody.insertRow();
                const noResultsCell = row.insertCell(0);
                noResultsCell.colSpan = 2;
                noResultsCell.className = "text-pink-600 font-bold";
                noResultsCell.textContent = 'Deine Suche ergab leider keinen Treffer.';
                switchView(currentView);
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Daten: ' + error);
        });
}


function loadUserData(userId, clickedUsername) {
    const cartUrl = `https://dummyjson.com/carts/user/${userId}`;
    currentView = 3;

    fetch(cartUrl)
        .then(response => response.json())
        .then(cartData => {
            wishListDiv.innerHTML = ''; //lösche alte Daten

            if (cartData.carts && cartData.carts.length > 0) {
                wishListH2.textContent = "Wunschliste von " + clickedUsername;
                const headerH2 = document.createElement("h2");
                const outerOl = document.createElement("ol");

                document.body.appendChild(outerOl);
                outerOl.className = "list-disc pl-9";

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
                            // Fügen Sie hier Ihren Code hinzu, um die Produktinformationen zu laden und anzuzeigen
                        }
                    });

                }

                wishListDiv.appendChild(outerOl);
            } else {
                const noResults = document.createElement("p");
                noResults.className = "text-pink-600 font-bold";
                noResults.textContent = 'Dieser User hat leider keinen Wunschzettel.';
                wishListDiv.appendChild(noResults);
                switchView(currentView);
            }

            switchView(currentView);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Warenkorbdaten: ' + error);
        });
}

function loadProductData(clickedProductId) {
    const productUrl = `https://dummyjson.com/products/${clickedProductId}`;
    currentView = 4;
    fetch(productUrl)
        .then(response => response.json())
        .then(productData => {
            productImage.innerHTML = '';
            const title = document.getElementById('title');
            const price = document.getElementById('price');
            const brand = document.getElementById('brand');
            const desc = document.getElementById('description');
            const percentage = document.getElementById('percentage')
            const imageArray = document.getElementById('images');
            title.textContent = productData.title;
            price.textContent = productData.price + '€';
            brand.textContent = productData.brand;
            desc.textContent = productData.description;
            percentage.textContent = productData.discountPercentage + '%';

            productData.images.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.className = "inline max-width-images m-2 border border-solid border-2 border-slate-800";
                imageArray.appendChild(img);
            });

            switchView(currentView);
        })
}

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
