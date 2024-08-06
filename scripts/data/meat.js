const meat=[
    {
      image: "../images/product images/meat/beef cubes.webp",
      name: "Beef Cubes",
      quantity: "Per 1kg",
      price: 400000,
    },
    {
      image: "../images/product images/meat/chicken drumstick.webp",
      name: "Chicken Drumstick",
      quantity: "Per 1kg",
      price: 300000,
    },
    {
      image: "../images/product images/meat/chicken gizzards.webp",
      name: "Chicken Gizzards",
      quantity: "Per 1kg",
      price: 450000,
    },
    {
      image: "../images/product images/meat/chicken liver.webp",
      name: "Chicken Liver",
      quantity: "Per 1kg",
      price: 350000,
    },
    {
      image: "../images/product images/meat/chicken neck.webp",
      name: "Chicken Neck",
      quantity: "Per 1kg",
      price: 250000,
    },
    {
      image: "../images/product images/meat/chicken thigh 2.webp",
      name: "Chicken Thigh (2 pieces)",
      quantity: "Per 1kg",
      price: 350000,
    },
    {
      image: "../images/product images/meat/chicken thigh.webp",
      name: "Chicken Thigh (1 piece)",
      quantity: "Per 1kg",
      price: 250000,
    },
    {
      image: "../images/product images/meat/chicken whole leg.webp",
      name: "Chicken Whole Leg",
      quantity: "Per 1kg",
      price: 200000,
    },
    {
      image: "../images/product images/meat/chicken whole leg2.webp",
      name: "Chicken Whole Leg (2 pieces)",
      quantity: "Per 1kg",
      price: 300000,
    },
    {
      image: "../images/product images/meat/chicken winglets.webp",
      name: "Chicken Winglets",
      quantity: "Per 1kg",
      price: 200000,
    },
    {
      image: "../images/product images/meat/cic skinless whole chicken.webp",
      name: "Cic Skinless Whole Chicken",
      quantity: "Per 1kg",
      price: 250000,
    },
    {
      image: "../images/product images/meat/new anthoies skinless chicken.webp",
      name: "New Anthoies Skinless Chicken",
      quantity: "Per 1kg",
      price: 250000,
    },
    {
      image: "../images/product images/meat/pork cubes.webp",
      name: "Pork Cubes",
      quantity: "Per 1kg",
      price: 400000,
    },
]


let html = "";
meat.forEach((food)=>{
  
  html += `
  <div class="product-container" >
    <div class="product-image">
      <div class="p-image">
        <img class="p-images" src="${food.image}">
      </div>
      <div class="product-text">
        <p  class="p-text">${food.name}</p>
        <p class="light-text">${food.quantity}</p>
        <p class="price">Rs.${(food.price/100).toFixed(2)}</p>  
      </div>
                            
                            
      <a href="order page.html">
          <div class="add-to-cart-button">
            <button class="cart-button">Add To Cart</button>
          </div>
      </a>

                            
            
    </div>
                        
                            
  </div>

  `;
  

})
document.getElementById("productContainer").innerHTML = html;
console.log()