// Initialize EmailJS
(function () {
  emailjs.init("ciDzrXIXltnwhSv56"); // তোমার Public Key
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMsg = document.querySelector(".success");
  const errorMsg = document.querySelector(".error");

  // Initially hide messages
  successMsg.style.display = "none";
  errorMsg.style.display = "none";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    // Send email to YOU only
    emailjs
      .send("service_zptzpok", "template_zrgvjcc", formData)
      .then(function () {
        successMsg.style.display = "block";
        errorMsg.style.display = "none";
        form.reset();
      })
      .catch(function (error) {
        console.error("Error:", error);
        successMsg.style.display = "none";
        errorMsg.style.display = "block";
      });
  });
});
