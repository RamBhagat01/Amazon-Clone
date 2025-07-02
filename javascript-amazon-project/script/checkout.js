import { cart, deletecart,cartquantity1 } from '../data/cart.js';
import { products } from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliverydetails} from '../data/deliveryoption.js'


//working with dayjs feature
//console.log(dayjs());

//console.log( dayjs().add(7 , 'days').format('dddd, MMMM D'));



let cartsummary = '';

cart.forEach((item) => {
    const itemid = item.productid;

    let matcheditems ;

    products.forEach((product) => {
      if (product.id === itemid) {
        matcheditems = product;
      }
    });

    let finaldate = '';

    deliverydetails.forEach((detail) => {
      if ( item.deliveryid === detail.id ) {

       finaldate = dayjs().add(detail.deliverydays , 'days').format('dddd, MMMM D')
      }
    })

  cartsummary += `
  <div class="cart-item-container js-delete-${matcheditems.id}">
    <div class="delivery-date">
      Delivery date: ${finaldate}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matcheditems.image}">

      <div class="cart-item-details">

        <div class="product-name">
          ${matcheditems.name}
        </div>

        <div class="product-price">
          $${(matcheditems.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${item.quantity}</span>
          </span>

          <span class="update-quantity-link link-primary">
            Update
          </span>

          <span class="delete-quantity-link link-primary js-delete" 
          data-product-id = "${matcheditems.id}">
            Delete
          </span>

        </div>

      </div>

      <div class="delivery-options">
      
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
         ${generatehtml(matcheditems , deliverydetails, item)}
      </div>
  
    </div>
  </div>
  `;

  

});

function generatehtml (matcheditems , deliverydetails, item) {

  let html = '';

  deliverydetails.forEach((option) => {

    // here i used a ternary operator if value is true then ? = answer...
    // if false : = answer...

    const pricestring = option.pricecents === 0 
    ? 'FREE'
    : `$${(option.pricecents/100).toFixed(2)}`
    
    const checking = item.deliveryid === option.id
    console.log(checking);

    html += `
      
        <div class="delivery-option">
          <input type="radio"
           ${checking ?'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matcheditems.id}">
          <div>
            <div class="delivery-option-date">
             ${dayjs().add(option.deliverydays ,'days').format('dddd, MMMM D')}
            </div>
            <div class="delivery-option-price">
              ${pricestring}-Shipping
            </div>
          </div>
        </div>
        `
 })


  return html;


}




document.querySelector('.order-summary').innerHTML = cartsummary;

//function of delete button...

document.querySelectorAll('.js-delete')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const proid = button.dataset.productId

      deletecart(proid);

      document.querySelector(`.js-delete-${proid}`).remove();

      console.log(cart);
      document.querySelector('.js-update-cart').innerHTML = cartquantity1();

    })

  })

  
  document.querySelector('.js-update-cart').innerHTML = cartquantity1();
  


 
 

  


