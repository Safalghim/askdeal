// Function to add a product to the cart
function addToCart(productName, productPrice, imgSrc) {
    // Retrieve the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Create a product object
    let product = { name: productName, price: productPrice, img: imgSrc };

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex === -1) {
        // Add the product to the cart if it's not already there
        cart.push(product);
        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${productName} has been added to your cart.`);
    } else {
        // If the product already exists, notify the user
        alert(`${productName} is already in your cart.`);
    }

    // Update the cart count displayed on the page
    updateCartCount();
}

// Function to view the cart
function viewCart() {
    // Retrieve the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        // Redirect to cart.html if the cart is not empty
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

// Function to remove a specific product from the cart
function removeProductFromCart(productName) {
    // Retrieve the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter out the product to be removed
    cart = cart.filter(item => item.name !== productName);

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart count displayed on the page
    updateCartCount();

    // Notify the user
    alert(`${productName} has been removed from your cart.`);
}

// Function to display the cart items on the cart page (cart.html)
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-container");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // Generate HTML for each product in the cart
    cartContainer.innerHTML = cart.map(item => {
        return `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-image" />
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>£${item.price}</p>
                </div>
                <button class="remove-btn" onclick="removeProductFromCart('${item.name}')">Remove</button>
            </div>
        `;
    }).join('');

    // Add a "Clear Cart" button
    cartContainer.innerHTML += `
        <button class="clear-cart-btn" onclick="removeFromCart()">Clear Cart</button>
    `;
}

// Initialize the cart count when the page loads
window.onload = updateCartCount;

// If you are on the cart.html page, display the cart
if (window.location.pathname.includes("cart.html")) {
    window.onload = displayCart;
}
