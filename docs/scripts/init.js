let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartBadge() {
  const badge = document.querySelector(".icon-cart .badge");
  if (badge) badge.textContent = cart.length;
}
function handleAddToCart(button, name, price, image) {
  addToCart(name, price, image);
  button.textContent = "Added";
  button.disabled = true;
  button.style.background = "gray";
}

function addToCart(name, price, image) {
  cart.push({ name, price, image, quantity: 1, size: "M" });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}
document.addEventListener("DOMContentLoaded", updateCartBadge);
