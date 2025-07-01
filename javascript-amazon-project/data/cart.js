export let cart = [{
productid: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
quantity: 2
},{
  productid: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

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
        quantity: 1 
      });
    }

}

export function deletecart(proid) {

  const newcart = [];

  cart.forEach((item) =>{

    if (item.productid !== proid) {
      newcart.push(item);
    }
  }) 
  cart = newcart ;
}