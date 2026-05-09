import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems.push(product);

  setLocalStorage("so-cart", cartItems);
}
