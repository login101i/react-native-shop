

export const ADD_TO_CART = "ADD_TO_CART"

export const addToCart = (product) => {
    return { type: ADD_TO_CART, product: product }
}

export const DELETE_FROM_CART = "DELETE_FROM_CART"

export const deleteFromCart = (productId) => {
    return { type: DELETE_FROM_CART, pid: productId }
}

export const ADD_ONE_TO_CART = "ADD_ONE_TO_CART"

export const addOneToCart = (productId) => {
    return { type: ADD_ONE_TO_CART, pid: productId }
}

export const CLEAR_CART = 'CLEAR_CART'

export const clearCart = () => {
    return { type: CLEAR_CART }
}