let header = document.querySelector("header");
let burger_menu = document.querySelector(".burger-menu");

burger_menu.addEventListener("click", (e) => {
  if (header.classList.contains("active")) {
    header.classList.remove("active");
    burger_menu.innerHTML = `<i class="bx bx-menu"></i>`;
  } else {
    burger_menu.innerHTML = `<i class="bx bx-x"></i>`;
    header.classList.add("active");
  }
});
