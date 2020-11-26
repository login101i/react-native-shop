

import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/shop/UI/Card'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartItemsActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'



export default function CartScreen(props) {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    console.log(cartTotalAmount)

    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);

    })

    const dispatch = useDispatch()


    return (
        <Card style={styles.screen}>
            <View style={styles.summary}>

                <Text>Razem:</Text>
                <Text>{Math.round(cartTotalAmount.toFixed(2)*100)/100} zł</Text>
                <Button
                 title="zamów teraz" color={Colors.primary} disabled={cartTotalAmount === 0} 
                 onPress={()=>{dispatch(orderActions.addOrder(cartItems,cartTotalAmount))}}
                 />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem
                    qty={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    showIcon
                    onRemove={() => { dispatch(cartItemsActions.deleteFromCart(itemData.item.productId)) }}
                    onAddOne={() => { dispatch(cartItemsActions.addOneToCart(itemData.item.productId))}}
                />}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    amount: {
        color: Colors.primary,
        fontSize: 20,
    },
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,

    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,

    },
})
