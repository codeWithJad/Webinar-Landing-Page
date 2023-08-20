const container = document.querySelector("#testimonial-cards-container");
const cards = Array.from(container.querySelectorAll(".testimonial-card"));
const btnLeft = document.querySelector("#arrow-left");
const btnRight = document.querySelector("#arrow-right");

let currentIndex = 0; //keep track of the first visibile Card

function checkButtons() {
  // enable or disable buttoms
  btnLeft.disabled = currentIndex === 0;
  btnRight.disabled = currentIndex === cards.length - 3;
}

function moveCards() {
  const cardWidth = cards[0].clientWidth;
  const gap = parseInt(getComputedStyle(container).getPropertyValue("gap"));
  container.style.transform = `translateX(${
    -currentIndex * (cardWidth + gap)
  }px)`;

  //   show or hide cards based on their index
  cards.forEach((card, index) => {
    card.style.display =
      index >= currentIndex && index < currentIndex + 3 ? "block" : "none";
  });

  checkButtons();
}

btnLeft.addEventListener("click", () => {
  currentIndex--;
  moveCards();
});

btnRight.addEventListener("click", () => {
  currentIndex++;
  moveCards();
});

// intial Setup:
checkButtons();
moveCards();
