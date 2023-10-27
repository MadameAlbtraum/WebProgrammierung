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
                    nameCell.innerHTML = user.firstName + ' ' + user.lastName;
                    usernameCell.innerHTML = user.username;
                    usernameCell.classList.add('pl-4');
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

/*
// Funktion, um die Anfrage zu senden und Daten anzuzeigen
function fetchData() {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://dummyjson.com/users/search?q=${searchInput}`;
    const searchResultTitel = document.getElementById('searchResult-titel'); // H2-Element
    const searchResult = document.getElementById('searchResult'); // Div-Element

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const dataList = document.getElementById('found-data');
            dataList.innerHTML = ''; // Lösche vorherige Daten

            if (data.users && data.users.length > 0) {
                for (user of data.users) {
                    console.log(user);
                    const listItem = document.createElement('li');
                    listItem.textContent = user.firstName + ' ' + user.lastName + ' Username: ' + user.username; // Passe an, welche Daten angezeigt werden sollen
                    dataList.appendChild(listItem);
                }

                searchResultTitel.style.display = "block";
                searchResult.style.display = "block";
            }
            else {
                const listItem = document.createElement('li');
                listItem.textContent = 'Deine Suche ergab leider keinen Treffer'
                dataList.appendChild(listItem);

                searchResultTitel.style.display = "block";
                searchResult.style.display = "block";
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Daten: ' + error);
        });
}*/


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
