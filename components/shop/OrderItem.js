import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native'
import Colors from '../../constants/Colors'

import CartItem from './CartItem'
import Card from './UI/Card'

export default function OrderItem(props) {
    const [showDetail, setShowDetail] = useState(false)
    return (
        <>
            <Card style={styles.order}>
                <View style={styles.summary}>
                    <Text style={styles.totalAmount}>{props.amount.toFixed(2)} zł</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>
                <View style={styles.button}>

                    <Button title={showDetail ? 'Ukryj' : "zobacz szczegóły"}
                        onPress={() => setShowDetail(prevState => !prevState)}
                        color={Colors.primary}
                    />

                </View>
                {showDetail && <View style={styles.details}>
                    {props.items.map(item => <CartItem
                        key={item.productId}
                        qty={item.quantity}
                        title={item.productTitle}
                        amount={item.sum}

                    />)}
                </View>}


            </Card>

        </>
    )
}

const styles = StyleSheet.create({

    order: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
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

    details: {
        width: '100%',
    }

})
