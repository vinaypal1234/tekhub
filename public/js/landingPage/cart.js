// REMOVE T0 CART
const removeItem = (courseId) => {
  fetch(`http://localhost:4000/removeToCart/${courseId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message == "Failed To Remove Item ") {
        alert(data.message);
      } else {
        alert(data.message);
        location.reload();
      }
    });
  // alert(cName)
};

// CART TOTAL
function userCartTotal() {
  let coursePrice = document.querySelectorAll(".course-price");
  let cartTotal = 0;
  coursePrice.forEach((elem) => {
    let amount = Number(elem.textContent);
    cartTotal = cartTotal + amount;
  });
  document.getElementById(
    "cart-total"
  ).innerHTML = `<span style=" font-weight:bold; margin-right:5px;">&#8377;</span><span style="font-weight:bold;">${cartTotal}</span>`;
}

userCartTotal();
