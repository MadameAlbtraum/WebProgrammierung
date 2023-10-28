// nach user suchen und Date laden
function fetchData() {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://dummyjson.com/users/search?q=${searchInput}`;
    const searchResultTitel = document.getElementById('searchResult-titel');
    const searchResult = document.getElementById('searchResult');
    const tableBody = document.getElementById('tabledat');

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
                    usernameCell.classList.add('pl-4');

                    // user an link hängen
                    const userLink = usernameCell.querySelector('.user-link');
                    userLink.user = user;

                    // Event Listener für Benutzernamen-Link
                    userLink.addEventListener('click', function (event) {
                        event.preventDefault();
                        const clickedUsername = this.user.username;
                        const clickedUser = data.users.find(u => u.username === clickedUsername);

                        if (clickedUser) {
                            const userId = clickedUser.id;
                            loadUserData(userId);
                            console.log(userId);
                            console.log(clickedUser);
                            console.log(clickedUsername);
                        }
                    });
                }

                searchResultTitel.style.display = "block";
                searchResult.style.display = "block";
            }

            else {
                const row = tableBody.insertRow();
                const noResultsCell = row.insertCell(0);
                noResultsCell.colSpan = 2;
                noResultsCell.textContent = 'Deine Suche ergab leider keinen Treffer';

                searchResultTitel.style.display = "block";
                searchResult.style.display = "block";
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Daten: ' + error);
        });
}



function loadUserData(userId) {
    const cartUrl = `https://dummyjson.com/carts/user/${userId}`;
    const wishListDiv = document.getElementById('wishList');
    const searchResultTitel = document.getElementById('searchResult-titel');
    const searchResult = document.getElementById('searchResult');
    const cart = document.getElementById('cart');

    fetch(cartUrl)
        .then(response => response.json())
        .then(cartData => {
            console.log('Geladene Warenkorbdaten:', cartData);

            if (cartData.carts && cartData.carts.length > 0) {
                const outerOl = document.createElement("ol");
                const headerSpan = document.createElement("span");
                headerSpan.textContent = "Wunschliste";
                headerSpan.className = "font-bold text-lg"
                outerOl.appendChild(headerSpan);
                document.body.appendChild(outerOl);
                outerOl.className = "list-disc pl-4";

                for (const cart of cartData.carts) {
                    for (const product of cart.products) {
                        const li = document.createElement("li");
                        li.className = "mb-1";
                        const artikelLink = document.createElement("a");
                        artikelLink.href = "#";
                        artikelLink.className = "product-link";
                        artikelLink.textContent = product.title;
                        artikelLink.productId = product.id;
                        li.appendChild(artikelLink);
                        outerOl.appendChild(li);
                    }
                    outerOl.addEventListener("click", function (event) {
                        if (event.target.classList.contains("product-link")) {
                            event.preventDefault();
                            const clickedProductId = event.target.productId;
                            // Hier können Sie die Produktinformationen basierend auf clickedProductId laden und anzeigen
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
                searchResultTitel.style.display = "none";
                searchResult.style.display = "none";
                cart.style.display = "block";
            }

            searchResultTitel.style.display = "none";
            searchResult.style.display = "none";
            cart.style.display = "block";

        })
        .catch(error => {
            console.error('Fehler beim Laden der Warenkorbdaten: ' + error);
        });
}


// Event-Listener für Button 
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', fetchData);

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
