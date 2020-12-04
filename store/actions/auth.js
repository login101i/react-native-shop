export const SIGNUP = 'SIGNUP'

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBP3Qjhim7iREPosbZmiNGt6itgu3NgUlI'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            },
        )
        if (!response.ok) {
            throw new Error("Coś nie tak")
        }

        const resData = await response.json()
        console.log("To jest resData:  " + resData)
        dispatch({ type: SIGNUP })
    }
}