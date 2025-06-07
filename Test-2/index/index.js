fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(response => response.json())
    .then(users => {
        let container = document.getElementById("usersContainer");

        users.forEach(user => {
            let userBlock = document.createElement("div");
            userBlock.classList.add("user-block");

            userBlock.innerHTML = `
                <h2>${user.name}</h2>
            <p><b>ID:</b> ${user.id}</p>
                <a href="../user-details/user-details.html?id=${user.id}">Деталі</a>
                 `;
            console.log("USER ID for details:", user.id);
            container.appendChild(userBlock)
        });
    })
    .catch(error => console.error("Помилка завантаження користувачів", error));
