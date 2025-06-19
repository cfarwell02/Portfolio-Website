const supabaseUrl = "https://pnuyswkasffbbcquntvq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudXlzd2thc2ZmYmJjcXVudHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDM2MjAsImV4cCI6MjA2NTcxOTYyMH0.OWhlKHdnuF2AkLszwoUvkrradExz91t55UnyI8UatSs";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect form values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Insert into Supabase
    const { data, error } = await supabase
      .from("submissions")
      .insert([{ name, email, message }]);

    if (error) {
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
      console.error(error);
    } else {
      alert("Thank you for reaching out! I'll get back to you soon.");
      form.reset();
      window.location.href = "thanks.html"; // Redirect to thank you page
    }
  });
});
