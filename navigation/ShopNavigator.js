import { createAppContainer } from 'react-navigation'
import { Platform } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'

// __________________________________________

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.green : ''

        },
        headerTintColor: Platform.OS === 'android' ? 'white' : 'purple'
    }
})
// __________________________________________


export default createAppContainer(ProductsNavigator)