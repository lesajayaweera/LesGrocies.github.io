import { products } from "./product.js";

const bakingEssentials = products[4];
let bakingEsentials = "";

bakingEssentials.forEach((product) => {
    bakingEsentials += `
    <div class="product-container">
      <div class="product-image">
        <div class="p-image">
          <img class="p-images" src="${product.image}"alt="${product.name}">
        </div>
        <div class="product-text">
          <p class="p-text">${product.name}</p>
          <p class="light-text">${product.quantity}</p>
          <p class="price">Rs.${(product.price / 100).toFixed(2)}</p>  
        </div>
      </div>                      
      <a href="order page.html">
        <div class="add-to-cart-button">
          <button class="cart-button">Add To Cart</button>
        </div>
      </a>
  </div>
  `

})
document.getElementById("bakingContainer").innerHTML = bakingEsentials;
console.log(bakingEsentials);
