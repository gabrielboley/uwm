export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const deleteCustomer = (customerIndex) => ({
    type: DELETE_CUSTOMER,
    customerIndex
});
