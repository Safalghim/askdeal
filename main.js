const api_url = new URL("https://fakestoreapi.com/products");

// Dom Elememts9
const home_prod = document.querySelector(".prod-container");
let data;

// let card = `    <div class="prod fadeIn">
//                 <img src="products/n2.jpg" alt="Smart Casual Shirt">
//                 <div class="des">
//                     <span>calvin klein</span>
//                     <h5>Smart Casual Button-Down</h5>
//                     <div class="star">
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star-half-alt"></i>
//                     </div>
//                     <h4>£79</h4>
//                 </div>
//                 <a href="#"><i class="fas fa-shopping-cart"></i></a>
//             </div>`;

async function api_data() {
  try {
    await fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {}
}

window.addEventListener("DOMContentLoaded", api_data());
