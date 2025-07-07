import { addtoCart, cart , loadfromstorage , cartquantity1 } from '../../data/cart.js';

describe('test suite: cart checkup' , () => {
    it('adding existing product to cart', () => {
        spyOn(localStorage , 'setItem');
       

        spyOn(localStorage , 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        })

        loadfromstorage();

        addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });


    it('add new product to cart', () => {

        spyOn(localStorage , 'setItem');

        spyOn(localStorage , 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productid: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryid :'1'
            }]);
        });

        loadfromstorage();


        addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);


    })
})

