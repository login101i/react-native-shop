


import React, { useEffect, useCallback, useReducer } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, KeyboardAvoidingView } from 'react-native'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/products'
import Input from '../../components/shop/UI/Input'

export default function EditProductScreen(props) {

    const productId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(item => item.id === productId))




    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Niepoprawna wartość', "Proszę poprawnie wypełnić formularz", [
                { text: 'OK' },
            ])


            return
        }
        if (editedProduct) {
            dispatch(productActions.updateProduct(
                productId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,

            ))

        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price,
            ))
        }
        props.navigation.goBack()
    }, [dispatch, formState])


    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])



    // ______________________________________________________________
    const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

    const formReducer = (state, action) => {
        switch (action.type) {
            case FORM_INPUT_UPDATE:
                const updatedValues = {
                    ...state.inputValues,
                    [action.input]: action.value

                }
                const updatedValidities = {
                    ...state.inputValidities,
                    [action.input]: action.isValid
                }
                let updatedFormIsValid = true

                console.log(formIsValid)

                for (const key in updatedValidities) {
                    updatedFormIsValid = updatedFormIsValid && updatedValidities[key]

                    console.log(formIsValid)
                }
                return {
                    inputValues: updatedValues,
                    inputValidities: updatedValidities,
                    formIsValid: updatedFormIsValid
                }
        }
        return state
    }

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct : '',
            imageUrl: editedProduct ? editedProduct : '',
            description: editedProduct ? editedProduct : '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    })

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

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
                        id='title'
                        label="Tytuł"
                        errorText="Niepoprawna wartość"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id="imageUrl"
                        label="URL obrazu"
                        errorText="Niepoprawna wartość URL"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
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



                        />
                    )}

                    <Input
                        id="description"
                        label="Opis produktu"
                        errorText="Proszę określić opis."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required


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

})