document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = "https://pnuyswkasffbbcquntvq.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudXlzd2thc2ZmYmJjcXVudHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDM2MjAsImV4cCI6MjA2NTcxOTYyMH0.OWhlKHdnuF2AkLszwoUvkrradExz91t55UnyI8UatSs";
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single();
    loadingDiv.style.display = "none";
    if (error || !data) {
      postContainer.innerHTML =
        '<div class="alert alert-danger">Post not found.</div>';
      return;
    }
    postContainer.innerHTML = `
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <h1 class="card-title mb-2">${data.title}</h1>
              <div class="text-secondary mb-3" style="font-size:1rem;">${new Date(
                data.created_at
              ).toLocaleDateString()}</div>
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
