const userId = new URLSearchParams(window.location.search).get("id");

if (userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(userData => {
            const userContainer = document.getElementById("userContainer");

            let userBlock = document.createElement("div");
            userBlock.classList.add("user-block");
            userBlock.innerHTML = `
                <p><b>ID:</b> ${userData.id}</p>
                <h2>Name: ${userData.name}</h2>
                <h2>Username: ${userData.username}</h2>
                <p><b>Email:</b> ${userData.email}</p>
                <p><b>Address:</b></p>
                <ul>
                    <li><b>Street:</b> ${userData.address.street}</li>
                    <li><b>Suite:</b> ${userData.address.suite}</li>
                    <li><b>City:</b> ${userData.address.city}</li>
                    <li><b>Zipcode:</b> ${userData.address.zipcode}</li>
                </ul>
                <p><b>Geo:</b></p>
                <ul>
                    <li><b>Lat:</b> ${userData.address.geo.lat}</li>
                    <li><b>Lng:</b> ${userData.address.geo.lng}</li>
                </ul>
                <p><b>Phone:</b> ${userData.phone}</p>
                <p><b>Website:</b> ${userData.website}</p>
                <p><b>Company:</b></p>
                <ul>
                    <li><b>Name:</b> ${userData.company.name}</li>
                    <li><b>CatchPhrase:</b> ${userData.company.catchPhrase}</li>
                    <li><b>bs:</b> ${userData.company.bs}</li>
                </ul>
               <button class="load-posts" data-user-id="${userData.id}">Posts of current user</button>
               <div class="posts-container"></div>
            `;


            userContainer.appendChild(userBlock);

            let button = userBlock.querySelector(".load-posts");
            let postsContainer = userBlock.querySelector(".posts-container");


            button.addEventListener("click", function () {
                if (postsContainer.style.display === "none") {
                    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                        .then(response => response.json())
                        .then(posts => {
                            postsContainer.innerHTML = "";

                            posts.forEach(post => {
                                let postBlock = document.createElement("div");
                                postBlock.classList.add("post-block");

                                postBlock.innerHTML = `
                                    <h3>${post.title}</h3>
                                    <a href="../post-details/post-details.html?id=${post.id}">View Post</a>
                                `;

                                postsContainer.appendChild(postBlock);
                            });

                            postsContainer.style.display = "grid";
                        })
                        .catch(error => console.error("Помилка завантаження постів:", error));
                } else {
                    postsContainer.style.display = "none";
                }
            });
        })
        .catch(error => console.error("Помилка завантаження користувачів:", error));
} else {
    console.error("Помилка: ID користувача не знайдено в URL.");
}
