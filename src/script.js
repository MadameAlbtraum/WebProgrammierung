
// Funktion, um die Anfrage zu senden und Daten anzuzeigen
function fetchData() {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://dummyjson.com/users/search?q=${searchInput}`;

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

            }
            else {
                const listItem = document.createElement('li');
                listItem.textContent = 'Deine Suche ergab leider keinen Treffer'
                dataList.appendChild(listItem);
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Daten: ' + error);
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

