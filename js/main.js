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