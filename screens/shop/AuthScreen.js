import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Input from '../../components/shop/UI/Input'
import Card from '../../components/shop/UI/Card'
import Colors from '../../constants/Colors'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth'


// ___________________form  reducer_____________________

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value

        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        // console.log("To jest to czego szukam= " + updatedFormIsValid)


        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
            // console.log("To jest to cz ego szukam= " + updatedFormIsValid)

        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state
}

export default function AuthScreen(props) {
    const [isSignup, setIsSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const dispatch = useDispatch()





    // ___________________use reducer_____________________

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false

    },
    )
    // _____________ error message________________________

    useEffect(() => {
        if (error) {
            Alert.alert("Wystąpił błąd", error, [{
                text: 'ok'
            }])
        }
    }, [error])


    // _____________________________________


    // ______________________________________________________________
    console.log('To moje dane: ' + formState.inputValues.email, formState.inputValues.password)
    const authHandler = async () => {
        // if (formState.inputValues.password.length===0) {
        //     setError(true)
        //     console.log("jest błąd")
        // }
        if (isSignup) {
            setError(null)
            setIsLoading(true)
            try {
                await dispatch
                    (authActions.signup(
                        formState.inputValues.email,
                        formState.inputValues.password))
            } catch (err) {
                setError(err.message)
            }
            setIsLoading(false)
        } else {
            setError(null)
            setIsLoading(true)
            try {
                await dispatch
                    (authActions.signin(
                        formState.inputValues.email,
                        formState.inputValues.password))
                props.navigation.navigate('Shop')

            } catch (err) {
                setError(err.message)
            }
            setIsLoading(false)
        }

    }
    // _____________________________________
    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })

    }, [dispatchFormState])
    // _____________________________________


    // _____________________________________



    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={10} style={styles.screen}>
            <LinearGradient
                colors={['#AC33C8', '#ff4433']}
                style={styles.linearGradient}
            >
                <View style={styles.container}>
                    <Card style={styles.card}>
                        <View>
                            <Input
                                id="email"
                                label="E-mail"
                                errorText="Proszę wpisać poprawny adres"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onInputChange={inputChangeHandler}
                                initialValue=""
                                required
                                email
                                autoCapitalize="none"
                            />
                            <Input
                                id="password"
                                label="hasło"
                                errorText="Niepoprawne hasło"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry
                                onInputChange={inputChangeHandler}
                                initialValue=""
                                required
                                minLength={6}
                            />
                        </View>
                        <View style={{ marginVertical: 21 }}
                        >
                            {isLoading ? <ActivityIndicator size="small" color="green" /> : <Button
                                title={isSignup ? "Zarejestruj się" : "Zaloguj się"}
                                color={Colors.third}
                                onPress={authHandler}
                            />
                            }
                        </View>
                        <View>
                            <Button
                                title={`Przełącz na ${isSignup ? "logowanie" : "rejestrację"}`}
                                color={Colors.third}
                                onPress={() => { setIsSignup(prevState => !prevState) }}
                            />
                        </View>

                    </Card>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>

    )
}

AuthScreen.navigationOptions = {
    headerTitle: "Autoryzacja"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    card: {
        padding: 22,
        maxWidth: '80%',
        minWidth: '75%',
        minHeight: '66%',
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
