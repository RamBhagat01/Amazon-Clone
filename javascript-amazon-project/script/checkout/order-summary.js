import { cart, deletecart,cartquantity1, addstorage} from '../../data/cart.js';
import { products } from '../../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliverydetails} from '../../data/deliveryoption.js'
import { htmlrender } from '../checkout.js';


//working with dayjs feature
//console.log(dayjs());

//console.log( dayjs().add(7 , 'days').format('dddd, MMMM D'));



export function render() {

  let cartsummary = '';

  cart.forEach((item) => {
    const itemid = item.productId;

    let matcheditems ;

    products.forEach((product) => {
      if (product.id === itemid) {
        matcheditems = product;
      }
    });

    let finaldate = '';

    deliverydetails.forEach((detail) => {
      if ( item.deliveryOptionId === detail.deliveryOptionId ) {

      finaldate = dayjs().add(detail.deliverydays , 'days').format('dddd, MMMM D')
      }
    })

    cartsummary += `
    <div class="cart-item-container js-delete-${matcheditems.id}">
      <div class="delivery-date js-final-render ">
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
            ${matcheditems.priceCents1()}
          </div>

          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>

            <span class="update-quantity-link link-primary update-quantitybutton"
            data-update-quant ="${matcheditems.id}">
              Quantity (+1)
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



// generated rest of html here because its delivery date related...

  function generatehtml (matcheditems , deliverydetails, item) {

    let html = '';

    deliverydetails.forEach((option) => {

      // here i used a ternary operator if value is true then ? = answer...
      // if false : = answer...

      const pricestring = option.pricecents === 0 
      ? 'FREE'
      : `$${(option.pricecents/100).toFixed(2)}`
      
      const checking = (item.deliveryOptionId === option.deliveryOptionId)
      //console.log(typeof checking); = boolean value
      //console.log(checking);

      html += `
        
          <div class="delivery-option js-render"
          data-product-id = "${matcheditems.id}"
          data-delivery-id = "${option.deliveryOptionId}"
          >
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

       // console.log(cart);
        document.querySelector('.js-update-cart').innerHTML = cartquantity1();

        htmlrender();

      })

    })

    
    document.querySelector('.js-update-cart').innerHTML = cartquantity1();





//adding backend = functionality to delivery radio buttons and saving them to local storage...
    
  function deliverydate(cart) { 
    document.querySelectorAll('.js-render')
      .forEach((option) => {
        option.addEventListener('click', () => {

          const deliveryid1 = option.dataset.deliveryId
          const productid1 = option.dataset.productId

          //console.log(deliveryid1);....check
          //console.log(productid1);.....check
          
          let maching1 = '';

          cart.forEach((item) => {
            if ( productid1 === item.productId) {
              maching1 = item 
              maching1.deliveryOptionId = deliveryid1
            }
          })  

       // console.log(maching1);
        addstorage();
        render();
        htmlrender();
        

        })

      })
  }

  deliverydate(cart, deliverydetails);
  



//adding fumction to update or quantity (+1) button...

  function updatebutton(cart) {

    document.querySelectorAll('.update-quantitybutton')
    .forEach((button2) => {
      button2.addEventListener('click',() => {

      const updateid = button2.dataset.updateQuant

      let maching3 ;

      cart.forEach((item2) => {
        if ( updateid === item2.productId) {
          maching3 = item2

        }
      })

      
      maching3.quantity += 1
      
      //console.log(maching3) ;
      //checked...

      
      render();
      htmlrender();
      addstorage();


      })
    })
  };
  updatebutton(cart);
  
  


};