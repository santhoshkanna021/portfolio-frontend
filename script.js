document.addEventListener("DOMContentLoaded", () => {
  // ✅ Toggle 'Read More' in About Section
  const readMoreBtn = document.querySelector(".btn-read");
  const moreText = document.getElementById("more-text");

  if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const isHidden = moreText.style.display === "none" || moreText.style.display === "";

      moreText.style.display = isHidden ? "inline" : "none";
      readMoreBtn.textContent = isHidden ? "Read Less..." : "Read More...";
    });
  }

  // ✅ Smooth Scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ✅ Contact Form Validation + Fetch API Submission
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name?.value.trim();
      const email = form.email?.value.trim();
      const phone = form.phone?.value.trim();
      const subject = form.subject?.value.trim();
      const message = form.message?.value.trim();

      // Basic client-side validation
      if (!name || !email || !message) {
        alert("⚠️ Please fill in Name, Email, and Message.");
        return;
      }

      const data = { name, email, phone, subject, message };

      try {
        const res = await fetch("https://portfolio-backend-seven-kappa.vercel.app/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          window.location.href = "thankyou.html";
        } else {
          const errorMsg = await res.text();
          console.error("❌ Server Error:", errorMsg);
          alert("❌ Message not sent. Server error occurred.");
        }
      } catch (err) {
        console.error("❌ Network Error:", err);
        alert("❌ Something went wrong. Please try again later.");
      }
    });
  }
});
