// cart.js

// Function to add a product to the cart
function addToCart(productName, productPrice, imgSrc) {
  // Retrieve the cart from localStorage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Create a product object
  let product = { name: productName, price: productPrice, img: imgSrc };

  // Add the product to the cart
  cart.push(product);

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart count displayed on the page
  updateCartCount();

  // Notify the user
  alert(`${productName} has been added to your cart.`);
}

// Function to view the cart
function viewCart() {
  // Retrieve the cart from localStorage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
  } else {
    // Redirecting to cart.html
    window.location.href = "cart.html";
  }
}

// Function to update the cart count displayed on the page
function updateCartCount() {
  // Retrieve the cart from localStorage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update the cart count element
  document.getElementById("cart-count").innerText = cart.length;
}

// Function to remove all items from the cart
function removeFromCart() {
  // Clear the cart
  let cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart count displayed on the page
  updateCartCount();

  // Notify the user
  alert("Your cart has been cleared.");
}

// Initialize the cart count when the page loads
window.onload = updateCartCount;
