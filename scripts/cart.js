let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image, quantity = 1, size = "M") {
  cart.push({ name, price, image, quantity, size });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const badge = document.querySelector(".icon-cart .badge");
  if (badge) badge.textContent = cart.length;
}

function renderCart() {
  const itemsContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<h2 id='empty'>Your cart is empty.</h2>";
    totalContainer.textContent = "Total: $0.00";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    itemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h3><a style="color: black" href="./product.html?product_id=${item.id}">${item.name}</a></h3>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Size: ${item.size}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
    total += item.price * item.quantity;
  });

  totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

//checkout button
document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    return;
  }
  alert("Thank you for your purchase!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  renderCart();
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartBadge();
});
