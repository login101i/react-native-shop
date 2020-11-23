import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'




export default function CartScreen() {


    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
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
    console.log(cartItems)

    const dispatch = useDispatch()
    const toggleDeleteItem = (itemData) => {
        dispatch(cartActions.removeFromCart(itemData.item.productId))
    }
    const toggleAddOneItem=(itemData)=>{
        dispatch(cartActions.addOne(itemData.item.productId))
    }

    return (
        <>
            <View style={styles.screen}>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Razem</Text><Text style={styles.amount}>{cartTotalAmount.toFixed(2)}zł</Text>
                    <Button
                        color={Colors.primary}
                        title="zamów teraz"
                        disabled={cartItems.length === 0}
                    />
                </View>


                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => (
                        <CartItem
                            qty={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            onRemove={() => toggleDeleteItem(itemData)}
                            onAddOne={()=>toggleAddOneItem(itemData)}
                        />
                    )
                    }
                />
            </View>
        </>
    )
}

CartScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Koszyk',

    }
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
        // borderWidth:2,
        // borderColor:'red',

        marginBottom: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,

        padding: 14,
        elevation: 5,
        borderRadius: 3,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,

    },

})
