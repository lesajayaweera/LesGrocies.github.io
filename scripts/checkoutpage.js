// functions
//---------------------------------------------------------------------------------------------------------------------------



function pay() { // function to  check the form and proceed to pay
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


function UpdateOrderTable() { // function to   update order table in the checkout page
  const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
  console.log(currentOrder);

  const tableBody = document.querySelector("#OrderTable tbody");
  console.log(tableBody);

  tableBody.innerHTML = "";

  let Total = 0; // Initialize Total
  currentOrder.forEach((Order) => {
    Total += Order.price * Order.quantity;
    const row = `<tr>
                    <td>${Order.productName} : ${Order.type} </td>
                    <td>${Order.quantity}</td>
                    <td>Rs.${((Order.price * Order.quantity) / 100).toFixed(
                      2
                    )}</td>
                </tr>`;
    tableBody.innerHTML += row;
  });
  document.getElementById("totalPrice").innerHTML = `Rs.${(Total / 100).toFixed(
    2
  )}`;
  console.log("Total:", Total); // Log the Total after calculation
}
//----------------------End of functions----------------------------------------------------------------------------------------------



//---------------------------MAin Program-------------------------------------------------------------------------------
const checkoutbtn = document.getElementById("checkoutbtn");
window.addEventListener("load", UpdateOrderTable);
if (checkoutbtn) {
  checkoutbtn.addEventListener("click", pay);
}


