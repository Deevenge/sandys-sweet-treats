// ===============================
// EMAILJS INIT
// ===============================
(function () {
  emailjs.init("7t3SmVwZrfxAZCFfx");
})();

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // MOBILE HAMBURGER MENU
  // ===============================
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    document.querySelectorAll("nav ul li a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }

  // ===============================
  // MENU VARIABLES
  // ===============================
  const menuPopup = document.getElementById("menuPopup");
  const menuTitle = document.getElementById("menuTitle");
  const menuItems = document.getElementById("menuItems");
  const closePopup = document.getElementById("closePopup");
  const finishOrderBtn = document.getElementById("finishOrder");

  const orderTextarea = document.querySelector("#orderForm textarea");

  const customAlert = document.getElementById("customAlert");
  const alertText = document.getElementById("alertText");
  const continueBtn = document.getElementById("continueOrdering");
  const sendOrderBtn = document.getElementById("sendOrder");

  const contactSection = document.getElementById("contact");

  let cart = [];
  let cartTotal = 0;

  const menus = {
    "Scones": ["5 Liters: R250", "10 Liters: R440", "20 Liters: R600"],
    "Classic Cookies": ["5 Liters: R200", "10 Liters: R380", "20 Liters: R550"],
    "Fluffy Muffins": ["5 Liters: R220", "10 Liters: R400", "20 Liters: R580"]
  };

  // ===============================
  // HELPER FUNCTIONS
  // ===============================
  function parsePrice(priceStr) {
    return Number(priceStr.replace(/[^\d.]/g, ""));
  }

  function revealContactSection() {
    contactSection.classList.remove("hidden-contact");
    contactSection.classList.add("show-contact");

    setTimeout(() => {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  function updateOrderTextarea() {
    let text = cart.join("\n");

    if (cartTotal > 0) {
      text += `\n--------------------------\nTotal: R${cartTotal}`;
    }

    orderTextarea.value = text;
  }

  function updatePopupTotal() {
    let totalDiv = document.getElementById("popupTotal");

    if (!totalDiv) {
      totalDiv = document.createElement("div");
      totalDiv.id = "popupTotal";
      totalDiv.style.fontWeight = "bold";
      totalDiv.style.marginTop = "10px";
      menuItems.parentElement.appendChild(totalDiv);
    }

    totalDiv.innerText = `Total: R${cartTotal}`;
  }

  // ===============================
  // PRODUCT CARD CLICK
  // ===============================
  document.querySelectorAll(".product-grid .card").forEach(card => {
    card.addEventListener("click", () => {
      const treatName = card.querySelector("h3").innerText;
      openMenu(treatName);
    });
  });

  // ===============================
  // OPEN MENU FUNCTION
  // ===============================
  function openMenu(treatName) {

    menuTitle.innerText = treatName;
    menuItems.innerHTML = "";

    menus[treatName].forEach(item => {

      const [size, price] = item.split(":");

      const itemCard = document.createElement("div");
      itemCard.classList.add("menu-item-card");

      const itemText = document.createElement("p");
      itemText.innerText = `${size.trim()} - ${price.trim()}`;

      const addBtn = document.createElement("button");
      addBtn.classList.add("btn");
      addBtn.innerText = "Add to Oven"; // renamed button

      addBtn.addEventListener("click", () => {

        const orderText = `${treatName} - ${size.trim()} - ${price.trim()}`;

        cart.push(orderText);
        cartTotal += parsePrice(price.trim());

        updateOrderTextarea();
        updatePopupTotal();

        alertText.innerText = `${orderText} added to your oven!`;
        customAlert.style.display = "flex";

      });

      itemCard.appendChild(itemText);
      itemCard.appendChild(addBtn);
      menuItems.appendChild(itemCard);

    });

    // Add a "Check Oven" button at bottom
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("btn");
    checkBtn.innerText = "Check Oven";
    checkBtn.style.marginTop = "10px";

    checkBtn.addEventListener("click", () => {
      menuItems.innerHTML = ""; // clear items
      if (cart.length === 0) {
        menuItems.innerHTML = "<p>Your oven is empty.</p>";
      } else {
        cart.forEach((itemText, index) => {
          const ovenCard = document.createElement("div");
          ovenCard.classList.add("menu-item-card");

          const textP = document.createElement("p");
          textP.innerText = itemText;

          const removeBtn = document.createElement("button");
          removeBtn.classList.add("btn");
          removeBtn.innerText = "Remove";

          removeBtn.addEventListener("click", () => {
            cartTotal -= parsePrice(itemText.split(" - ").pop());
            cart.splice(index, 1);
            updateOrderTextarea();
            updatePopupTotal();
            openMenu(treatName); // reopen menu after removal
          });

          ovenCard.appendChild(textP);
          ovenCard.appendChild(removeBtn);
          menuItems.appendChild(ovenCard);
        });
      }
      updatePopupTotal();
    });

    menuItems.appendChild(checkBtn);

    updatePopupTotal();
    menuPopup.style.display = "flex";
  }

  // ===============================
  // CLOSE MENU
  // ===============================
  if (closePopup) {
    closePopup.addEventListener("click", () => {
      menuPopup.style.display = "none";
    });
  }

  if (menuPopup) {
    menuPopup.addEventListener("click", e => {
      if (e.target === menuPopup) menuPopup.style.display = "none";
    });
  }

  // ===============================
  // FINISH ORDER
  // ===============================
  finishOrderBtn.addEventListener("click", () => {
    menuPopup.style.display = "none";
    revealContactSection();
  });

  continueBtn.addEventListener("click", () => {
    customAlert.style.display = "none";
    menuPopup.style.display = "none";

    document
      .getElementById("products")
      .scrollIntoView({ behavior: "smooth" });
  });

  sendOrderBtn.addEventListener("click", () => {
    customAlert.style.display = "none";
    menuPopup.style.display = "none";
    revealContactSection();
  });

  // ===============================
  // FORM SUBMIT
  // ===============================
  const form = document.getElementById("orderForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";
    successMessage.innerText = "";

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const orderDetails = form.querySelector("textarea").value.trim();

    if (!name || !email || !orderDetails) {

      successMessage.innerText = "Please fill in all fields.";

      submitBtn.disabled = false;
      submitBtn.innerHTML = "Send Order";

      return;
    }

    // ===============================
    // GENERATE PDF
    // ===============================
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Sandy's Sweet Treats", 20, 20);

    doc.setFontSize(12);
    doc.text(`Customer: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text("Order Details:", 20, 70);

    const lines = doc.splitTextToSize(orderDetails, 170);
    doc.text(lines, 20, 80);

    doc.save("Sandy_Order_Invoice.pdf");

    // ===============================
    // EMAILJS SEND
    // ===============================
    emailjs
      .send("service_5x43lc8", "template_gk7slp7", {
        name: name,
        email: email,
        order_details: orderDetails,
        title: "New Order from Website"
      })
      .then(() => {

        successMessage.innerText =
          "Order sent successfully! Invoice downloaded.";

        form.reset();

        cart = [];
        cartTotal = 0;
        orderTextarea.value = "";

        const popupTotal = document.getElementById("popupTotal");
        if (popupTotal) popupTotal.innerText = "";

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Send Order";
      })
      .catch(error => {

        console.error(error);

        successMessage.innerText = "Oops! Something went wrong.";

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Send Order";
      });
  });

  // ===============================
  // GALLERY AUTO IMAGE SWITCHING
  // ===============================
  const galleryImages = {
    galleryScones: [
      "imgs/gallery/nu3.png",
      "imgs/gallery/nu2.png",
      "imgs/gallery/co1.png"
    ],
    galleryCookies: [
      "imgs/gallery/co3.png",
      "imgs/gallery/co2.png",
      "imgs/gallery/mf2.jpg"
    ],
    galleryMuffins: [
      "imgs/gallery/nu1.png",
      "imgs/gallery/c2.png",
      "imgs/gallery/mf3.jpg"
    ]
  };

  Object.keys(galleryImages).forEach(id => {

    const element = document.getElementById(id);
    if (!element) return;

    const images = galleryImages[id];
    let index = 0;

    element.style.backgroundImage = `url(${images[index]})`;

    setInterval(() => {

      index = (index + 1) % images.length;
      element.style.backgroundImage = `url(${images[index]})`;

    }, 5000);
  });

  // ===============================
  // GALLERY POPUP
  // ===============================
  const popup = document.getElementById("galleryPopup");
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const popupDescription = document.getElementById("popupDescription");
  const popupClose = document.getElementById("galleryClose");

  const treatInfo = {

    Scones: {
      desc: "Our homemade scones are baked fresh daily using traditional recipes."
    },

    "Classic Cookies": {
      desc: "Our classic cookies are rich, chewy, and full of flavor."
    },

    "Fluffy Muffins": {
      desc: "Our muffins are light, moist, and bursting with sweetness."
    }
  };

  document.querySelectorAll(".gallery-card").forEach(card => {

    card.addEventListener("click", () => {

      const treatName = card.getAttribute("data-treat");

      popupTitle.innerText = treatName;
      popupDescription.innerText = treatInfo[treatName].desc;

      const cardImage = card.querySelector(".gallery-card-img");
      popupImage.style.backgroundImage = cardImage.style.backgroundImage;

      popup.style.display = "flex";
    });
  });

  popupClose.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });

});