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

  window.location.href = "checkout.html";

  
}

function restFavourites() {
  localStorage.removeItem("favourites");
  window.alert("favourite is reseted");
  resetCart();
}

function resetCart() {
  localStorage.removeItem("cart");
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
                  <td><img src="${item.image}" alt="${
      item.productName
    }" class="ProductImage"></td>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>Rs.${((item.price * item.quantity) / 100).toFixed(2)}</td>
                </tr>`;

    tbody.innerHTML += row;
    console.log(item.price);
  });

  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    totalPriceElement.innerHTML = ` Rs.${(Total / 100).toFixed(2)}`;
  }
  console.log("updated");
}

function saveStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getThePrice(
  optionMenu,
  priceContainer,
  Input,
  setButton,
  orderButton,
  price,
  quantity
) {
  let InputValue;

  optionMenu.addEventListener("change", () => {
    let selectedOption = optionMenu.value;
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

    Input.addEventListener("input", () => {
      InputValue = Input.value;
      console.log(InputValue);
      let priceHTML = "";

      products.forEach((category) => {
        category.forEach((product) => {
          if (selectedOption === product.name) {
            quantity = Number(InputValue);
            price = product.price * quantity;
            priceHTML = ` Cost :  Rs. ${(price / 100).toFixed(2)}`;
            priceContainer.innerHTML = priceHTML;
          }
        });
      });;
    });
    // setButton.addEventListener("click", () => {
    //   InputValue = Input.value;
    //   console.log(InputValue);
    //   let priceHTML = "";

    //   products.forEach((category) => {
    //     category.forEach((product) => {
    //       if (selectedOption === product.name) {
    //         quantity = Number(InputValue);
    //         price = product.price * quantity;
    //         priceHTML = ` Cost :  Rs. ${(price / 100).toFixed(2)}`;
    //         priceContainer.innerHTML = priceHTML;
    //       }
    //     });
    //   });
    // });

    orderButton.addEventListener("click", () => {
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
              });
            }
          });
        });
      }

      updateThetable();
      saveStorage();
      console.log(cart);
    });
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
    const setButton = container.querySelector("#setButton");
    const orderButton = container.querySelector("#orderButton");

    let price;
    let quantity;

    if (
      optionMenue &&
      imageContainer &&
      priceContainer &&
      Input &&
      setButton &&
      orderButton
    ) {
      getTheimage(optionMenue, imageContainer);
      getThePrice(
        optionMenue,
        priceContainer,
        Input,
        setButton,
        orderButton,
        price,
        quantity
      );
    }
  });
}

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

MainFunction();

if (addFavouriteBtn){
  addFavouriteBtn.onclick = saveToFavourites;
} 
if (favouriteList){ 
  favouriteList.addEventListener("click", getFromFavourites);
}
if (favouriteResetBtn){
  favouriteResetBtn.addEventListener("click", restFavourites);
}
if (Buybtn){
  Buybtn.addEventListener("click", Buy);
} 
if (checkoutbtn){
  checkoutbtn.addEventListener("click", pay);
} 

