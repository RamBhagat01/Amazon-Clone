export function formatcurrency(currency) {

    let result= 0;

    result = ((Math.round(currency))/100).toFixed(2);

    return result;

}


//console.log(formatcurrency(200.5));

    

