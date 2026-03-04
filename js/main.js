// ------------------- HAMBURGER -------------------
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// ------------------- SMOOTH SCROLL -------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 100; 
    const topPos = target.offsetTop - offset;
    window.scrollTo({ top: topPos, behavior: 'smooth' });
    nav.classList.remove('active'); 
  });
});

// ------------------- FORM SUBMIT -------------------
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

// ------------------- MENU & CART -------------------
document.addEventListener('DOMContentLoaded', () => {

  const menuPopup = document.getElementById('menuPopup');
  const menuTitle = document.getElementById('menuTitle');
  const menuItems = document.getElementById('menuItems');
  const closePopup = document.getElementById('closePopup');
  const orderTextarea = document.querySelector('#orderForm textarea');

  const customAlert = document.getElementById('customAlert');
  const alertText = document.getElementById('alertText');
  const continueBtn = document.getElementById('continueOrdering');
  const sendOrderBtn = document.getElementById('sendOrder');

  let cart = [];

  const menus = {
    "Scones": ["5 Liters: R250", "10 Liters: R440", "20 Liters: R600"],
    "Classic Cookies": ["5 Liters: R200", "10 Liters: R380", "20 Liters: R550"],
    "Fluffy Muffins": ["5 Liters: R220", "10 Liters: R400", "20 Liters: R580"]
  };

  // Show menu popup
  document.querySelectorAll('.product-grid .card').forEach(card => {
    card.addEventListener('click', () => {
      const treatName = card.querySelector('h3').innerText;
      menuTitle.innerText = treatName;
      menuItems.innerHTML = '';

      menus[treatName].forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;

        li.addEventListener('click', () => {
          const [size, price] = item.split(':');
          const orderText = `${treatName} - ${size.trim()} - ${price.trim()}`;
          cart.push(orderText);
          orderTextarea.value = cart.join('\n');

          alertText.innerText = `${orderText} added to your order!`;
          customAlert.style.display = 'flex';
        });

        menuItems.appendChild(li);
      });

      menuPopup.style.display = 'flex';
    });
  });

  // Close popup
  closePopup.addEventListener('click', () => menuPopup.style.display = 'none');
  menuPopup.addEventListener('click', e => { if(e.target === menuPopup) menuPopup.style.display = 'none'; });

  // Custom alert buttons
  continueBtn.addEventListener('click', () => {
    customAlert.style.display = 'none';
    menuPopup.style.display = 'none';
    document.getElementById('products').scrollIntoView({behavior: 'smooth'});
  });

  sendOrderBtn.addEventListener('click', () => {
    customAlert.style.display = 'none';
    menuPopup.style.display = 'none';
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
  });

});