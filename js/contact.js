// Initialize EmailJS
(function () {
  emailjs.init("ciDzrXIXltnwhSv56"); // আপনার Public Key
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");

  function showToast(message) {
    toast.textContent = message;
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.style.opacity = "0";
    }, 1500);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_zptzpok", "template_zrgvjcc", formData)
      .then(function () {
        showToast("Message Sent Successfully!");
        form.reset();
      })
      .catch(function (error) {
        console.error("Error:", error);
        showToast("Failed to Send Message!");
      });
  });

  // Footer year set
  document.getElementById("currentYear").textContent = new Date().getFullYear();
});
