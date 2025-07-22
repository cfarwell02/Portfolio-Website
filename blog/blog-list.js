document.addEventListener("DOMContentLoaded", function () {
  const db = firebase.firestore();
  const postsRef = db.collection("posts");
  const container = document.getElementById("posts-container");
  const loadingDiv = document.getElementById("loading");

  async function fetchPosts() {
    const snapshot = await postsRef.orderBy("createdAt", "desc").get();
    loadingDiv.style.display = "none";
    if (snapshot.empty) {
      container.innerHTML = `<div class="alert alert-warning">No posts yet!</div>`;
      return;
    }
    container.innerHTML = "";
    snapshot.forEach((doc) => {
      const post = doc.data();
      const col = document.createElement("div");
      col.className = "col-md-8";
      col.innerHTML = `
          <div class="card shadow-sm mb-3">
            <div class="card-body">
              <h3 class="card-title">
                <a href="post.html?id=${doc.id}" class="text-decoration-none">${
        post.title
      }</a>
              </h3>
              <p class="card-text text-secondary mb-2" style="font-size: 0.95em;">
                ${
                  post.createdAt && post.createdAt.toDate
                    ? post.createdAt.toDate().toLocaleDateString()
                    : ""
                }
              </p>
              <p class="card-text">${post.content.substring(0, 140)}${
        post.content.length > 140 ? "…" : ""
      }</p>
              <a href="post.html?id=${
                doc.id
              }" class="btn btn-outline-primary btn-sm">Read more</a>
            </div>
          </div>
        `;
      container.appendChild(col);
    });
  }

  fetchPosts();
});
