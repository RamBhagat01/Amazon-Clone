import {render} from './checkout/order-summary.js';
import {call} from './checkout/payment-summary.js'
import { cart} from '../data/cart.js';
import {  products, fetchproducts } from '../data/products.js';
import {deliverydetails} from '../data/deliveryoption.js';
import {cartquantity1} from '../data/cart.js';
import { loadcart } from '../data/cart.js';
import { addorders } from  '../data/orders.js'
//import '../data/cart-class.js';
//import '../data/backend-practice.js'





//calculating price of cart items and printing them on website..

export function htmlrender() {

    let totalprice = 0;
    let deliverycharges = 0 ;
    let totalwithdelivery = 0;
    let tax = 0;
    let totalwithtaxes = 0;
   

    

    cart.forEach((item) => {

      let maching2 = '';
    
      products.forEach((product) => {
        if ( product.id === item.productId){
          maching2 = product
        }
      })

      const price =  maching2.priceCents;
      totalprice += item.quantity * price;
      
      // let deliverycharges ;

      deliverydetails.forEach((detail) => {

        if (item.deliveryid === detail.id){

          deliverycharges += detail.pricecents

        }

      })

    })

    //console.log(totalprice);.....checked
    //console.log(deliverycharges);......checked

    totalwithdelivery = totalprice + deliverycharges;

    //console.log(totalwithdelivery);.....checked

    tax = totalwithdelivery * 1/10;

    totalwithtaxes = tax + totalwithdelivery;

    //console.log(totalwithtaxes);....checked

  

    document.querySelector('.payment-summary').innerHTML=

    `
    <div class="payment-summary">
        <div class="payment-summary-title">
         Order Summary:
        </div>

        <div class="payment-summary-row">
        <div>Items (${cartquantity1()}):</div>
        <div class="payment-summary-money">$${(Math.round(totalprice))/100}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(Math.round(deliverycharges))/100}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(Math.round(totalwithdelivery))/100}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(Math.round(tax))/100}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${((Math.round(totalwithtaxes))/100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary js-placeorder">
        Place your order
        </button>
    </div>`

    
        
};

/*

loadproducts(() => {
  render();
  call();
  htmlrender();
})
*/



/*
//used promise to generate the checkout page//
Promise.all([

  fetchproducts()
 ,

  new Promise((resolve)=> {
    loadcart(() => {
      resolve();
    })
  })

]).then(() => {
    render();
    call();
    htmlrender();
})
*/




//used async await to generate cart page (after Promise.all)...

async function loadpage() {

  try {

    //throw 'error1'
    await fetchproducts();

    await new Promise((resolve, reject)=> {
      
      //throw 'error2'
      
      loadcart(() => {
        //reject('error3');
        resolve();
      })

    });

  } catch (error) {
    console.log('Un-expected reeor occoured. Try again later (async - loadpage)')

  }
  

  render();
  call();
  htmlrender();


  document.querySelector('.js-placeorder')
  .addEventListener('click' , async () => {
  
   try {
      
      const response = await fetch('https://supersimplebackend.dev/orders', {

        // ALL 3 THINGS ARE NECESSARY OTHERWISE IT WILL GIVE A ERROR.
        // BODY IS ACCORDING TO THE DOCUMENTATION OF THE BACKEND.

        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({cart: cart})

      });

      // Here after the POST request server send back our order id along with cart items(ordered) with their quantity.

      const response2 = await response.json();
      addorders(response2);
      console.log(response2);

    } catch (error) {
      console.log('Unexpected error. Try later (order-request-to-backend.)')
    };
    

    //window.location.href CHANCES THE LOCATION OF URL AND REDIRECT US TO OTHER FILE ON CLICKING 'PLACE-ORDER';
    // Example = https://127.0.0.1:5500/checkout.html => THEN IT WILL (JUST) CHANGE FILE PATH FROM {checkout.html} TO {orders.html}. 

    window.location.href = 'orders.html';

  })

}
loadpage();

