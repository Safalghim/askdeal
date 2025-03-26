// cart.js

// Function to add product to cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = { name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    alert(`${productName} has been added to your cart.`);
}

// Function to view cart
function viewCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        let cartContent = "Your Cart:\n";
        cart.forEach((item, index) => {
            cartContent += `${item.name} - £${item.price} (Remove) \n`;
        });
        cartContent += "\nClick 'OK' to remove items from the cart.";
        let confirmRemove = confirm(cartContent);
        
        if (confirmRemove) {
            removeFromCart();
        }
    }
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}

// Function to remove items from cart
function removeFromCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = []; // Empty the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert("Your cart has been cleared.");
}

// Initialize cart count on page load
window.onload = updateCartCount;
