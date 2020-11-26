


import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/products'

export default function EditProductScreen(props) {

    const productId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(item => item.id === productId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState()
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')


    const dispatch = useDispatch()






    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productActions.updateProduct(productId, title, description, imageUrl))

        } else {
            dispatch(productActions.createProduct(title, imageUrl, description, +price))
        }
        props.navigation.goBack()
    }, [dispatch, title, imageUrl, description, price])










    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])


    return (
        <ScrollView>
            <View style={styles.formControl}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Tytuł</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>ImgUrl</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {!editedProduct && <View style={styles.formControl}>
                    <Text style={styles.label}>Cena</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text)}
                    />
                </View>
                }

                <View style={styles.formControl}>
                    <Text style={styles.label}>Opis</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>

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
    formControl: {
        width: '100%',
        padding: 10,


    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#888',
        borderBottomEndRadius: 6,

    }
})