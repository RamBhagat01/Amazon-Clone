import {render} from './checkout/order-summary.js';
import {call} from './checkout/payment-summary.js'
import { cart} from '../data/cart.js';
import { products } from '../data/products.js';
import {deliverydetails} from '../data/deliveryoption.js';
import {cartquantity1} from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js'


render();
call();


//calculating price if cart items and printing them on website..

 export function htmlrender() {

    let totalprice = 0;
    let deliverycharges = 0 ;
    let totalwithdelivery = 0;
    let tax = 0;
    let totalwithtaxes = 0;
   

    

    cart.forEach((item) => {

      let maching2 = '';
    
      products.forEach((product) => {
        if ( product.id === item.productid){
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

        <button class="place-order-button button-primary">
        Place your order
        </button>
    </div>`

    
        
};

htmlrender();




