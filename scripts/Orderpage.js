import { products } from "./data/product.js";


//-----------------Functions--------------------------------------------------------------------------------------------------
function Buy() {
  // Set the current order in local storage
  localStorage.setItem("currentOrder", JSON.stringify(cart));

  window.location.href = "checkout.html";
  
}

function adjustColspan() {
  const colspans = document.querySelectorAll(".colspan");
  colspans.forEach((element) => {
    if (window.innerWidth <= 818) {
      element.setAttribute("colspan", 2); // Small screens
    } else if (window.innerWidth <= 1255) {
      element.setAttribute("colspan", 3); // Medium screens
    } else {
      element.setAttribute("colspan", 4); // Large screens (default)
    }
  });
}

function restFavourites() {
  localStorage.removeItem("favourites");
  window.alert("favourite is reseted");

  resetCart();
}
function resetCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("currentOrder");
  window.alert("cart is reseted");
}

function saveToFavourites() {
  localStorage.setItem("favourites", JSON.stringify(cart));
  window.alert("Saved to the favourites");
}

function getFromFavourites() {
  cart = JSON.parse(localStorage.getItem("favourites"));
  updateThetable(cart);
}

function updateThetable() {
  let Total = 0;
  const tbody = document.querySelector("#orderTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  cart.forEach((item) => {
    Total += item.price * item.quantity;
    const row = `<tr>
                  <td class="col-1"><img src="${item.image}" alt="${item.productName}" class="ProductImage"></td>
                  <td class="col-2">${item.productName} : ${item.type} </td>
                  <td class="col-3">${item.quantity}</td>
                  <td class="col-4">Rs.${(item.price / 100).toFixed(2)}</td>
                  <td class="col-5">Rs.${((item.price * item.quantity) /100).toFixed(2)}</td>
                </tr>`;

    tbody.innerHTML += row;
    
  });

  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    totalPriceElement.innerHTML = ` Rs.${(Total / 100).toFixed(2)}`;
  }
  
}

function saveStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getThePrice(optionMenu, priceContainer, Input) {
  let selectedOption;
  let InputValue;

  optionMenu.addEventListener("change", () => {
    selectedOption = optionMenu.value;
    let priceHTML = "";

    products.forEach((category) => {
      category.forEach((product) => {
        if (selectedOption === product.name) {
          priceHTML = ` ${product.quantity} :  Rs. ${(
            product.price / 100
          ).toFixed(2)}`;
          priceContainer.innerHTML = priceHTML;
        }
      });
    });

    // Update the cost dynamically based on input
    Input.addEventListener("input", () => {
      InputValue = Input.value;
      if (InputValue >= 1){
        let priceHTML = "";

        products.forEach((category) => {
          category.forEach((product) => {
            if (selectedOption === product.name) {
              const quantity = Number(InputValue);
              const price = product.price * quantity;
              priceHTML = ` Cost :  Rs. ${(price / 100).toFixed(2)}`;
              priceContainer.innerHTML = priceHTML;
            }
          });
        });
      }else{
        alert(`Invalid quantity for item`);
      }
      
    });
  });
}

function addOrderButtonListener(orderButton) {
  orderButton.addEventListener("click", () => {
    const optionMenu = orderButton
      .closest(".orderContainer")
      .querySelector("#Options");
    const Input = orderButton
      .closest(".orderContainer")
      .querySelector("#Input");
    const selectedOption = optionMenu.value;
    if (selectedOption === 'hi'){
      alert('Please select an option');
    }
    else{
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

        updateThetable();
        saveStorage();
      } else {
        alert(`no zeros`);
      }

    }
        
    
  });
}

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

window.addEventListener("load", restFavourites);
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

window.addEventListener("resize",adjustColspan)

