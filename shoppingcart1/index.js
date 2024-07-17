// Create a new IndexedDB database
let db;

document.addEventListener("DOMContentLoaded", () => {
  // Create a new IndexedDB database
  const request = indexedDB.open("shoppingCartDB", 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("cart", { keyPath: "id" });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("price", "price", { unique: false });
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database created successfully");
  };

  request.onerror = (event) => {
    console.error("Error creating database:", event.target.errorCode);
  };
});

// Add item to cart
function addItemToCart(item) {
  const transaction = db.transaction("cart", "readwrite");
  const objectStore = transaction.objectStore("cart");
  const request = objectStore.add(item);

  request.onsuccess = (event) => {
    console.log("Item added to cart successfully");
  };

  request.onerror = (event) => {
    console.error("Error adding item to cart:", event.target.errorCode);
  };
}

// Get all items in cart
function getCartItems() {
  const transaction = db.transaction("cart", "readonly");
  const objectStore = transaction.objectStore("cart");
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const items = event.target.result;
    console.log("Cart items:", items);
    // Update the UI with the cart items
  };

  request.onerror = (event) => {
    console.error("Error getting cart items:", event.target.errorCode);
  };
}







// Get the checkout button element
const checkoutButton = document.querySelector('.check-knopka');

// Add an event listener to the checkout button
checkoutButton.addEventListener('click', () => {
  // Get the item elements
  const items = document.querySelectorAll('.item1');

  // Create an array to store the order details
  const orderDetails = [];

  // Loop through each item element
  items.forEach((item) => {
    // Get the item name, price, and quantity
    const itemName = item.querySelector('b').textContent;
    const itemPrice = item.querySelector('.cost p').textContent;
    const itemQuantity = item.querySelector('.item-input').value;

    // Create an object to store the item details
    const itemDetail = {
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
    };

    // Add the item detail to the order details array
    orderDetails.push(itemDetail);
  });

  // Get the card details
  const cardName = document.querySelector('#input1').value;
  const cardNumber = document.querySelector('#input2').value;
  const cardExpiration = document.querySelector('#input3').value;
  const cardCvv = document.querySelector('#input4').value;

  // Add the card details to the order details object
  const order = { 
    items: orderDetails,
    card: {
      name: cardName,
      cardNumber: cardNumber,
      cardExpiration: cardExpiration,
      cardCvv: cardCvv,
    },
  };

  // Log the order details to the console
  console.log('Order Details:');
  console.log(order);
});


document.querySelector('.check-knopka').addEventListener('click', ()=>{
  let  data1 = document.querySelector('#numberinput1').value*681;
  let  data2 = document.querySelector('#numberinput2').value*681;
  let  data3 = document.querySelector('#numberinput3').value*681;
  let total = document.querySelector('.out').innerHTML = data1 + data2 +data3;
  let total2 = document.querySelector('.out2').innerHTML = data1 + data2 +data3 + 4;
  let total3 = document.querySelector('.out3').innerHTML = data1 + data2 +data3 + 4;
  
})




// // Get all input fields and cost elements
// const inputFields = document.querySelectorAll('.item-input');
// const costElements = document.querySelectorAll('.cost p');

// // Get the subtotal element
// const subtotalElement = document.querySelector('.output p');

// // Function to calculate subtotal
// function calculateSubtotal() {
//   let subtotal = 0;
//   inputFields.forEach((input, index) => {
//     const quantity = parseInt(input.value);
//     const cost = parseInt(costElements[index].textContent.replace('$', ''));
//     subtotal += quantity * cost;
//   });
//   subtotalElement.textContent = `$${subtotal}`;
// }

// // Add event listeners to input fields
// inputFields.forEach((input) => {
//   input.addEventListener('input', calculateSubtotal);
// });

// // Calculate subtotal on page load
// calculateSubtotal();






















// Remove item from cart
function removeItemFromCart(itemId) {
  const transaction = db.transaction("cart", "readwrite");
  const objectStore = transaction.objectStore("cart");
  const request = objectStore.delete(itemId);

  request.onsuccess = (event) => {
    console.log("Item removed from cart successfully");
  };

  request.onerror = (event) => {
    console.error("Error removing item from cart:", event.target.errorCode);
  };
}