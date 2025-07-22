document.addEventListener("DOMContentLoaded", function () {
  const db = firebase.firestore();
  const postsRef = db.collection("posts");

  function getPostId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  async function fetchPost() {
    const postId = getPostId();
    const loadingDiv = document.getElementById("loading");
    const postContainer = document.getElementById("post-container");

    if (!postId) {
      loadingDiv.style.display = "none";
      postContainer.innerHTML =
        '<div class="alert alert-warning">No post ID provided.</div>';
      return;
    }
    const doc = await postsRef.doc(postId).get();
    loadingDiv.style.display = "none";
    if (!doc.exists) {
      postContainer.innerHTML =
        '<div class="alert alert-danger">Post not found.</div>';
      return;
    }
    const data = doc.data();
    postContainer.innerHTML = `
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <h1 class="card-title mb-2">${data.title}</h1>
              <div class="text-secondary mb-3" style="font-size:1rem;">${
                data.createdAt && data.createdAt.toDate
                  ? data.createdAt.toDate().toLocaleDateString()
                  : ""
              }</div>
              <div class="card-text" style="font-size:1.1rem; line-height:1.6;">${data.content.replace(
                /\n/g,
                "<br>"
              )}</div>
            </div>
          </div>
        </div>
      `;
  }

  fetchPost();
});
