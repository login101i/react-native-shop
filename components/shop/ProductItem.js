import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native'

import Card from './UI/Card'


import Colors from '../../constants/Colors'

export default function ProductItem(props) {


    let Touchable = TouchableOpacity
    if (Platform.OS == 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback
    }
    return (
        <Card style={styles.product}>


            <Touchable onPress={props.onSelect} useForeground >
                <View>
                    <Image style={styles.image} source={{ uri: props.image }} />
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>{props.price.toFixed(2)} zl</Text>
                    </View>

                    <View style={styles.action}>
                        {props.children}

                    </View>
                </View>


            </Touchable>
        </Card>



    )
}

const styles = StyleSheet.create({
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: '15%',
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    details: {
        alignItems: 'center',
        height: '15%',
        justifyContent: 'center'
        // padding: 10

    },
    image: {
        width: '100%',
        height: '70%',
    },
    product: {

        height: 300,
        overflow: 'hidden'
    },
    title: {
        fontSize: 18,
        marginVertical: 3,
        fontFamily: 'open-sans-bold',
    },
    price: {
        fontSize: 15,
        color: "#888",
        fontFamily: 'open-sans-bold',

    }
})
