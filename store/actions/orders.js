
export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

import Order from '../../models/order'


export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            // tutaj tworzę sobie asynchroniczny kod jaki tylko 


            const response = await fetch(`https://shop-app-mckrus-default-rtdb.firebaseio.com/orders/${userId}.json`)

            if (!response.ok) {
                throw new Error("Coś poszło nie tak... .")
            }

            const resData = await response.json()
            const loadedOrders = []
            for (const key in resData) {
                loadedProducts.push(new Order(
                    key,
                    resData[key].userId,
                    resData[key].id,
                    resData[key].items,
                    resData[key].totalAmount,
                    resData[key].data
                ))
            }
            dispatch({ type: SET_ORDERS, products: loadedOrders })
        } catch (err) {
            throw err
        }
    }

}


// ______________________________________________

export const addOrder = (cartItems, totalAmount) => {
    try {

        return async (dispatch, getState) => {

            const token = getState().auth.token
            const userId = getState().auth.userId
            const date = new Date()
            // tutaj tworzę sobie asynchroniczny kod jaki tylko chcę
            const response = await fetch(`https://shop-app-mckrus-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString(),
                    ownerId:userId
                })
            })

            const resData = await response.json()




            dispatch({
                type: ADD_ORDER, orderData: {
                    id: resData.name,
                    items: cartItems,
                    amount: totalAmount,
                    date: date
                }
            })
        }
    } catch (err) {
        throw err
    }




}