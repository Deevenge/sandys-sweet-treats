// main.js

// Hamburger menu logic
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

// Smooth scroll logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 100; // header height
    const topPos = target.offsetTop - offset;
    window.scrollTo({ top: topPos, behavior: 'smooth' });
    nav.classList.remove('active'); // close mobile menu
  });
});

// Form submit logic
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

// ---------------------------
// MENU POPUP DYNAMIC LOGIC
document.addEventListener('DOMContentLoaded', () => {
  // MENU POPUP DYNAMIC LOGIC
  const menuPopup = document.getElementById('menuPopup');
  const menuTitle = document.getElementById('menuTitle');
  const menuItems = document.getElementById('menuItems');
  const closePopup = document.getElementById('closePopup');

  const menus = {
    "Scones": ["5 Liters: R250", "10 Liters: R440", "20 Liters: R600"],
    "Classic Cookies": ["5 Liters: R200", "10 Liters: R380", "20 Liters: R550"],
    "Fluffy Muffins": ["5 Liters: R220", "10 Liters: R400", "20 Liters: R580"]
  };

  // Attach click to ALL cards
  document.querySelectorAll('.product-grid .card').forEach(card => {
    card.addEventListener('click', () => {
      const treatName = card.querySelector('h3').innerText;
      menuTitle.innerText = treatName;
      menuItems.innerHTML = '';
      menus[treatName].forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;

        // Setup click event for future dynamic ordering
        li.addEventListener('click', () => {
          alert(`You selected ${item} of ${treatName}`);
          menuPopup.style.display = 'none'; // optional close after click
        });

        menuItems.appendChild(li);
      });
      menuPopup.style.display = 'flex';
    });
  });

  // Close popup when X or outside clicked
  closePopup.addEventListener('click', () => menuPopup.style.display = 'none');
  menuPopup.addEventListener('click', e => {
    if(e.target === menuPopup) menuPopup.style.display = 'none';
  });
});