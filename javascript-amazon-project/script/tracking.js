import { products } from "./orders2.js";

//bring URL to object "url"
const url = new URL(window.location.href);

//saving constants from that objects.
const orderid = url.searchParams.get('orderId');
const productid = url.searchParams.get('productId');
const date = url.searchParams.get('deliveryDate');
const quant = url.searchParams.get('quantity');

//console.log(orderid)
//console.log(productid)


let machingpro ;

products.forEach((pro) => {
    if (pro.id === productid){
        machingpro = pro;

    }
})

let html3 = ``;

html3 = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <b>
            <div class="delivery-date">
            Arriving On: ${date}
            </div>
        </b>

        <h1>
            <div class="product-info">
                ${machingpro.name}
            </div>
        </h1>

        <h2>
            <div class="product-info">
            Quantity: ${quant}
            </div>
        </h2>

        <img class="product-image" src="${machingpro.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
`;

document.querySelector('.main').innerHTML = html3;