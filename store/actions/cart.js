export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART='REMOVE_FROM_CART'
export const ADD_ONE='ADD_ONE'
export const CLEAR_CART='CLEAR_CART'


export const addToCart=product=>{
    return {type:ADD_TO_CART, product:product}
}

export const removeFromCart=(productId)=>{
    return {type:REMOVE_FROM_CART, pid:productId}
}

export const addOne=(productId)=>{
    return{type:ADD_ONE, pid:productId}
}

export const clearCart=()=>{
    return{type:CLEAR_CART}
}