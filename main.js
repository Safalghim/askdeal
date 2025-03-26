// DOM Elements
const cartContainer = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const totalBill = document.getElementById("total-bill");

// Function to display cart items
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartContainer.innerHTML = '';
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  cart.forEach(item => {
    cartContainer.innerHTML += `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
          <h5>${item.name}</h5>
          <p>Price: £${item.price}</p>
          <input type="number" value="${item.quantity}" min="1" class="quantity" onchange="updateQuantity(${item.id}, this.value)">
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  if (totalPrice) totalPrice.textContent = total.toFixed(2);
  if (totalBill) totalBill.textContent = total.toFixed(2);
}

// Function to update product quantity in cart
function updateQuantity(id, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
  }
}

// Function to remove product from cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Function to add products to cart
function addToCart(productId) {
  const productToAdd = data.find((product) => product.id == productId) || products.find((product) => product.id == productId);

  if (productToAdd) {
    console.log(`Added to cart: ${productToAdd.title || productToAdd.name}`);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex((product) => product.id === productToAdd.id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      productToAdd.quantity = 1;
      cart.push(productToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productToAdd.title || productToAdd.name} has been added to your cart.`);
  }
}

// Function to display products on home or product pages
function generateProductHTML(product) {
  return `
    <div class="prod fadeIn" data-id="${product.id}">
      <img src="${product.image || product.src}" alt="${product.title || product.name}">
      <div class="des">
        <span>${product.brand || product.category || "Brand"}</span>
        <h5>${product.title || product.name}</h5>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
        </div>
        <h4>£${Math.round(product.price)}</h4>
      </div>
      <a href="#"><i class="fas fa-shopping-cart"></i></a>
    </div>
  `;
}

// Function to display products on home page
function displayProducts(productsArray) {
  const home_prod = document.querySelector(".prod-container");
  home_prod.innerHTML = "";
  productsArray.slice(0, 6).forEach((product) => {
    home_prod.innerHTML += generateProductHTML(product);
  });
}

// Function to fetch data from API
async function api_data() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    const mappedData = data.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
    }));

    displayProducts(mappedData);
  } catch (error) {
    console.error("Error fetching products:", error);
    displayProducts(products);
  }
}

// Checkout form validation and submission
function checkout() {
  const paymentForm = document.getElementById("payment-form");
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Handle payment processing
    const cardholder = document.getElementById("cardholder").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;
    const billingAddress = document.getElementById("billing-address").value;

    if (!cardholder || !cardNumber || !expiryDate || !cvv || !billingAddress) {
      alert("Please fill out all payment details.");
      return;
    }

    alert("Payment Successful!");
    localStorage.removeItem('cart'); // Clear cart after payment
    window.location.href = '/askdeal/thank-you.html'; // Redirect to Thank You page
  });
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("cart.html")) {
    displayCart();
  } else if (window.location.pathname.includes("checkout.html")) {
    displayCart();
    checkout();
  } else {
    api_data();
  }
});
