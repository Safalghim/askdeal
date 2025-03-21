// Dom Elements
const home_prod = document.querySelector(".prod-container");
let data;

// Function to generate product HTML based on your template
function generateProductHTML(product) {
  return `
    <div class="prod fadeIn" data-id="${product.id}">
      <img src="${product.image || product.src}" alt="${
    product.title || product.name
  }">
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

// Function to display products
function displayProducts(productsArray) {
  home_prod.innerHTML = "";
  productsArray.slice(0, 6).forEach((product) => {
    home_prod.innerHTML += generateProductHTML(product);
  });
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

    // Add event listeners to all product cards
    addEventListeners();
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
    // Here you would typically update a cart object and UI
  }
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  api_data();
});
