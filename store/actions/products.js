export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

import Product from '../../models/product'



export const fetchProducts = () => {
    return async dispatch => {
        // tutaj tworzę sobie asynchroniczny kod jaki tylko chcę
        try {
            const response = await fetch("https://shop-app-mckrus-default-rtdb.firebaseio.com/products.json")

            if (!response.ok) {
                throw new Error("Coś poszło nie tak... .")
            }

            const resData = await response.json()
            console.log(resData)
            const loadedProducts = []
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ))
            }
            dispatch({ type: SET_PRODUCTS, products: loadedProducts })
        } catch (err) {
            throw err
        }
    }

}

export const deleteProduct = (productId) => {
    return async dispatch => {
        const result = await fetch(`https://shop-app-mckrus-default-rtdb.firebaseio.com/products/${productId}.json`,
            {
                method: 'DELETE',
            })

        if (!result.ok) {
            throw new Error("Coś poszło żle prrzy updatu")
        }

        dispatch({
            type: DELETE_PRODUCT,
            pid: productId

        })
    }
}
export const updateProduct = (id, title, description, imageUrl) => {
    return async dispach => {
        const result = await fetch(`https://shop-app-mckrus-default-rtdb.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        })
        if (!result.ok) {
            throw new Error("Coś poszło żle prrzy updatu")
        }

        dispach({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl,

            }
        })
    }

}
export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // tutaj tworzę sobie asynchroniczny kod jaki tylko chcę
        const response = await fetch("https://shop-app-mckrus-default-rtdb.firebaseio.com/products.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({

                title,
                description,
                imageUrl,
                price
            })
        })

        const resData = await response.json()



        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price

            }
        })
    }


}






