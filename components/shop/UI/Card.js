import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Card(props) {
    return (
        <View style={{...styles.card, ...props.style}}>
           {props.children}
        </View>
    )
}

const styles = StyleSheet.create({

    card:{
        elevation: 12,
        borderRadius: 11,
        backgroundColor: 'white',
        margin: 20,

        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    }
})
