import { products } from "./productData.js";
// ------------------------------
// 1. Load product by ID from URL
// ------------------------------
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product_id");

let currentProduct = null;

function loadProduct() {
  if (!productId) return;

  currentProduct = products.find((p) => p.id == productId);
  if (!currentProduct) return;

  // ---------------------- DISPLAY MAIN PRODUCT DATA ----------------------

  // Title
  document.querySelector(".product-title").textContent = currentProduct.name;

  // Price
  document.querySelector(".price").textContent = `$${currentProduct.price}`;

  // Rating + Reviews
  document.querySelector(".rating").innerHTML =
    "★".repeat(Math.round(currentProduct.rating)) +
    "☆".repeat(5 - Math.round(currentProduct.rating)) +
    ` <span class="rating-info">${currentProduct.rating} | ${currentProduct.reviews} reviews</span>`;

  // Description
  document.querySelector(".description").textContent =
    currentProduct.description || "No description available.";

  // Gender
  document.querySelector(
    "#gender"
  ).innerHTML = `<strong class="label">Gender:</strong> ${currentProduct.gender}`;
  // Material
  document.querySelector(
    "#material"
  ).innerHTML = `<strong class="label">Material:</strong> ${currentProduct.material}`;
  // Brand
  document.querySelector(
    "#brand"
  ).innerHTML = `<strong class="label">Brand:</strong> ${currentProduct.brand}`;

  // Specifications list
  const specList = document.querySelector(".spec-list");
  specList.innerHTML = ""; // clear old
  currentProduct.specifications.forEach((spec) => {
    specList.innerHTML += `<li>${spec}</li>`;
  });

  // ---------------------- IMAGES + THUMBNAILS ----------------------

  // Main image = first image from "images" array
  const mainImg = document.querySelector(".main-image img");
  const thumbnailsContainer = document.querySelector(".thumbnails");

  if (currentProduct.images && currentProduct.images.length) {
    mainImg.src = currentProduct.images[0];

    // Fill thumbnail row
    thumbnailsContainer.innerHTML = "";
    currentProduct.images.forEach((img) => {
      thumbnailsContainer.innerHTML += `<img src="${img}" alt="Thumbnail">`;
    });
  }
}

// ------------------------------
// 2. MAIN IMAGE SWITCHER
// ------------------------------
document.addEventListener("click", (e) => {
  if (e.target.closest(".thumbnails img")) {
    const src = e.target.src;
    document.querySelector(".main-image img").src = src;
  }
});

// ------------------------------
// 4. SIZE SELECTOR
// ------------------------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("option-btn")) {
    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
  }
});

// ------------------------------
// 5. QUANTITY SYSTEM
// ------------------------------
let quantity = 1;
const qtyDisplay = document.querySelector(".quantity");

document.querySelector(".qty-btn.plus").addEventListener("click", () => {
  quantity++;
  qtyDisplay.textContent = quantity;
});

document.querySelector(".qty-btn.minus").addEventListener("click", () => {
  if (quantity > 1) quantity--;
  qtyDisplay.textContent = quantity;
});

// ------------------------------
// 6. ADD TO CART (same system as catalog)
// ------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartBadge() {
  const badge = document.querySelector(".icon-cart .badge");
  if (badge) badge.textContent = cart.length;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

document.querySelector(".action-btn.cart").addEventListener("click", () => {
  if (!currentProduct) return;

  const selectedSize =
    document.querySelector(".option-btn.active")?.textContent || "Default";

  cart.push({
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    quantity,
    size: selectedSize,
    image: currentProduct.images?.[0],
  });

  saveCart();

  const btn = document.querySelector(".action-btn.cart");
  btn.textContent = "Added!";
  btn.style.background = "gray";
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = "Add to Cart";
    btn.style.background = "";
    btn.disabled = false;
  }, 2000);
});

// ------------------------------
// 7. INITIALIZE PAGE
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadProduct();
  updateCartBadge();
});
