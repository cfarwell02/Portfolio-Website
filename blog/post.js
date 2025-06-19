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
  if (!postId) {
    document.getElementById("post").innerHTML = "<p>No post ID provided.</p>";
    return;
  }
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();
  if (error || !data) {
    document.getElementById("post").innerHTML = "<p>Post not found.</p>";
    return;
  }
  document.getElementById("post").innerHTML = `
    <h1>${data.title}</h1>
    <div><em>${new Date(data.created_at).toLocaleDateString()}</em></div>
    <div>${data.content}</div>
  `;
}

fetchPost();
