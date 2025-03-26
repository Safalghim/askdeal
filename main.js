// Dom Elements
const home_prod = document.querySelector(".prod-container");
let data;

// Sample fallback products array (You can customize this as needed)
const products = [
  { id: 1, title: 'Product 1', image: 'path/to/image1.jpg', price: 100, category: 'Category 1' },
  { id: 2, title: 'Product 2', image: 'path/to/image2.jpg', price: 150, category: 'Category 2' },
  // Add more fallback products if necessary
];

// Function to generate product HTML based on your template
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
      <a href="#" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i></a>
    </div>
  `;
}

// Function to display products
function displayProducts(productsArray) {
  home_prod.innerHTML = "";
  productsArray.slice(0, 6).forEach((product) => {
    home_prod.innerHTML += generateProductHTML(product);
  });
  addEventListeners(); // Add event listeners after products are loaded
}

// Function to fetch data from API
async function api_data() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    data = await response.json();

    // Map API data to match our product structure
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
    // Fallback to local products if API fails
    displayProducts(products);
  }
}

// Function to add event listeners
function addEventListeners() {
  const cartButtons = document.querySelectorAll(".prod a");
  cartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productCard = e.target.closest(".prod");
      const productId = productCard.dataset.id;
      addToCart(productId);
    });
  });
}

// Function to add products to cart
function addToCart(productId) {
  const productToAdd =
    data.find((product) => product.id == productId) ||
    products.find((product) => product.id == productId);

  if (productToAdd) {
    console.log(`Added to cart: ${productToAdd.title || productToAdd.name}`);
    
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (product) => product.id === productToAdd.id
    );

    if (existingProductIndex > -1) {
      // Update the product quantity if it already exists in the cart
      cart[existingProductIndex].quantity += 1;
    } else {
      // Add the product to the cart with quantity 1
      productToAdd.quantity = 1;
      cart.push(productToAdd);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Optionally, update the UI or alert the user
    alert(`${productToAdd.title || productToAdd.name} has been added to your cart.`);
    displayCart(); // Update cart display immediately after adding the item
  }
}

// Function to display the cart items
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    totalPriceElement.textContent = "0.00";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    const itemHTML = `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image || item.src}" alt="${item.title || item.name}">
        <div class="cart-item-details">
          <h4>${item.title || item.name}</h4>
          <p>£${item.price}</p>
          <div class="cart-item-quantity">
            <span>Quantity: ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
    cartItemsContainer.innerHTML += itemHTML;
    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Filter out the product with the matching id
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  displayCart(); // Re-render the cart
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  api_data();
  displayCart(); // Ensure cart is displayed when the page loads
});
