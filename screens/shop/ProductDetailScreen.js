

import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Image} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

export default function ProductDetailScreen(props) {

    const productId = props.navigation.getParam('productId')
    const selectedProduct=useSelector(state=>state.products.availableProducts.find(product=>product.id===productId))

    const dispatch=useDispatch()


    return (
        <ScrollView style={styles.container}>
            <Image  style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.action}>
                <Button
                    color={Colors.primary}
                    title="Dodaj do koszyka"
                    onPress={() =>{ dispatch(cartActions.addToCart(selectedProduct))}}
                />
            </View>
            <Text style={styles.price}>{selectedProduct.price} zł</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions=navData=>{
    return{
        headerTitle:navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    action: {
        // width: "50%",
        alignItems: 'center',
        marginVertical: 20,
        marginTop:30,

    },

    description: {
        fontSize: 14,
        textAlign: 'center',
        padding: 10,
    },
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: 'center',
        marginVertical: 15,
        fontFamily: 'open-sans-bold',

    }
})


