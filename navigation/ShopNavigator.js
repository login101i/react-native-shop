

import React from 'react'
import { Platform, SafeAreaView, Button, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
// import { createAnimatedSwitchNavigator} from 'react-navigation-animated-switch-navigator'
import { createSwitchNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'



import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import CartScreen from '../screens/shop/CartScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/shop/AuthScreen'
import StartUpScreen from '../screens/StartUpScreen'
import Colors from '../constants/Colors'
import * as AuthActions from '../store/actions/auth'




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
    },
    contentComponent: props => {

        const dispatch = useDispatch()
        return <View style={{ flex: 1, paddingVertical: 27, alignItems: 'center' }}>
            <SafeAreaView
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <DrawerNavigatorItems  {...props} />
                <View style={{ width: 244, marginTop: 44 }}>
                    <Button
                        title="wyloguj"
                        color={Colors.third}
                        onPress={() => {
                            dispatch(AuthActions.logout())
                            // props.navigation.navigate('Auth')
                            // ukrywam tę linię bo po kliknięciu na button resetuję czas i w NavigationContainer samo przenosi mnie na stronę Auth
                        }}
                    />
                </View>

            </SafeAreaView>
        </View>


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
    Start: StartUpScreen,
    Auth: AuthNavigator,
    Shop: SidebarNavigator,

})

// _______________________________________________
export default createAppContainer(MainNavigator)