// Function to add a product to the wishlist
function addToWishlist(productName, productPrice, imgSrc) {
    // Retrieve the wishlist from localStorage or initialize an empty array
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Create a product object
    let product = { name: productName, price: productPrice, img: imgSrc };

    // Check if the product is already in the wishlist
    const existingProductIndex = wishlist.findIndex(item => item.name === productName);
    
    if (existingProductIndex === -1) {
        // Add the product to the wishlist if it's not already there
        wishlist.push(product);
        // Save the updated wishlist back to localStorage
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${productName} has been added to your wishlist.`);
    } else {
        // If the product already exists, notify the user
        alert(`${productName} is already in your wishlist.`);
    }

    // Update the wishlist count displayed on the page
    updateWishlistCount();
}

// Function to view the wishlist
function viewWishlist() {
    // Retrieve the wishlist from localStorage or initialize an empty array
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {
        alert("Your wishlist is empty.");
    } else {
        // Redirect to wishlist.html if the wishlist is not empty
        window.location.href = "wishlist.html";
    }
}

// Function to update the wishlist count displayed on the page
function updateWishlistCount() {
    // Retrieve the wishlist from localStorage or initialize an empty array
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Update the wishlist count element
    document.getElementById("wishlist-count").innerText = wishlist.length;
}

// Function to remove all items from the wishlist
function removeFromWishlist() {
    // Clear the wishlist
    let wishlist = [];
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Update the wishlist count displayed on the page
    updateWishlistCount();

    // Notify the user
    alert("Your wishlist has been cleared.");
}

// Function to remove a specific product from the wishlist
function removeProductFromWishlist(productName) {
    // Retrieve the wishlist from localStorage or initialize an empty array
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Filter out the product to be removed
    wishlist = wishlist.filter(item => item.name !== productName);

    // Save the updated wishlist back to localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Update the wishlist count displayed on the page
    updateWishlistCount();

    // Notify the user
    alert(`${productName} has been removed from your wishlist.`);
}

// Function to display the wishlist items on the wishlist page (wishlist.html)
function displayWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlistContainer = document.getElementById("wishlist-container");

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    // Generate HTML for each product in the wishlist
    wishlistContainer.innerHTML = wishlist.map(item => {
        return `
            <div class="wishlist-item">
                <img src="${item.img}" alt="${item.name}" class="wishlist-item-image" />
                <div class="wishlist-item-details">
                    <p>${item.name}</p>
                    <p>£${item.price}</p>
                </div>
                <button class="remove-btn" onclick="removeProductFromWishlist('${item.name}')">Remove</button>
            </div>
        `;
    }).join('');

    // Add a "Clear Wishlist" button
    wishlistContainer.innerHTML += `
        <button class="clear-wishlist-btn" onclick="removeFromWishlist()">Clear Wishlist</button>
    `;
}

// Initialize the wishlist count when the page loads
window.onload = updateWishlistCount;

// If you are on the wishlist.html page, display the wishlist
if (window.location.pathname.includes("wishlist.html")) {
    window.onload = displayWishlist;
}
