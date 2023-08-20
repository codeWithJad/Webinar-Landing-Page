document.addEventListener("DOMContentLoaded", (event) => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  hamburger.addEventListener("click", () => {
    console.log(navbar.classList);
    navbar.classList.toggle("responsive");
  });

  const navbarItems = document.querySelectorAll(".navbar li");

  navbarItems.forEach((item) => {
    item.addEventListener("click", () => {
      navbar.classList.remove("responsive");
    });
  });
});
