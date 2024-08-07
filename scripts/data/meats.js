import { products } from "./product.js";

console.log(products);

console.log("hello");

const meats = products[1];


console.log(fruits);

let meatHtml = "";

meats.forEach((food) => {
  meatHtml += `
  <div class="product-container" >
    <div class="product-image">
      <div class="p-image">
        <img class="p-images" src="${food.image}" alt="${food.name}">
      </div>
      <div class="product-text">
        <p  class="p-text">${food.name}</p>
        <p class="light-text">${food.quantity}</p>
        <p class="price">Rs.${(food.price / 100).toFixed(2)}</p>  
      </div>
                            
                            
      <a href="order page.html">
          <div class="add-to-cart-button">
            <button class="cart-button">Add To Cart</button>
          </div>
      </a>

                            
            
    </div>
                        
                            
  </div>

  `;
});
document.getElementById("productContainer").innerHTML = meatHtml;
