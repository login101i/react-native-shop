// import React from 'react'

// import { createAppContainer } from 'react-navigation'
// import { Platform } from 'react-native'
// import { createStackNavigator } from 'react-navigation-stack'
// import { createDrawerNavigator } from 'react-navigation-drawer'
// import { Ionicons } from '@expo/vector-icons'


// import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
// import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
// import CartScreen from '../screens/shop/CartScreen'
// import Colors from '../constants/Colors'
// import Orders from '../screens/shop/OrdersScreen'
// import OrdersScreen from '../screens/shop/OrdersScreen'
// import UserProductsScreen from '../screens/user/UserProductsScreen'
// import EditProductScreen from '../screens/user/EditProductScreen'




// const defaultOptions = {
//     headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? Colors.primary : '',

//     },
//     headerTitleStyle: {
//         fontFamily: 'open-sans-bold',
//     },
//     headerBackTitleStyle: {
//         fontFamily: 'open-sans'
//     },
//     headerTintColor: Platform.OS === 'android' ? 'white' : 'purple'
// }
// // __________________________________________

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,

// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name='md-cart'
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultOptions
// })
// // __________________________________________

// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name='md-list'
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultOptions
// })
// // __________________________________________


// const AdminNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name='md-create'
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultOptions
// })

// // __________________________________________


// const ShopNavigator = createDrawerNavigator({
//     Products: {
//         screen: ProductsNavigator,
//         navigationOptions: {
//             drawerLabel: "Produkty"
//         }
//     },
//     Order: {
//         screen: OrdersNavigator,
//         navigationOptions: {
//             drawerLabel: "Twoje zamówienie"
//         }
//     },
//     Admin: {
//         screen: AdminNavigator,
//         navigationOptions: {
//             drawerLabel: "Admin"
//         }
//     }
// }, {
//     contentOptions: {
//         activeTintColor: "green"
//     }
// })

// export default createAppContainer(ShopNavigator)

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Platform } from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
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

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,

},{
    defaultNavigationOptions: defaultOptions
})

export default createAppContainer(ProductsNavigator)