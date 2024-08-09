import { products } from "./data/product.js";

//-----------------Functions--------------------------------------------------------------------------------------------------
function Buy() {
  // Set the current order in local storage
  localStorage.setItem("currentOrder", JSON.stringify(cart));
  let currentCart = JSON.parse(localStorage.getItem("currentOrder"));
  console.log(currentCart);

  if (currentCart.length === 0) {
    window.alert("Your cart is empty");
  } else {
    window.location.href = "checkout.html";
  }
}

function adjustColspan() {
  // adjust the table of the cart table based on the screen width
  const colspans = document.querySelectorAll(".colspan");
  colspans.forEach((element) => {
    if (window.innerWidth <= 818) {
      element.setAttribute("colspan", 2); // Small screens
    } else if (window.innerWidth <= 1200) {
      element.setAttribute("colspan", 3); // Medium screens
    } else {
      element.setAttribute("colspan", 4); // Large screens (default)
    }
  });
}

function restFavourites() {
  //  to reset the cart and favourite
  localStorage.removeItem("favourites");
  localStorage.removeItem("currentOrder");
  window.alert("favourite is reseted");

  resetCart();
}
function resetCart() {
  // to reset the cart
  localStorage.removeItem("cart");
  localStorage.removeItem("currentOrder");
  window.alert("cart is reseted");
}

function saveToFavourites() {
  // to save the cart  items to the favourite inthe local storage
  localStorage.setItem("favourites", JSON.stringify(cart));
  window.alert("Saved to the favourites");
}

function getFromFavourites() {
  const favourites = JSON.parse(localStorage.getItem("favourites"));

  if (favourites && favourites.length > 0) {
    cart = favourites;
    updateThetable(cart);
  } else {
    alert("No items in favourites.");
    cart = []; // Ensure cart is empty if no favourites are found
    updateThetable(cart); // Update the table to reflect the empty state
  }
}

function updateThetable(cart) {
  // function to  fill out the cart table
  let Total = 0;
  const tbody = document.querySelector("#orderTable tbody");
  if (!tbody) return;

  // Clear the table body
  tbody.innerHTML = "";

  // Initialize an empty string to store all rows
  let rows = "";

  // Iterate through the cart items and build the table rows
  cart.forEach((item) => {
    Total += item.price * item.quantity;
    rows += `<tr>
               <td class="col-1"><img src="${item.image}" alt="${
      item.productName
    }" class="ProductImage"></td>
               <td class="col-2">${item.productName} : ${item.type}</td>
               <td class="col-3">${item.quantity}</td>
               <td class="col-4">Rs.${(item.price / 100).toFixed(2)}</td>
               <td class="col-5">Rs.${(
                 (item.price * item.quantity) /
                 100
               ).toFixed(2)}</td>
             </tr>`;
  });
  tbody.innerHTML = rows;
  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    totalPriceElement.innerHTML = ` Rs.${(Total / 100).toFixed(2)}`;
  }
}

function saveStorage() {
  // to save the cart on the local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getThePrice(optionMenu, priceContainer, Input) {
  // function  used to get the price and update it dynamically based omn the quantitty and adisplay in the HTML
  let selectedOption;
  let InputValue;

  optionMenu.addEventListener("change", () => {
    selectedOption = optionMenu.value;
    let priceHTML = "";

    products.forEach((category) => {
      category.forEach((product) => {
        if (selectedOption === product.name) {
          priceHTML = `<p id="Cost"> ${product.quantity} :  Rs. ${(
            product.price / 100
          ).toFixed(2)} </p>`;
          priceContainer.innerHTML = priceHTML;
        }
      });
    });

    // Update the cost dynamically based on input
    Input.addEventListener("input", () => {
      InputValue = Input.value;
      if (InputValue >= 1) {
        let priceHTML = "";

        products.forEach((category) => {
          category.forEach((product) => {
            if (selectedOption === product.name) {
              const quantity = Number(InputValue);
              const price = product.price * quantity;
              priceHTML = `<p id="Cost"> Cost :  Rs. ${(price / 100).toFixed(
                2
              )} </p>`;
              priceContainer.innerHTML = priceHTML;
            }
          });
        });
      } else {
        alert(`Invalid quantity for item`);
      }
    });
  });
}

function addOrderButtonListener(orderButton) {
  // function to get the data  to the cart when the order button is clicked
  orderButton.addEventListener("click", () => {
    const optionMenu = orderButton
      .closest(".orderContainer")
      .querySelector("#Options");
    const Input = orderButton
      .closest(".orderContainer")
      .querySelector("#Input");
    const selectedOption = optionMenu.value;
    if (selectedOption === "hi") {
      alert("Please select an option");
    } else {
      if (Input.value > 0) {
        let productExists = false;

        cart.forEach((item) => {
          if (item.productName === selectedOption) {
            item.quantity += Number(Input.value);
            productExists = true;
          }
        });

        if (!productExists) {
          products.forEach((category) => {
            category.forEach((product) => {
              if (selectedOption === product.name) {
                cart.push({
                  productName: product.name,
                  quantity: Number(Input.value),
                  price: product.price,
                  image: product.image,
                  type: product.quantity,
                });
              }
            });
          });
        }

        updateThetable(cart);
        saveStorage();
      } else {
        alert(`no zeros`);
      }
    }
  });
}

// function to get the image
function getTheimage(optionMenue, imageContainer) {
  optionMenue.addEventListener("change", () => {
    const selectedOption = optionMenue.value;
    let ImageHTML = "";

    products.forEach((category) => {
      category.forEach((product) => {
        if (selectedOption === product.name) {
          ImageHTML += `<img src="${product.image}" alt="${product.name}" class="ProductImage">`;
        }
      });
    });

    imageContainer.innerHTML = ImageHTML;
  });
}

// main funtion that loop through the containers
function MainFunction() {
  orderContainer.forEach((container) => {
    const optionMenue = container.querySelector("#Options");
    const imageContainer = container.querySelector("#ImageContainer");
    const priceContainer = container.querySelector("#priceContainer");
    const Input = container.querySelector("#Input");
    const orderButton = container.querySelector("#orderButton");
    let price;
    let quantity;

    getTheimage(optionMenue, imageContainer);
    getThePrice(optionMenue, priceContainer, Input);
    addOrderButtonListener(orderButton);
  });
}

const orderContainer = document.querySelectorAll(".orderContainer");
const addFavouriteBtn = document.getElementById("addFavouriteBtn");
const favouriteList = document.getElementById("favouriteList");
const favouriteResetBtn = document.getElementById("favouriteReset");
const Buybtn = document.getElementById("Buybtn");

//----------------------------------------------------------------MAIN PROGRAM----------------------------------------------------------------------------------
window.addEventListener("load", () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("currentOrder");
});
let cart = JSON.parse(localStorage.getItem("cart"));
if (cart === null) {
  cart = [];
}
console.log(cart);

MainFunction();
if (addFavouriteBtn) {
  addFavouriteBtn.onclick = saveToFavourites;
}
if (favouriteList) {
  favouriteList.addEventListener("click", getFromFavourites);
}
if (favouriteResetBtn) {
  favouriteResetBtn.addEventListener("click", restFavourites);
}
if (Buybtn) {
  Buybtn.addEventListener("click", Buy);
}

window.addEventListener("resize", adjustColspan);
