// main.js

// --- EMAILJS INIT ---
(function(){
  emailjs.init("7t3SmVwZrfxAZCFfx"); // your public key
})();

document.addEventListener('DOMContentLoaded', () => {

  // --- MENU LOGIC ---
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
  let cartTotal = 0; // total in Rands

  const menus = {
    "Scones": ["5 Liters: R250", "10 Liters: R440", "20 Liters: R600"],
    "Classic Cookies": ["5 Liters: R200", "10 Liters: R380", "20 Liters: R550"],
    "Fluffy Muffins": ["5 Liters: R220", "10 Liters: R400", "20 Liters: R580"]
  };

  // --- HELPER: parse price string "R250" -> 250
  function parsePrice(priceStr) {
    return Number(priceStr.replace(/[^\d.]/g, ''));
  }

  // --- HELPER: update textarea with cart + total
  function updateOrderTextarea() {
    let text = cart.join('\n');
    if(cartTotal > 0){
      text += `\n--------------------------\nTotal: R${cartTotal}`;
    }
    orderTextarea.value = text;
  }

  // --- HELPER: update popup total
  function updatePopupTotal() {
    const totalDiv = document.getElementById('popupTotal');
    if(!totalDiv){
      const div = document.createElement('div');
      div.id = 'popupTotal';
      div.style.fontWeight = 'bold';
      div.style.marginTop = '10px';
      div.innerText = `Total: R${cartTotal}`;
      menuItems.parentElement.appendChild(div);
    } else {
      totalDiv.innerText = `Total: R${cartTotal}`;
    }
  }

  // --- CARD CLICK LOGIC ---
  document.querySelectorAll('.product-grid .card').forEach(card => {
    card.addEventListener('click', () => {
      const treatName = card.querySelector('h3').innerText;
      menuTitle.innerText = treatName;
      menuItems.innerHTML = '';

      menus[treatName].forEach(item => {
        const [size, price] = item.split(':');

        const itemCard = document.createElement('div');
        itemCard.classList.add('menu-item-card');

        const itemText = document.createElement('p');
        itemText.innerText = `${size.trim()} - ${price.trim()}`;

        const addBtn = document.createElement('button');
        addBtn.classList.add('btn');
        addBtn.innerText = 'Add to Order';

        addBtn.addEventListener('click', () => {
          const orderText = `${treatName} - ${size.trim()} - ${price.trim()}`;
          cart.push(orderText);

          // --- update total
          const priceNumber = parsePrice(price.trim());
          cartTotal += priceNumber;

          updateOrderTextarea();
          updatePopupTotal();

          alertText.innerText = `${orderText} added to your order!`;
          customAlert.style.display = 'flex';
        });

        itemCard.appendChild(itemText);
        itemCard.appendChild(addBtn);
        menuItems.appendChild(itemCard);
      });

      updatePopupTotal(); // init total on popup open
      menuPopup.style.display = 'flex';
    });
  });

  // --- POPUP CLOSE ---
  closePopup.addEventListener('click', () => menuPopup.style.display = 'none');
  menuPopup.addEventListener('click', e => {
    if (e.target === menuPopup) menuPopup.style.display = 'none';
  });

  // --- CUSTOM ALERT BUTTONS ---
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

  // --- FORM SUBMISSION LOGIC ---
  const form = document.getElementById("orderForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default form submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending <span class='dots'></span>";
    successMessage.innerText = "";

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const orderDetails = form.querySelector('textarea').value.trim();

    if (!name || !email || !orderDetails) {
      successMessage.innerText = "Please fill in all fields.";
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Send Order";
      return;
    }

    emailjs.send("service_5x43lc8", "template_gk7slp7", {
      name: name,
      email: email,
      order_details: orderDetails,
      title: "New Order from Website" // for your template
    })
    .then((response) => {
      console.log("Email sent successfully!", response);
      successMessage.innerText = "Thank you! Your order has been received. We’ll contact you soon.";
      form.reset();

      // --- clear cart & total ---
      cart = [];
      cartTotal = 0;
      orderTextarea.value = '';
      const popupTotal = document.getElementById('popupTotal');
      if(popupTotal) popupTotal.innerText = '';

      submitBtn.disabled = false;
      submitBtn.innerHTML = "Send Order";
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      successMessage.innerText = "Oops! Something went wrong. Please try again.";
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Send Order";

      if(error && error.text) {
        successMessage.innerText += `\nError: ${error.text}`;
      }
    });
  });

});