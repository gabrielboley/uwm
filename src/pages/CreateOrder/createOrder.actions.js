export const TOGGLE_GUEST = 'TOGGLE_GUEST';
export const toggleGuest = () => ({
    type: TOGGLE_GUEST
})

export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const updateCustomer = (customer) => ({
    type: UPDATE_CUSTOMER,
    customer
})

export const REMOVE_ACTIVE_CUSTOMER = 'REMOVE_ACTIVE_CUSTOMER';
export const removeActiveCustomer = () => ({
    type: REMOVE_ACTIVE_CUSTOMER
})
