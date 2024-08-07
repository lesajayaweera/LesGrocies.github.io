import { products } from "./product.js";

const fruits = products[5];
let fruitsHtml = "";

fruits.forEach((foods) => {
  fruitsHtml += `
  <div class="product-container">
    <div class="product-image">
      <div class="p-image">
        <img class="p-images" src="${foods.image}">
      </div>
      <div class="product-text">
        <p class="p-text">${foods.name}</p>
        <p class="light-text">${foods.quantity}</p>
        <p class="price">Rs.${(foods.price / 100).toFixed(2)}</p>  
      </div>
    </div>                      
    <a href="order page.html">
      <div class="add-to-cart-button">
        <button class="cart-button">Add To Cart</button>
      </div>
    </a>
  </div>`;
});

console.log(fruitsHtml);
console.log(document.getElementById("FruitsContainer"));

// Use innerHTML instead of innerHtml
document.getElementById("FruitsContainer").innerHTML = fruitsHtml;
