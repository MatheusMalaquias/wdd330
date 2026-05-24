import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // Empty cart message
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <p class="empty-cart">Your cart is empty.</p>
    `;

    document.querySelector("#cart-total").innerHTML = "";

    return;
  }

  // Render items
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index)
  );

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calculate total
  const total = calculateTotal(cartItems);

  document.querySelector("#cart-total").innerHTML = `
    <h3>Total: $${total}</h3>
  `;

  // Remove item event
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;

      removeItem(index);
    });
  });
}

function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">

      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">
        ${item.Colors[0].ColorName}
      </p>

      <p class="cart-card__quantity">
        qty: 1
      </p>

      <p class="cart-card__price">
        $${item.FinalPrice}
      </p>

      <button class="remove-btn" data-index="${index}">
        Remove
      </button>

    </li>
  `;
}

function calculateTotal(cartItems) {
  let total = 0;

  cartItems.forEach((item) => {
    total += item.FinalPrice;
  });

  return total.toFixed(2);
}

function removeItem(index) {
  const cartItems = getLocalStorage("so-cart") || [];

  cartItems.splice(index, 1);

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  renderCartContents();
}

renderCartContents();