
export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date()
        // tutaj tworzę sobie asynchroniczny kod jaki tylko chcę
        const response = await fetch("https://shop-app-mckrus-default-rtdb.firebaseio.com/orders/u1.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })

        if (!response.ok) {
            throw new Error("Coś poszło nie tak przy dodawaniu zamówinia.")
        }

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


}