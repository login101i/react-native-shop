import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import { useDispatch } from 'react-redux'
import { SimpleAnimation } from 'react-native-simple-animations'


import OrderItem from '../../components/shop/OrderItem'

import * as OrdersActions from '../../store/actions/orders'



export default function OrdersScreen() {
    const orders = useSelector(state => state.orders.orders)
    console.log('cardScreen')

    const dispatch = useDispatch()

    return (
        <>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={itemData => <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />}
            />
            <Button
                title="wyczyść zamówienie"
                onPress={() => dispatch(OrdersActions.clearOrder())}
            />
       
        </>
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
const styles = StyleSheet.create({})
