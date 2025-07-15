class Cart {

    cartitems= undefined;
    key = undefined;

    constructor(key2) {

        this.key = key2
        this.loadfromstorage();

    };
    
    
    loadfromstorage() {

        this.cartitems = JSON.parse(localStorage.getItem(this.key));

        if (!this.cartitems) {
            this.cartitems = [{
            productid: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryid :'1'
            }
            
            ,{
            productid: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryid :'1'
            }];
        }

    };


    addstorage() {
        localStorage.setItem(this.key, JSON.stringify(this.cartitems));
    };
        
        
    //adding function to add to cart button...

    addtoCart (productid) {
    let matchingitem;

        this.cartitems.forEach((item) => {
    
            if (productid === item.productid) {
                matchingitem = item
            }
        });


        if (matchingitem){
            matchingitem.quantity += 1
        }

        else {
            this.cartitems.push({
                productid: productid,
                quantity: 1, 
                deliveryid:'1'
            });
        }

        this.addstorage();
        this.cartquantity1();
        
    };
    
    deletecart(proid) {

        const newcart = [];

        this.cartitems.forEach((item) =>{

            if (item.productid !== proid) {
            newcart.push(item);
            }
        }) 
        this.cartitems = newcart ;

        this.addstorage();
        this.cartquantity1();
    };

    //cart quantity feature...total sum! 

    cartquantity1() {
    
        let count= 0;

        this.cartitems.forEach((it) => {
            count += it.quantity
            
        })

        // console.log(count);
        return count;
    };

   

}

const cart = new Cart('cart-oop');
const bcart = new Cart('cart-bus');

cart.addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

bcart.deletecart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');


console.log(cart)
console.log(bcart);


/*

cart.key = 'cart-oop'
bcart.key = 'cart-bus'


cart.loadfromstorage();
cart.addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//cart.deletecart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

bcart.loadfromstorage();
//bcart.addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
bcart.deletecart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

console.log(cart)
console.log(bcart);


//checking origin of our objects.......by boolean values..

console.log(cart instanceof Cart);
console.log(bcart instanceof Cart);

*/

