import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'



export default function OrdersScreen() {
    const orders = useSelector(state => state.orders.orders)
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
        />
    )
}


OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle:"Twoje zamówienie",
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
