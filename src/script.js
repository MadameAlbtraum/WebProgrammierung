
// Funktion, um die Anfrage zu senden und Daten anzuzeigen
function fetchData() {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://dummyjson.com/users/search?q=${searchInput}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const dataList = document.getElementById('found-data');
            dataList.innerHTML = ''; // Lösche vorherige Daten

            if (data.users) {
                for (user of data.users) {
                    console.log(user);
                    const listItem = document.createElement('li');
                    listItem.textContent = user.firstName; // Passe an, welche Daten angezeigt werden sollen
                    dataList.appendChild(listItem);
                }

            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Daten: ' + error);
        });
}

// Event-Listener für den Button hinzufügen
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', fetchData);


