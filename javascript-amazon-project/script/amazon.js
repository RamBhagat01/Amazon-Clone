import {cart, addtoCart} from '../data/cart.js';
import {products , loadproducts} from '../data/products.js';

loadproducts(rendercallback);
//here we are using call back frature so that rendercallback function here became equal to fun in products.js folder and then after loading (response from backend) from their run this code..
 
function rendercallback() {
  /*
  const products = [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
        stars: 4.5,
        count: 87
        },
        priceCents: 1090,
        keywords: [
        "socks",
        "sports",
        "apparel"
        ]
      },{
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: {
          stars: 4,
          count: 127
          },
          priceCents: 2095,
          keywords: [
          "sports",
          "basketballs"
          ]
      }
  ];
  */

  let list = '';

  //type of products = Array.
  //product saves the 1st object in the array then runs the code 1 by 1.

  products.forEach((product,index) => {

      
      list += `
          <div class="product-container">

            <div class="product-image-container">

              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">

              <img class="product-rating-stars"
                src="${product.starscount()}">
              <div class="product-rating-count link-primary">
                ${product.ratingcount()}
              </div>
            </div>

            <div class="product-price">
              ${product.priceCents1()}
            </div>

            

            ${product.sizehtml()}
            ${product.warranty1()}
            

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-cart-button"
            data-product-id= "${product.id}">
              Add to Cart
            </button>

          </div> `

          //console.log(html);

  // console.log(list);

    
  });

  //choose the location of div carefully for DOM. 

  document.querySelector('.products-grid').innerHTML = list




  //add functionality to add to cart button by event listener attribute...

  document.querySelectorAll('.js-cart-button')
  .forEach(
    (button) => {
    button.addEventListener(
      'click' , () => {

      const productId = button.dataset.productId;

      addtoCart(productId);
      updateCart();

      
    }
    );
  }
  );


  // adding add to cart function for more simple operations...

  function updateCart() {
    let cartquantity = 0;

    cart.forEach((items) => {
      cartquantity += items.quantity
    })

    document.querySelector('.cart-quantity').innerHTML = cartquantity;

  // console.log(Number(cartquantity));
  console.log(cart);
  };
  updateCart();
}





