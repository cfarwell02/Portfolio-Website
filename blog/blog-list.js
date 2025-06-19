document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = "https://pnuyswkasffbbcquntvq.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudXlzd2thc2ZmYmJjcXVudHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDM2MjAsImV4cCI6MjA2NTcxOTYyMH0.OWhlKHdnuF2AkLszwoUvkrradExz91t55UnyI8UatSs";
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const container = document.getElementById("posts-container");
  const loadingDiv = document.getElementById("loading");

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    loadingDiv.style.display = "none";

    if (error) {
      container.innerHTML = `<div class="alert alert-danger">Error loading posts: ${error.message}</div>`;
      return;
    }
    if (!data || data.length === 0) {
      container.innerHTML = `<div class="alert alert-warning">No posts yet!</div>`;
      return;
    }

    container.innerHTML = "";
    data.forEach((post) => {
      const col = document.createElement("div");
      col.className = "col-md-8";
      col.innerHTML = `
          <div class="card shadow-sm mb-3">
            <div class="card-body">
              <h3 class="card-title">
                <a href="post.html?id=${
                  post.id
                }" class="text-decoration-none">${post.title}</a>
              </h3>
              <p class="card-text text-secondary mb-2" style="font-size: 0.95em;">
                ${new Date(post.created_at).toLocaleDateString()}
              </p>
              <p class="card-text">${post.content.substring(0, 140)}${
        post.content.length > 140 ? "…" : ""
      }</p>
              <a href="post.html?id=${
                post.id
              }" class="btn btn-outline-primary btn-sm">Read more</a>
            </div>
          </div>
        `;
      container.appendChild(col);
    });
  }

  fetchPosts();
});
