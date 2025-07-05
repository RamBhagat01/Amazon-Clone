export let cart = JSON.parse(localStorage.getItem('cart'));

/*

if (!cart) {
 cart = [{
  productid: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 0,
  deliveryid :'1'
  }
  
  ,{
    productid: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 0,
    deliveryid :'1'
  }];

}
  
*/  
  
 

export function addstorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}



//adding function to add to cart button...

export function addtoCart (productid) {
  let matchingitem;

    cart.forEach((item) => {
 
      if (productid === item.productid) {
        matchingitem = item
      }
   });


    if (matchingitem){
      matchingitem.quantity += 1
    }
    else {
      cart.push({
        productid: productid,
        quantity: 1, 
        deliveryid:'1'
      });
    }

    addstorage();
    cartquantity1();
    
}



export function deletecart(proid) {

  const newcart = [];

  cart.forEach((item) =>{

    if (item.productid !== proid) {
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





