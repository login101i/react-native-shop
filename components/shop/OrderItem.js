import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native'
import Colors from '../../constants/Colors'

import CartItem from './CartItem'

export default function OrderItem(props) {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <>
            <View style={styles.order}>
                <View style={styles.summary}>
                    <Text style={styles.totalAmount}>{props.amount.toFixed(2)} zł</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>
                <TouchableNativeFeedback useForeground style={styles.button}
                    onPress={() => {
                        setShowDetails(prevState => !prevState)
                        }}
                >
                    <Text style={[styles.buttonText, {backgroundColor:showDetails? "#888":Colors.primary}]}>{showDetails?'Ukryj':"Pokaż szczegóły"}</Text>
                </TouchableNativeFeedback>
                {showDetails &&
                    <View style={styles.orderItem}>
                        {props.items.map(cartItem => <CartItem
                            key={cartItem.productId}
                            qty={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.productTitle} />
                        )}
                    </View>
                }


            </View>

        </>
    )
}

const styles = StyleSheet.create({

    order: {
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        margin: 20,
        padding: 14,
        elevation: 5,
        borderRadius: 3,
        backgroundColor:'white'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    data: {
        fontSize: 16,
        color: "#888",
        fontFamily: 'open-sans'
    },
    button: {
        width: '90%',

    },
    buttonText: {
        backgroundColor: Colors.primary,
        width: '100%',
        textAlign: 'center',
        padding: 7,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    
    orderItem:{
        width:'100%'
    }

})