//grabbing the all the add cart buttons

let carts = document.querySelectorAll(".add-cart");

//creating a for loop to run through the number of times we click on add cart

for (let i = 0; i < carts.length; i++) {
  //create an event listener so we can use the click event and then assign to the cart numbers function and total cost function
  carts[i].addEventListener("click", () => {
    //this is the loop of the products which we are looping through
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}
// here is an array and inside the array are objects which are all the products for sale t
let products = [
  {
    name: "Roxy smart watch",
    price: 3500,
    inCart: 0,
    tag: "watch",
  },
  {
    name: "Roxy active gym leggings",
    price: 400,
    inCart: 0,
    tag: "leggings",
  },
  {
    name: "Roxy high waist gym shorts",
    price: 300,
    inCart: 0,
    tag: "shorts",
  },

  {
    name: "Roxy tanktop",
    price: 250,
    inCart: 0,
    tag: "tanktop",
  },

  {
    name: "Roxy sport shoes",
    price: 2500,
    inCart: 0,
    tag: "shoes",
  },

  {
    name: "Roxy yogamat",
    price: 500,
    inCart: 0,
    tag: "yogamat",
  },
];
// creating a function to check with local storage so that the number of times we click on the cart will show on the page

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}
// function to calculate the amount of numbers that the cart has been clicked
// we assign product as an attribute to the function
function cartNumbers(product) {
  // gets the amount of number from the local storage
  let productNumbers = localStorage.getItem("cartNumbers");
  // changing from a string into a number
  productNumbers = parseInt(productNumbers);

  //we create an if statememnt to check if there were products in the local storage if there were none we leave it as one if there is already we add by one

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  // we then grab the product and assign to another function to Setitems

  setItems(product);
}
// Set items function will be able to also tell which prouct was click on so we can acces it later on.
function setItems(product) {
  //we are creating a variable that gets productsincart from local storage
  let cartItems = localStorage.getItem("ProductsInCart");

  //checking to see if the cartItems are in the local storage
  console.log("My cartItems are", cartItems);
  //In order to bring it back to a javascript file we need to create the Parse function
  cartItems = JSON.parse(cartItems);
  // we make an if statement to say that if there are cart items in the local storage if there is we increment by 1
  //because when we change between different items we get an error message saying its undefined
  //we create an if statement to avoid this problem.
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      //here we use a rest operator to get all items thats in the object
      cartItems = {
        ...cartItems,

        [product.tag]: product,
      };
    }
    //if the list is empty this is what we will do as to create just one product
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;

    cartItems = {
      [product.tag]: product,
    };
  }
  // we are setting productsincart into the local storage here we make it from a javacsript file into a JSON file so we can store it back into local storage
  localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
}

//here we will work out the toatal cost

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);

    //we are setting the totalcost which cartcost + the next product price
    localStorage.setItem("totalCost", +cartCost + product.price);
    let alertCost = cartCost + product.price;
    alert("The current total is  R" + alertCost);
  } else {
    localStorage.setItem("totalCost", +product.price);
    alert("The current total is  R" + product.price);
  }
}

// Once we got the totalcost we push all the itums back on to the html cart page
// with taking whats in local storage
function displayCart() {
  //we take from local storage products in cart
  let cartItems = localStorage.getItem("ProductsInCart");

  // we then we make it back into a javascript file
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  // we get the total cost from local storage so we can manipulate
  //the calculations
  let vat = (15 / 100) * cartCost;
  let costAfterVat = +cartCost + vat;

  //we make an if statement saying that if cartItems and productcontainer are an empty array
  //we add the map of the values of cart items as item and push it back onto the page
  //we add the item tags and the item names in the products object

  if (cartItems && productContainer) {
    productContainer.innerHTML = " ";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class="product">
       <ion-icon class="icon" name="close-circle-outline"></ion-icon>
       <img src="./images/${item.tag}.jpg">
       <span>${item.name}</span>
   
    <div class="price">R${item.price}</div>
       <div class="quantity">${item.inCart}</div>
        <div class= "total">
        R${item.inCart * item.price}
        </div>
    
    `;
    });
    productContainer.innerHTML += `
    <div class ="basketTotalContainer">

    


    
    <h4 class= "basketTotalTitle">
    Before VAT       R${cartCost}
    </h4>
    <h4 class="vat">
    VAT   R${vat}
    </h4>
    <h4>
    Sub Total     R${costAfterVat}
    </h4>
    <h4 class = "coupon-total">
    

    </h4>


    
    


    </h4>
    </div>

`;
  }
}

//here we create a discount function with an eventlistener  for adding a coupon code

let discount = document.querySelector(".add-coupon");

discount.addEventListener("click", () => {
  addCoupon();
});

function addCoupon() {
  // we get the total cost from the local storage

  let cartCost = localStorage.getItem("totalCost");
  let vat = (15 / 100) * cartCost;
  let costAfterVat = +cartCost + vat;

  // we get the element id from the html page
  let coupon = document.getElementById("coupon");

  //we make an if statement to determine the coupon code

  if (coupon.value == "Roxy") {
    discountNum = (5 / 100) * costAfterVat;
  } else {
    coupon.value != "Roxy";
    alert("you have entered the wrong code");
  }

  let couponTotal = costAfterVat - discountNum;

  let idCouponTotal = document.getElementById("products");
  let makeCouponTotal = document.createElement("num");

  makeCouponTotal.innerHTML += `
  


  
  Coupon Total R${couponTotal}
  
  `;

  // we then add the coupon total to the total cost of the coupon total

  localStorage.setItem("totalCost", couponTotal);

  idCouponTotal.appendChild(makeCouponTotal);
}

let delivery = document.querySelector(".delivery-type");

//we create another event listener for adding a delivery option

discount.addEventListener("click", () => {
  addDelivery();
});

function addDelivery() {
  let storeDelivery = document.querySelector("#deliveryStore");
  let homeDelivery = document.querySelector("#deliveryHome");

  let cartCost = localStorage.getItem("totalCost");

  if (deliveryStore.checked == true) {
    cartCost += 300;
  } else {
    cartCost += 200;
  }
}

// we create a function to alert the user once

let confirming = document.querySelector(".confirm-order");

confirming.addEventListener("click", () => {
  confirmOrder();
});

function confirmOrder() {
  alert("Thank you for your order your unique code is Roxylicious");
}

onLoadCartNumbers();
displayCart();
