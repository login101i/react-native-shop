import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import {useSelector } from 'react-redux'

export default function ProductsOverview() {

const products=useSelector(state=>state.products.availableProducts)

    return (
        <View style={styles.screen}>
            <FlatList 
            data={products}
            keyExtractor={(item, index)=>item.id}
                renderItem={itemData => <Text>{itemData.item.title}</Text>}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        padding:10
    }
})
