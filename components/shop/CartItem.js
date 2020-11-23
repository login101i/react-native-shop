import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function CartItem(props) {
    return (
        <View style={styles.cardItem}>
            <Text style={styles.item}>
                <Text style={styles.quantity}>{props.qty}</Text>
                <Text style={styles.mainText}
                    numberOfLines={1}
                > {props.title}</Text>
            </Text>
            <View style={styles.razem}>
                <Text style={styles.mainText}>  {props.amount.toFixed(2)}  </Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons
                        name="md-trash"
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onAddOne}>
                    <Ionicons
                        name="md-add"
                        size={23}
                        color='blue'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardItem: {


        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 5,



    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    quantity: {
        fontFamily: 'open-sans-bold',
        color: '#888',
        fontSize: 20,

    },
    mainText: {
        fontSize: 14,
        fontFamily: 'open-sans-bold',


    },
    deleteButton: {
        marginHorizontal: 22
    },
    razem: {
        flexDirection: 'row'
    }


})
