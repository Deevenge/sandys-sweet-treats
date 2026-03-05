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
    hamburger.addEventListener("click", () => nav.classList.toggle("active"));
    document.querySelectorAll("nav ul li a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("active"));
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
  const parsePrice = priceStr => Number(priceStr.replace(/[^\d.]/g, ""));

  const revealContactSection = () => {
    contactSection.classList.remove("hidden-contact");
    contactSection.classList.add("show-contact");
    setTimeout(() => contactSection.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const updateOrderTextarea = () => {
    let text = cart.join("\n");
    if (cartTotal > 0) text += `\n--------------------------\nTotal: R${cartTotal}`;
    orderTextarea.value = text;
  };

  const updatePopupTotal = () => {
    let totalDiv = document.getElementById("popupTotal");
    if (!totalDiv) {
      totalDiv = document.createElement("div");
      totalDiv.id = "popupTotal";
      totalDiv.style.fontWeight = "bold";
      totalDiv.style.marginTop = "10px";
      menuItems.parentElement.appendChild(totalDiv);
    }
    totalDiv.innerText = `Total: R${cartTotal}`;
  };

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

    let ovenContainer = document.getElementById("ovenContainer");
    if (!ovenContainer) {
      ovenContainer = document.createElement("div");
      ovenContainer.id = "ovenContainer";
      ovenContainer.style.marginTop = "20px";
      ovenContainer.style.padding = "10px";
      ovenContainer.style.borderTop = "2px dashed #ff8fa3";
      ovenContainer.style.maxHeight = "250px";
      ovenContainer.style.overflowY = "auto";
      ovenContainer.style.backgroundColor = "#fff4e6";
      ovenContainer.style.borderRadius = "8px";
      menuItems.parentElement.appendChild(ovenContainer);
    }

    menus[treatName].forEach(item => {
      const [size, price] = item.split(":");

      const itemCard = document.createElement("div");
      itemCard.classList.add("menu-item-card");
      itemCard.style.display = "flex";
      itemCard.style.justifyContent = "space-between";
      itemCard.style.alignItems = "center";
      itemCard.style.padding = "8px";
      itemCard.style.marginBottom = "5px";
      itemCard.style.backgroundColor = "#fff";
      itemCard.style.borderRadius = "5px";
      itemCard.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";

      const itemText = document.createElement("p");
      itemText.innerText = `${size.trim()} - ${price.trim()}`;
      itemText.style.margin = "0";

      const addBtn = document.createElement("button");
      addBtn.classList.add("btn");
      addBtn.innerText = "Add to Oven";
      addBtn.style.padding = "4px 8px";

      addBtn.addEventListener("click", () => {

        const orderText = `${treatName} - ${size.trim()} - ${price.trim()}`;
        cart.push(orderText);
        cartTotal += parsePrice(price.trim());

        updateOrderTextarea();
        updatePopupTotal();

        alertText.innerText = `${orderText} added to your oven!`;
        customAlert.style.display = "flex";

        renderOven(true); // pass true to animate
      });

      itemCard.appendChild(itemText);
      itemCard.appendChild(addBtn);
      menuItems.appendChild(itemCard);
    });

    // ===============================
    // RENDER OVEN FUNCTION WITH ANIMATION
    // ===============================
    function renderOven(animate = false) {
      ovenContainer.innerHTML = "<h4 style='margin:0 0 10px 0;'>🍪 Your Oven:</h4>";
      if (cart.length === 0) {
        ovenContainer.innerHTML += "<p style='margin:0;'>Your oven is empty.</p>";
        return;
      }

      cart.forEach((itemText, index) => {
        const ovenCard = document.createElement("div");
        ovenCard.classList.add("menu-item-card");
        ovenCard.style.display = "flex";
        ovenCard.style.justifyContent = "space-between";
        ovenCard.style.alignItems = "center";
        ovenCard.style.padding = "6px 8px";
        ovenCard.style.marginBottom = "5px";
        ovenCard.style.backgroundColor = "#fff8f0";
        ovenCard.style.borderRadius = "5px";
        ovenCard.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
        ovenCard.style.transition = "all 0.4s ease";

        if (animate && index === cart.length - 1) {
          ovenCard.style.opacity = "0";
          ovenCard.style.transform = "translateY(-20px)";
          setTimeout(() => {
            ovenCard.style.opacity = "1";
            ovenCard.style.transform = "translateY(0)";
          }, 50);
        }

        const textP = document.createElement("p");
        textP.innerText = itemText;
        textP.style.margin = "0";
        textP.style.fontSize = "0.95rem";

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("btn");
        removeBtn.innerText = "❌";
        removeBtn.style.padding = "2px 6px";
        removeBtn.style.fontSize = "0.85rem";

        removeBtn.addEventListener("click", () => {
          cartTotal -= parsePrice(itemText.split(" - ").pop());
          cart.splice(index, 1);
          updateOrderTextarea();
          updatePopupTotal();
          renderOven();
        });

        ovenCard.appendChild(textP);
        ovenCard.appendChild(removeBtn);
        ovenContainer.appendChild(ovenCard);
      });

      updatePopupTotal();
    }

    renderOven();
    updatePopupTotal();
    menuPopup.style.display = "flex";
  }

  // ===============================
  // CLOSE MENU
  // ===============================
  if (closePopup) closePopup.addEventListener("click", () => menuPopup.style.display = "none");
  if (menuPopup) menuPopup.addEventListener("click", e => { if (e.target === menuPopup) menuPopup.style.display = "none"; });

  // ===============================
  // FINISH ORDER
  // ===============================
  finishOrderBtn.addEventListener("click", () => {
    menuPopup.style.display = "none";
    revealContactSection();
  });

  continueBtn.addEventListener("click", () => {
    customAlert.style.display = "none";
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
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

  form.addEventListener("submit", e => {
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

    emailjs.send("service_5x43lc8", "template_gk7slp7", {
      name, email, order_details: orderDetails, title: "New Order from Website"
    }).then(() => {
      successMessage.innerText = "Order sent successfully! Invoice downloaded.";
      form.reset();
      cart = []; cartTotal = 0; orderTextarea.value = "";
      const popupTotal = document.getElementById("popupTotal"); if (popupTotal) popupTotal.innerText = "";
      const ovenContainer = document.getElementById("ovenContainer"); if (ovenContainer) ovenContainer.innerHTML = "";
      submitBtn.disabled = false; submitBtn.innerHTML = "Send Order";
    }).catch(err => {
      console.error(err);
      successMessage.innerText = "Oops! Something went wrong.";
      submitBtn.disabled = false; submitBtn.innerHTML = "Send Order";
    });
  });

  // ===============================
  // GALLERY AUTO IMAGE SWITCHING
  // ===============================
  const galleryImages = {
    galleryScones: ["imgs/gallery/nu3.png","imgs/gallery/nu2.png","imgs/gallery/co1.png"],
    galleryCookies: ["imgs/gallery/co3.png","imgs/gallery/co2.png","imgs/gallery/mf2.jpg"],
    galleryMuffins: ["imgs/gallery/nu1.png","imgs/gallery/c2.png","imgs/gallery/mf3.jpg"]
  };
  Object.keys(galleryImages).forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;
    let index = 0;
    element.style.backgroundImage = `url(${galleryImages[id][index]})`;
    setInterval(() => {
      index = (index + 1) % galleryImages[id].length;
      element.style.backgroundImage = `url(${galleryImages[id][index]})`;
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
    Scones: { desc: "Our homemade scones are baked fresh daily using traditional recipes." },
    "Classic Cookies": { desc: "Our classic cookies are rich, chewy, and full of flavor." },
    "Fluffy Muffins": { desc: "Our muffins are light, moist, and bursting with sweetness." }
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

  popupClose.addEventListener("click", () => popup.style.display = "none");
  popup.addEventListener("click", e => { if (e.target === popup) popup.style.display = "none"; });

});