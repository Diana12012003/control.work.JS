const postId = new URLSearchParams(window.location.search).get("id");
console.log("URL:", window.location.href);
console.log("Отриманий ID поста:", postId);
if (postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postContainer = document.getElementById("postContainer");
            postContainer.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;
        })

        .catch(error => console.error("Помилка завантаження поста:", error));

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.getElementById("commentsContainer");

            commentsContainer.innerHTML = comments.map(comment => `
                <div class="comment-block">
                    <h3>${comment.name}</h3>
                    <p><b>Email:</b> ${comment.email}</p>
                    <p>${comment.body}</p>
                </div>
            `).join('');
        })
        .catch(error => console.error("Помилка завантаження коментарів:", error));
} else {
    console.error("Помилка: ID поста не знайдено в URL.");
}

