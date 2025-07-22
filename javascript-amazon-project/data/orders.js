const orders = localStorage.getItem('orders') || [];

export function addorders(list) {
 orders.unshift(list);
saveorder()
}

function saveorder() {
    localStorage.setItem('orders', JSON.stringify(orders));
}