

import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
// import {composeWithDevTools} from 'redux-devtools-extension'

import productReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders'
import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer,
  orders:orderReducer
})

const store = createStore(rootReducer)

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}







export default function App() {
  const [uploadFonts, setUploadFonts] = useState(false)

 if (!uploadFonts) return <AppLoading startAsync={fetchFonts} onFinish={() => setUploadFonts(true)} />

 return(
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
 )
}




const styles = StyleSheet.create({})
