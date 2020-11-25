// import { StatusBar } from 'expo-status-bar';
// import React, {useEffect, useState} from 'react';
// import { createStore, combineReducers } from 'redux'
// import { Provider } from 'react-redux'
// import { AppLoading } from 'expo'
// import * as Font from 'expo-font'
// import {composeWithDevTools} from 'redux-devtools-extension'


// import productReducer from './store/reducers/products'
// import ShopNavigator from './navigation/ShopNavigator'
// import ordersReducer from './store/reducers/orders'

// import cartReducer from './store/reducers/cart'


// const rootReducer = combineReducers({
//   products: productReducer,
//   cart:cartReducer,
//   orders:ordersReducer
// })
// const store = createStore(rootReducer)

// const fetchFonts=()=>{
//   return Font.loadAsync({
//     'open-sans' : require ('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
//   })
// }


// export default function App() {
//   const [fontLoaded, setFontLoaded] = useState(false)

// if(!fontLoaded) return <AppLoading startAsync={fetchFonts}
//  onFinish={()=>setFontLoaded(true)}/>

//   return (
//     <Provider store={store}>
//       <ShopNavigator />
//     </Provider>
//   );
// }

import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
// import {composeWithDevTools} from 'redux-devtools-extension'

import productReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer
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
