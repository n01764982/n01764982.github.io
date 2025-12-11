import { products } from "./productData.js";

// Sidebar toggle for tablets/mobile
const toggleBtn = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// DOM elements
const container = document.getElementById("products-container");

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  });
});

// render products
function renderProducts(list) {
  container.innerHTML = "";

  list.forEach((p) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.images[0]}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Price: $${p.price}</p>
        <p class="rating">Reviews: ${"⭐".repeat(Math.round(p.rating))}</p>
    <div class="overlay">
          <button onclick="handleAddToCart(this, '${p.name}', '${p.price}', '${
      p.images[0]
    }')">Add to Cart</button>
          <a href="./product.html?product_id=${
            p.id
          }" class="show-link">Show product</a>
        </div>
      </div>
    `;
  });
}
function handleAddToCart(button, name, price, image) {
  addToCart(name, price, image);
  button.textContent = "Added";
  button.disabled = true;
  button.style.background = "gray";
}

// expose globally
window.handleAddToCart = handleAddToCart;
// apply all filters
function applyFilters() {
  let filtered = [...products];

  // GENDER
  const genderValues = [
    ...document.querySelectorAll(".filter-gender:checked"),
  ].map((c) => c.value);
  if (genderValues.length) {
    filtered = filtered.filter((p) => genderValues.includes(p.gender));
  }

  // MATERIAL
  const materialValues = [
    ...document.querySelectorAll(".filter-material:checked"),
  ].map((c) => c.value);
  if (materialValues.length) {
    filtered = filtered.filter((p) => materialValues.includes(p.material));
  }

  // TYPE
  const typeValues = [...document.querySelectorAll(".filter-type:checked")].map(
    (c) => c.value
  );
  if (typeValues.length) {
    filtered = filtered.filter((p) => typeValues.includes(p.type));
  }

  // PRICE
  const minPrice =
    parseFloat(document.getElementById("filter-price-min").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("filter-price-max").value) || Infinity;
  filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  renderProducts(filtered);
}

function initFilters() {
  const allInputs = document.querySelectorAll(".sidebar input");

  allInputs.forEach((input) => {
    input.addEventListener("change", applyFilters);
  });

  // Price filter button
  const priceBtn = document.getElementById("apply-price-filter");
  if (priceBtn) {
    priceBtn.addEventListener("click", applyFilters);
  }

  renderProducts(products);
}

document.addEventListener("DOMContentLoaded", initFilters);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  cart.push({ name, price, image, quantity: 1, size: "M" });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.querySelector(".icon-cart .badge");
  if (badge) badge.textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
