document.addEventListener("DOMContentLoaded", () => {

  // ✅ Toggle 'Read More' in About Section
  const readMoreBtn = document.querySelector(".btn-read");
  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const moreText = document.getElementById("more-text");

      if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline";
        readMoreBtn.textContent = "Read Less...";
      } else {
        moreText.style.display = "none";
        readMoreBtn.textContent = "Read More...";
      }
    });
  }

  // ✅ Smooth Scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ✅ Contact Form Validation + Fetch API Submission
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      // Basic client-side validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const data = { name, email, phone, subject, message };

      try {
        const res = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          window.location.href = "thankyou.html"; // ✅ Redirect on success
        } else {
          const errData = await res.text();
          console.error("❌ Error Response:", errData);
          alert("❌ Message not sent. Server error.");
        }
      } catch (error) {
        console.error("❌ Network Error:", error);
        alert("❌ Something went wrong. Please try again.");
      }
    });
  }

});
