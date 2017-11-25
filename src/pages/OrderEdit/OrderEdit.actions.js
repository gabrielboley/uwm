export const UPDATE_ORDER = 'UPDATE_ORDER';
export const updateOrder = (order) => ({
    type: UPDATE_ORDER,
    order
});

export const UPDATE_ORDER_NUMBER = 'UPDATE_ORDER_NUMBER';
export const updateOrderNumber = (orderId, newNumber) => ({
    type: UPDATE_ORDER_NUMBER,
    newNumber,
    orderId
});
