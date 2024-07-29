import { products } from "./data/product.js";
 


function pay() {
  const form = document.getElementById("checkoutForm");
  if (form.checkValidity()) {
    alert(
      "Thank you for your purchase! Your delivery date is " +
        new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()
    );
  } else {
    alert("Please fill out all fields correctly.");
  }
}
function Buy() {
  
  

  // Set the current order in local storage
  localStorage.setItem("currentOrder", JSON.stringify(cart));

  // Get the current order from local storage and parse it as JSON
  const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));

  // Initialize the total to 0
  let total = 0;

  // Loop through each item in the current order
  currentOrder.forEach((item) => {
    // Calculate the total by multiplying the price (converted to decimal) by the quantity
    total += (item.price / 100) * item.quantity;
  });

  // Log the total to the console
  console.log(total.toFixed(2)); // Use toFixed(2) to display the total with 2 decimal places

  window.location.href ="checkout.html"
  

  
}

function restFavourites(){
  
  localStorage.removeItem("favourites");
  
  window.alert("favourite is reseted");
  resetCart();
}
function resetCart(){
  localStorage.removeItem("cart");
  window.alert("cart is reseted");
}

// Function to save the current cart to the "favourites" in local storage
function saveToFavourites() {
  localStorage.setItem("favourites", JSON.stringify(cart)); // Convert the cart array to a JSON string and store it in local storage under the key "favourites"
  window.alert("Saved to the favourites"); // Display an alert to notify the user that the cart has been saved to favourites
}

// Function to retrieve the saved favourites from local storage and update the cart
function getFromFavourites() {
  cart = JSON.parse(localStorage.getItem("favourites"));
  updateThetable(cart); // Update the table to reflect the current contents of the cart
}

// Function to update the order table with the current cart contents and display the total price
function updateThetable() {
  let Total = 0; // Initialize Total to 0, to accumulate the total cost of items
  const tbody = document.querySelector("#orderTable tbody"); // Select the tbody element within the orderTable
  tbody.innerHTML = ""; // Clear any existing content in the tbody

  // Iterate through each item in the cart
  cart.forEach((item) => {
    Total += item.price * item.quantity; // Calculate the total price by adding the price of the item multiplied by its quantity
    // Create a row for each item in the cart with its image, name, quantity, and price
    const row = `<tr>
                  <td><img src="${item.image}" alt="${
      item.productName
    }" class="ProductImage"></td>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>Rs.${((item.price * item.quantity) / 100).toFixed(2)}</td>
                </tr>`;

    tbody.innerHTML += row; // Append the row to the tbody
    console.log(item.price); // Log item price for debugging purposes
  });

  // Update the total price display with the formatted total cost
  document.getElementById("totalPrice").innerHTML = ` Rs.${(Total / 100).toFixed(2)}`;
  console.log("updated");

}


// Function to save the current cart contents to local storage
function saveStorage() {
  localStorage.setItem("cart", JSON.stringify(cart)); // Convert the cart array to a JSON string and store it in local storage under the key "cart"
}


