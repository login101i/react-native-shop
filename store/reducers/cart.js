import { ADD_TO_CART, REMOVE_FROM_CART, ADD_ONE, CLEAR_CART } from "../actions/cart"
import CartItem from '../../models/cartItem'
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    items: [],
    totalAmount: 0,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title

            if (state.items[addedProduct.id]) {
                //już jet ten przedmiot w koszytku
                const newCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: newCartItem },
                    totalAmount: state.totalAmount + prodPrice
                }
            } else {
                const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: newCartItem },
                    totalAmount: state.totalAmount + prodPrice
                }
            }
        case REMOVE_FROM_CART:

            const selectedItem = state.items[action.pid]

            const currentQty = selectedItem.quantity

            let updatedCartItems

            if (currentQty > 1) {
                const updatedCartItem = new CartItem(
                    selectedItem.quantity - 1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.sum - selectedItem.productPrice
                )
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }

            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid]
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedItem.productPrice
            }
        case ADD_ONE:
            const itemKtoryJest = state.items[action.pid]
            const updatedAmountofItem = new CartItem(
                itemKtoryJest.quantity + 1,
                itemKtoryJest.productPrice,
                itemKtoryJest.productTitle,
                itemKtoryJest.sum + itemKtoryJest.productPrice
            )
            const updatedAmount = { ...state.items, [action.pid]: updatedAmountofItem }
            return {
                ...state,
                items: updatedAmount,
                totalAmount: state.totalAmount + itemKtoryJest.productPrice
            }
        case CLEAR_CART:
            return {
                ...state,
                items:[],
                totalAmount:0
            }
        case ADD_ORDER:{
            return initialState

          
        }


    }
    return state
}