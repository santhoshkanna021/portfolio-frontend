// Toggle 'Read More' in About Section
function toggleReadMore(event) {
  event.preventDefault();
  const moreText = document.getElementById("more-text");
  const btn = event.target;

  if (moreText.style.display === "none" || moreText.style.display === "") {
    moreText.style.display = "inline";
    btn.textContent = "Read Less...";
  } else {
    moreText.style.display = "none";
    btn.textContent = "Read More...";
  }
}

// Optional: Smooth scroll for anchor links (polyfill for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Optional: Basic contact form check (in case HTML5 validation fails)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        alert("Please fill in all required fields.");
      }
    });
  }
});