// Function to set up price calculations and order handling based on user selections and inputs
function getThePrice(optionMenu, priceContainer, Input, setButton, orderButton, price, quantity) {
  let InputValue;

  // Add an event listener to the options menu to detect changes
  optionMenu.addEventListener("change", () => {
    // Get the value of the selected option
    let selectedOption = optionMenu.value;
    // Initialize a variable to hold the HTML for the price
    let priceHTML = "";

    // Iterate through each category in the products array
    products.forEach((category) => {
      // Iterate through each product in the category
      category.forEach((product) => {
        // If the selected option matches the product name
        if (selectedOption === product.name) {
          // Set the priceHTML to display the product's price and quantity
          priceHTML = ` ${product.quantity} :  Rs. ${(product.price / 100).toFixed(2)}`;
          // Update the innerHTML of the price container with the priceHTML
          priceContainer.innerHTML = priceHTML;
        }
      });
    });

    // Add an event listener to the set button to handle quantity input and price calculation
    setButton.addEventListener("click", () => {
      // Get the value from the input field
      InputValue = Input.value;
      console.log(InputValue);
      // Initialize a variable to hold the HTML for the cost
      let priceHTML = "";
      
      // Iterate through each category in the products array
      products.forEach((category) => {
        // Iterate through each product in the category
        category.forEach((product) => {
          // If the selected option matches the product name
          if (selectedOption === product.name) {
            // Update the quantity and calculate the price
            quantity = Number(InputValue);
            price = product.price * quantity;

            // Set the priceHTML to display the total cost
            priceHTML = ` Cost :  Rs. ${(price / 100).toFixed(2)}`;
            // Update the innerHTML of the price container with the priceHTML
            priceContainer.innerHTML = priceHTML;
          }
        });
      });
    });

    // Add an event listener to the order button to handle adding the product to the cart
    orderButton.addEventListener("click", () => {
      // Flag to check if the product already exists in the cart
      let productExists = false;

      // Iterate through the cart to check if the product already exists
      cart.forEach((item) => {
        if (item.productName === selectedOption) {
          // Update the quantity of the existing product in the cart
          item.quantity += Number(Input.value);
          productExists = true;
        }
      });

      // If the product does not exist in the cart, add it to the cart
      if (!productExists) {
        products.forEach((category) => {
          category.forEach((product) => {
            if (selectedOption === product.name) {
              cart.push({
                productName: product.name,
                quantity: Number(Input.value),
                price: product.price,
                image: product.image,
              });
            }
          });
        });
      }

      // Update the table to reflect the current cart contents
      updateThetable(cart);
      // Save the cart to storage (e.g., localStorage or server)
      saveStorage();
      console.log(cart);
    });
  });
}

// Function to set the product image based on the selected option in the options menu
function getTheimage(optionMenue, imageContainer) {
  // Add an event listener to the options menu to detect changes
  optionMenue.addEventListener("change", () => {
    // Get the value of the selected option
    const selectedOption = optionMenue.value;
    // Initialize a variable to hold the HTML for the image
    let ImageHTML = "";
    
    // Iterate through each category in the products array
    products.forEach((category) => {
      // Iterate through each product in the category
      category.forEach((product) => {
        // If the selected option matches the product name
        if (selectedOption === product.name) {
          // Set the ImageHTML to the corresponding product image
          ImageHTML += `<img src="${product.image}" alt="${product.name}" class="ProductImage">`;
        }
      });
    });

    // Update the innerHTML of the image container with the ImageHTML
    imageContainer.innerHTML = ImageHTML;
  });
}

// main function


// Main function to set up event listeners and handlers for each order container
function MainFunction() {
  // Iterate through each container in the order container list
  orderContainer.forEach((container) => {
    // Get the elements for options menu, image container, price container, input, set button, and order button
    const optionMenue = container.querySelector("#Options");
    const imageContainer = container.querySelector("#ImageContainer");
    const priceContainer = container.querySelector("#priceContainer");
    const Input = container.querySelector("#Input");
    const setButton = container.querySelector("#setButton");
    const orderButton = container.querySelector("#orderButton");

    // Initialize variables for price and quantity
    let price;
    let quantity;

    // Set up the image based on the selected option in the options menu
    getTheimage(optionMenue, imageContainer);

    // Set up price and quantity handling, as well as adding to cart
    getThePrice(optionMenue, priceContainer, Input, setButton, orderButton, price, quantity);
  });
}

// end of functions




const orderContainer = document.querySelectorAll(".orderContainer");
const addFavouriteBtn = document.getElementById("addFavouriteBtn");
const favouriteList = document.getElementById("favouriteList");
const favouriteResetBtn = document.getElementById("favouriteReset");
const Buybtn = document.getElementById("Buybtn");
const checkoutbtn = document.getElementById("checkoutbtn");


let cart = JSON.parse(localStorage.getItem("cart"));
if (cart === null) {
  cart = [];
}
MainFunction()
addFavouriteBtn.onclick = saveToFavourites;
favouriteList.addEventListener("click", getFromFavourites);
favouriteResetBtn.addEventListener("click",restFavourites);
Buybtn.addEventListener("click",Buy)
checkoutbtn.addEventListener("click",pay)

console.log(addFavouriteBtn);
