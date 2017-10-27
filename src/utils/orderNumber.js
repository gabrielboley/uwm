export const orderNumber = (orderNumber) => {
    const orderString = orderNumber.toString();
    const orderNumberLength = orderString.length
        ? orderString.length
        : false;
    if (!orderNumberLength) {
        return '00001';
    }
    const remainder = 5 - orderNumberLength;
    for (let i = 0; i < remainder; i += 1) {
        orderNumber = '0' + orderNumber;
    }
    return orderNumber;
}
