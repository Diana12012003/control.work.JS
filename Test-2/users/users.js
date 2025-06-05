const userId = new URLSearchParams(window.location.search).get("id");
console.log("Отриманий ID:", userId);
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        const userContainer = document.getElementById("userContainer");

            console.log("USER:", user);
            let userBlock = document.createElement("div");
            userBlock.classList.add("user-block");
            userBlock.innerHTML = `
            <p><b>ID:</b> ${user.id}</p>
            <h2>Name: ${user.name}</h2>
            <h2>Username: ${user.username}</h2>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Address:</b></p>
    <ul>
        <li><b>Street:</b> ${user.address.street}</li>
        <li><b>Suite:</b> ${user.address.suite}</li>
        <li><b>City:</b> ${user.address.city}</li>
        <li><b>Zipcode:</b> ${user.address.zipcode}</li>
    </ul>
            <p><b>Geo:</b></p>
            <ul>
            <li><b>Lat:</b> ${user.address.geo.lat}</li>
            <li><b>Lng:</b> ${user.address.geo.lng}</li>
</ul>
            <p><b>Phone:</b> ${user.phone}</p>
            <p><b>Website:</b> ${user.website}</p>
            <p><b>Company:</b> </p>
            <ul>
            <li><b>Name:</b> ${user.company.name}</li>
            <li><b>catchPhrase:</b> ${user.company.catchPhrase}</li>
            <li><b>bs:</b> ${user.company.bs}</li>
</ul>
            <button class="load-posts" data-user-id="${user.id}">Posts of current user</button>
                <div class="posts-container"></div>
           
        `;
            userContainer.appendChild(userBlock);

            let button = userBlock.querySelector(".load-posts");
            let postsContainer = userBlock.querySelector(".posts-container");

            button.addEventListener("click", function () {
                if (postsContainer.style.display === "none") {
                    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                        .then(response => response.json())
                        .then(posts => {
                            postsContainer.innerHTML = "";

                            posts.forEach(post => {
                                let postBlock = document.createElement("div");
                                postBlock.classList.add("post-block");

                                postBlock.innerHTML = `
                                    <h3>${post.title}</h3>
                                    <a href="post-details.html?id=${post.id}">View Post</a>
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