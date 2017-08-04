export const ADD_PRODUCT = 'ADD_PRODUCT';
export const addNewProduct = (product) => ({
    type: ADD_PRODUCT,
    product
})

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    productId
})
