// blog-admin.js
const supabaseUrl = "https://pnuyswkasffbbcquntvq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudXlzd2thc2ZmYmJjcXVudHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDM2MjAsImV4cCI6MjA2NTcxOTYyMH0.OWhlKHdnuF2AkLszwoUvkrradExz91t55UnyI8UatSs";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Elements
const authSection = document.getElementById("auth-section");
const adminSection = document.getElementById("admin-section");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authMsg = document.getElementById("auth-message");
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
const createPostBtn = document.getElementById("create-post");
const postsList = document.getElementById("posts-list");

// Auth
loginBtn.onclick = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value,
  });
  if (error) {
    authMsg.textContent = error.message;
  } else {
    showAdmin();
  }
};

logoutBtn.onclick = async () => {
  await supabase.auth.signOut();
  showLogin();
};

async function checkAuth() {
  const { data } = await supabase.auth.getUser();
  if (data.user) showAdmin();
  else showLogin();
}

function showLogin() {
  authSection.style.display = "";
  adminSection.style.display = "none";
}

function showAdmin() {
  authSection.style.display = "none";
  adminSection.style.display = "";
  fetchPosts();
}

// CRUD
createPostBtn.onclick = async () => {
  const { error } = await supabase.from("posts").insert([
    {
      title: postTitle.value,
      content: postContent.value,
      author: emailInput.value, // or your email
    },
  ]);
  if (!error) {
    postTitle.value = "";
    postContent.value = "";
    fetchPosts();
  }
};

async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  postsList.innerHTML = "";
  data.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${post.title}</strong> - ${post.content.substring(
      0,
      60
    )}... <button onclick="deletePost(${post.id})">Delete</button>`;
    postsList.appendChild(li);
  });
}

window.deletePost = async (id) => {
  await supabase.from("posts").delete().eq("id", id);
  fetchPosts();
};

// On load
checkAuth();
