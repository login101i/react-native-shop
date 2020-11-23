import React from 'react'

import { createAppContainer } from 'react-navigation'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'


import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import Colors from '../constants/Colors'
import Orders from '../screens/shop/OrdersScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'



const defaultOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',

    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : 'purple'
}
// __________________________________________

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,

}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name='md-list'
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultOptions
})
// __________________________________________

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name='md-list'
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultOptions
})
// __________________________________________

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    order: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: "green"
    }
})

export default createAppContainer(ShopNavigator)