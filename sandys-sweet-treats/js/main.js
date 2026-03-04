// Floating product cards slider (auto-cycle)
const cards = document.querySelectorAll('.card');
let index = 0;

function highlightCard() {
  cards.forEach((c,i) => {
    c.style.transform = i === index ? 'translateY(-10px)' : 'translateY(0)';
  });
  index++;
  if(index >= cards.length) index = 0;
}

setInterval(highlightCard, 2500);

// Hero text animation handled via CSS keyframes