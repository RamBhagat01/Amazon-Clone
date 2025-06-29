export const cart = [];

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