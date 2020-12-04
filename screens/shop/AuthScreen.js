import React, { useReducer, useCallback } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Button } from 'react-native'
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

    // ______________________________________________________________
    console.log('To moje dane: ' + formState.inputValues.email, formState.inputValues.password)
    const signupHandler = () => {
        dispatch
            (authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password))
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
                            <Button
                                title="zaloguj się"
                                color={Colors.third}
                                onPress={signupHandler}
                            />
                        </View>
                        <View>
                            <Button
                                title="Zarejestruj się"
                                color={Colors.third}
                            // onPress={signupHandler}

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
