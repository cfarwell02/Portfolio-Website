// blog-admin.js
document.addEventListener("DOMContentLoaded", function () {
  // Firebase references
  const db = firebase.firestore();
  const auth = firebase.auth();
  const postsRef = db.collection("posts");

  // Elements
  const postTitle = document.getElementById("post-title");
  const postContent = document.getElementById("post-content");
  const createPostBtn = document.getElementById("create-post");
  const postsList = document.getElementById("posts-list");
  const authSection = document.getElementById("auth-section");
  const adminSection = document.getElementById("admin-section");
  const logoutBtn = document.getElementById("logout");
  const loginBtn = document.getElementById("login");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const authMsg = document.getElementById("auth-message");

  // Auth state observer
  auth.onAuthStateChanged((user) => {
    if (user) {
      // Show admin dashboard for any authenticated user
      if (authSection) authSection.style.display = "none";
      if (adminSection) adminSection.style.display = "";
      fetchPosts();
    } else {
      // Not logged in
      if (authSection) authSection.style.display = "";
      if (adminSection) adminSection.style.display = "none";
    }
  });

  // Login
  if (loginBtn) {
    loginBtn.onclick = async () => {
      try {
        await auth.signInWithEmailAndPassword(
          emailInput.value,
          passwordInput.value
        );
        if (authMsg) {
          authMsg.classList.add("d-none");
          authMsg.textContent = "";
        }
      } catch (error) {
        if (authMsg) {
          authMsg.classList.remove("d-none");
          authMsg.textContent = error.message;
        }
      }
    };
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.onclick = function () {
      auth.signOut();
    };
  }

  // CRUD
  if (createPostBtn) {
    createPostBtn.onclick = async () => {
      const title = postTitle.value.trim();
      const content = postContent.value.trim();
      if (!title || !content) return;
      await postsRef.add({
        title,
        content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      postTitle.value = "";
      postContent.value = "";
      fetchPosts();
    };
  }

  async function fetchPosts() {
    const snapshot = await postsRef.orderBy("createdAt", "desc").get();
    postsList.innerHTML = "";
    if (snapshot.empty) {
      postsList.innerHTML = '<li class="list-group-item">No posts found.</li>';
      return;
    }
    snapshot.forEach((doc) => {
      const post = doc.data();
      // Use Bootstrap card for each post
      const li = document.createElement("li");
      li.className = "list-group-item p-0 border-0 mb-3";
      li.innerHTML = `
        <div class="card shadow-sm">
          <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div class="flex-grow-1">
              <h5 class="card-title mb-1">${post.title}</h5>
              <p class="card-text mb-1 text-muted" style="font-size:0.95em;">
                ${
                  post.createdAt && post.createdAt.toDate
                    ? post.createdAt.toDate().toLocaleDateString()
                    : ""
                }
              </p>
              <p class="card-text mb-0">${post.content.substring(0, 100)}${
        post.content.length > 100 ? "…" : ""
      }</p>
            </div>
            <button class="btn btn-sm btn-danger ms-md-3 mt-3 mt-md-0" onclick="deletePost('${
              doc.id
            }')">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      `;
      postsList.appendChild(li);
    });
  }

  window.deletePost = async (id) => {
    await postsRef.doc(id).delete();
    fetchPosts();
  };
});
