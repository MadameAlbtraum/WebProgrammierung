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

                    // Fülle die Zellen der Tabelle mit den Daten aus der API
                    nameCell.innerHTML = user.firstName + ' ' + user.lastName + user.id;
                    usernameCell.innerHTML = `<a href="#" class="user-link">${user.username}</a>`; // Benutzernamen als anklickbaren Link
                    usernameCell.classList.add('pl-4');

                    // Event Listener für den Benutzernamen-Link
                    usernameCell.querySelector('.user-link').addEventListener('click', function (event) {
                        event.preventDefault(); // Verhindert, dass der Link die Seite neu lädt
                        const clickedUsername = user.username;
                        const clickedUser = data.users.find(u => u.username === clickedUsername);

                        if (clickedUser) {
                            const userId = clickedUser.id;
                            loadUserData(userId); // Lade die Daten aus einer anderen API
                            console.log(userId);
                            console.log(clickedUser);
                            console.log(clickedUsername);
                        }
                    });
                }

                searchResultTitel.style.display = "block";
                searchResult.style.display = "block";
            } else {
                const row = tableBody.insertRow();
                const noResultsCell = row.insertCell(0);
                noResultsCell.colSpan = 2; // Zelle über beide Spalten erstrecken
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
    const cartUrl = `https://dummyjson.com/carts/user/99`; //hard codiert zum testen
    const tableBody = document.getElementById('cartdat');
    const searchResultTitel = document.getElementById('searchResult-titel');
    const searchResult = document.getElementById('searchResult');
    const cart = document.getElementById('cart');

    fetch(cartUrl)
        .then(response => response.json())
        .then(cartData => {
            // Verarbeite die geladenen Daten aus der zweiten API hier
            console.log('Geladene Warenkorbdaten:', cartData);

            if (cartData.carts && cartData.carts.length == 0) {
                const row = tableBody.insertRow();
                const noResultsCell = row.insertCell(0);
                noResultsCell.colSpan = 2; // Zelle über beide Spalten erstrecken
                noResultsCell.textContent = 'Dieser User hat leider keinen Wunschzettel';
                searchResultTitel.style.display = "none";
                searchResult.style.display = "none";
                cart.style.display = "block";
            }
            // Du kannst hier die Daten in der gewünschten Weise anzeigen oder verarbeiten
            searchResultTitel.style.display = "none";
            searchResult.style.display = "none";
            cart.style.display = "block";

        })
        .catch(error => {
            console.error('Fehler beim Laden der Warenkorbdaten: ' + error);
        });
}


// Event-Listener für den Button hinzufügen
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', fetchData);


const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("change", function () {
    if (menuToggle.checked) {
        menu.classList.add("active");
    } else {
        menu.classList.remove("active");
    }
});
