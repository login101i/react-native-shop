
import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import OrderItem from '../../components/shop/OrderItem'
import DefaultText from '../../components/shop/DefaultText'


export default function OrdersScreen() {

    const orders = useSelector(state => state.orders.orders)
    if (orders.length > 22) setShowOrders(true)

    if (orders.length === 0) {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>Nie masz żadnych zamówień.</Text>
            </View>
        )
    }


    return (
        <View >
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={itemData => <OrderItem
                    amount={itemData.item.totalAmount}
                    items={itemData.item.items}
                    date={itemData.item.readableDate}
                />}
            />



        </View>
    )
}



OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Twoje zamówienie",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName="md-menu"
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',



    },
    text: {
        fontSize: 22,
        fontFamily: 'open-sans-bold'

    }
})

