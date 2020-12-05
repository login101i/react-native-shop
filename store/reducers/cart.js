

import { ADD_TO_CART, DELETE_FROM_CART, ADD_ONE_TO_CART, CLEAR_CART } from '../actions/cart'
import { DELETE_PRODUCT } from '../actions/products'
import { ADD_ORDER } from '../actions/orders'
import CartItem from '../../models/cartItem'

const initialState = {
    items: {},
    totalAmount: 0

}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = parseInt(addedProduct.price);
            const productTitle = addedProduct.title;

            let newOrUpdatedCartItem
            if (state.items[addedProduct.id]) {
                // cg
                newOrUpdatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice,
                )
            } else {
                newOrUpdatedCartItem = new CartItem(
                    1,
                    productPrice,
                    productTitle,
                    productPrice
                )
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: newOrUpdatedCartItem },
                totalAmount: state.totalAmount + productPrice
            }
        case DELETE_FROM_CART:
            const selectedItem = state.items[action.pid]
            const currentQuantity = selectedItem.quantity
            let updatedCartItems
            if (currentQuantity > 1) {
                const updatedCartItem = new CartItem(
                    selectedItem.quantity - 1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.sum - selectedItem.productPrice
                )
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
            } else {
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.pid]

            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedItem.productPrice
            }
        case ADD_ONE_TO_CART:
            const selectedOneItem = state.items[action.pid]
            const updatedCartItem = new CartItem(
                selectedOneItem.quantity + 1,
                selectedOneItem.productPrice,
                selectedOneItem.productTitle,
                selectedOneItem.sum + selectedOneItem.productPrice
            )
            return {
                ...state,
                items: { ...state.items, [action.pid]: updatedCartItem },
                totalAmount: state.totalAmount + selectedOneItem.productPrice
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state
            }
            const itemTotal = state.items[action.pid].sum
            const updatedItems = { ...state.items }
            delete updatedItems[action.pid]

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalamount - itemTotal
            }
        case CLEAR_CART:
            return initialState





    }
    return state
}