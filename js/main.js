const form = document.getElementById("orderForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerHTML = "Sending <span class='dots'></span>";

  setTimeout(() => {
    successMessage.innerText =
      "Thank you! Your order has been received. We’ll contact you soon.";
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Order";
  }, 2000);
});

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close menu after clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});
