// export const SIGNUP = 'SIGNUP'
// export const SIGNIN = 'SIGNIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

import { AsyncStorage } from 'react-native';

// _____________________Logowanie poprzez Storage_________________________

export const authenticate = (userId, token, expiryTime) => {
    // element czasu - ostanie video

    return dispatch => {
        dispatch(setLogOutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE, userId: userId, token: token })
    }
    // element czasu - ostanie video
    return
}

// ______________________________________________

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
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = "błąd"
            if (errorId === 'EMAIL_EXISTS') {
                message = "Email jest już zajęty."
            }
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)
        dispatch(authenticate(
            resData.localId,
            resData.token,
            parseInt(resData.expiresIn) * 1000,
        ))

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveData(resData.idToken, resData.localId, expirationDate)
    }
}
// ___________________________________________
export const signin = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBP3Qjhim7iREPosbZmiNGt6itgu3NgUlI'
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
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = "Nie mogliśmy znaleźć takiego aderesu email"
            } else if (errorId === 'INVALID_PASSWORD') {
                message = "Nieprawidłowe hasło"
            } else if (errorId === 'INVALID_EMAIL') {
                message = "Nieprawidłowy email"
            }
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)
        dispatch(authenticate(
            resData.localId,
            resData.token,
            parseInt(resData.expiresIn) * 1000
        ))


        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveData(resData.idToken, resData.localId, expirationDate)
    }
}

const saveData = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}

// _____________________wylogowanie_________________

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return { type: LOGOUT }
}

// ________ ustwienie czasu_____

let timer

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }

}


const setLogOutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}
// popraw czas wylogowania automatycznego 
