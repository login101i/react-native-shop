


import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/products'
import Input from '../../components/shop/UI/Input'
import { Colors } from 'react-native/Libraries/NewAppScreen'






// ______________________________________________________________
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
        console.log("To jest to czego szukam= " + updatedFormIsValid)


        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
            console.log("To jest to cz ego szukam= " + updatedFormIsValid)

        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state
}
// ______________________________________________________________


export default function EditProductScreen(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()


    const productId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(item => item.id === productId))




    const dispatch = useDispatch()


    // ______________________________________________________________


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false

    },

    )

    // ______________________________________________________________


    // ______________________________________________________________

    const submitHandler = useCallback(async () => {

        console.log("---------------" + formState.formIsValid)
        if (!formState.formIsValid) {
            Alert.alert('Niepoprawna wartość', "Proszę poprawnie wypełnić formularz", [
                { text: 'OK' },
            ])


            return
        }

        // __________________-
        setError(null)
        setIsLoading(true)
        // ________________
        try {
            if (editedProduct) {
                await dispatch(productActions.updateProduct(
                    productId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,

                ))

            } else {
                console.log("Tworzę produkt")
                console.log(formState.inputValues.title)
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price,
                ))
            }
            props.navigation.goBack()

        } catch (err) {
            setError(err.message)
        }

        setIsLoading(false)
    }, [dispatch, productId, formState])

    useEffect(() => {
        if (error) {
            Alert.alert('Powstał błąd przy aktualizacji/tworzeniu produkut', error, [{
                text: 'okey'
            }])
        }
    }, [error])



    // _____
    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])




    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        // console.log("InputIdentifier= " + inputIdentifier)
        // console.log("inputValue= " + inputValue)
        // console.log("inputValidity= " + inputValidity)


        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    // _____________________________________________
    if (isLoading) {
        return (
            <View style={styles.indicator}>
                <ActivityIndicator size="small" color={Colors.primary} />
            </View>

        )
    }

    // _____________________________________________
    return (
        <KeyboardAvoidingView
            // style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="tytuł"
                        errorText="Niepoprawna wartość"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={editedProduct ? true : false}
                        required
                    />
                    <Input
                        id="imageUrl"
                        label="Link do obrazka"
                        errorText="Niepoprawna wartość URL"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={editedProduct ? true : false}
                        required

                    />
                    {editedProduct ? null : (
                        <Input
                            id="price"
                            label="Cena"
                            errorText="Niepoprawna cena"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}



                        />
                    )}

                    <Input
                        id="description"
                        label="description"
                        errorText="Proszę podać minimum 10 znaków."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={10}


                    />
                </View>
            </ScrollView >
        </KeyboardAvoidingView>

    )
}

EditProductScreen.navigationOptions = navData => {

    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? "Edytuj produkt" : "Dodaj Produkt",
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName="md-checkmark"
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    form: {
        margin: 22,
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})