const supabaseUrl = "https://pnuyswkasffbbcquntvq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudXlzd2thc2ZmYmJjcXVudHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDM2MjAsImV4cCI6MjA2NTcxOTYyMH0.OWhlKHdnuF2AkLszwoUvkrradExz91t55UnyI8UatSs";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const list = document.getElementById("posts-list");
  if (error) {
    list.innerHTML = `<li>Error loading posts.</li>`;
    return;
  }
  list.innerHTML = "";
  data.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="post.html?id=${post.id}"><strong>${
      post.title
    }</strong></a> &ndash; ${new Date(post.created_at).toLocaleDateString()}`;
    list.appendChild(li);
  });
}

fetchPosts();
