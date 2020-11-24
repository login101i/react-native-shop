import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function CartItem(props) {
    return (
        <View style={styles.cardItem}>
            <Text style={styles.item}>
                <Text style={styles.quantity}>{props.qty}x</Text>
                <Text style={styles.mainText}
                    numberOfLines={1}
                > {props.title}</Text>
            </Text>
            <View style={styles.razem}>
                <Text style={styles.mainText}>  {props.amount.toFixed(2)}  </Text>
                {props.showIcon &&<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons
                        name="md-trash"
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>}
                {props.showIcon && <TouchableOpacity onPress={props.onAddOne}>
                    <Ionicons
                        name="md-add"
                        size={23}
                        color='blue'
                    />
                </TouchableOpacity>}
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
        alignItems:'center',
        marginHorizontal: 5,
        marginBottom:25,
        marginVertical: 5,
        alignItems:'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,




    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      


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
        flexDirection: 'row',
        alignItems:'flex-end'
    }


})
