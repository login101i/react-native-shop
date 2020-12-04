

import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
// import { createAnimatedSwitchNavigator} from 'react-navigation-animated-switch-navigator'
import { createSwitchNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'



import { Platform } from 'react-native'


import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import CartScreen from '../screens/shop/CartScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/shop/AuthScreen'
import Colors from '../constants/Colors'



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

// _______________________________________________

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,

}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name="md-apps"
            size={23}
            color={drawerConfig.titnColor}
        />

    },
    defaultNavigationOptions: defaultOptions
})
// _______________________________________________

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name="md-list"
            size={23}
            color={drawerConfig.titnColor}
        />

    },
    defaultNavigationOptions: defaultOptions
})

// _______________________________________________
const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name="md-create"
            size={23}
            color={drawerConfig.titnColor}
        />

    },
    defaultNavigationOptions: defaultOptions
})
// _______________________________________________




const SidebarNavigator = createDrawerNavigator({
    Products: {
        screen: ProductsNavigator,
        navigationOptions: {
            drawerLabel: 'Produkty'
        }
    },
    Order: {
        screen: OrdersNavigator,
        navigationOptions: {
            drawerLabel: 'Twoje zamówienie'
        }
    },
    Admin: {
        screen: AdminNavigator,
        navigationOptions: {
            drawerLabel: 'Admin'
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})
// _______________________________________________

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen

}, {
    defaultNavigationOptions: defaultOptions
})

// _______________________________________________

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: SidebarNavigator
})

// _______________________________________________
export default createAppContainer(MainNavigator)