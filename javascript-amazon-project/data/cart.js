export let cart;

loadfromstorage();

export function loadfromstorage() {

  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId:'1'
    }
    
    ,{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId:'1'
    }];

  }


}  

  
 

export function addstorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}



//adding function to add to cart button...

export function addtoCart (productid) {
  let matchingitem;

    cart.forEach((item) => {
 
      if (productid === item.productId) {
        matchingitem = item
      }
   });


    if (matchingitem){
      matchingitem.quantity += 1
    }
    else {
      cart.push({
        productId: productid,
        quantity: 1, 
        deliveryOptionId:'1'
      });
    }

    addstorage();
    cartquantity1();
    
}



export function deletecart(proid) {

  const newcart = [];

  cart.forEach((item) =>{

    if (item.productId !== proid) {
      newcart.push(item);
    }
  }) 
  cart = newcart ;

  addstorage();
  cartquantity1();
}


//cart quantity feature...total sum! 

export function cartquantity1() {
  
  let count= 0;

  cart.forEach((it) => {
    count += it.quantity
    
  })

 // console.log(count);
  return count;
}





export function loadcart(fun) {

 const xhr = new XMLHttpRequest();

  xhr
  .addEventListener('load', () => {
    console.log(xhr.response);
    fun();
    
  });

 xhr.open('GET','https://supersimplebackend.dev/cart');
 xhr.send();

 

}



