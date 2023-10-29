import { variables } from './const.js';

export const fetchUserData = () => {
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
            // Aktion, falls kein User gefunden wird
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