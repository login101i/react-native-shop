// import React, { useEffect } from 'react'
// import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
// import { useSelector, useDispatch } from 'react-redux'

// import ProductItem from '../../components/shop/ProductItem'
// import * as cartActions from '../../store/actions/cart'

// import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
// import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
// import CartScreen from '../../screens/shop/CartScreen'
// import Colors from '../../constants/Colors'




// export default function ProductsOverviewScreen(props) {

//     const products = useSelector(state => state.products.availableProducts)
//     // const itemId = props.navigation.getParam


//     const dispatch = useDispatch()
//     // const toggleAddToCart = (itemData) => {
//     //     dispatch(cartActions.addToCart(itemData.item))
//     // }


//     const selectItemHandler = (id, title) => {
//         props.navigation.navigate('ProductDetail',
//             {
//                 productId: id,
//                 productTitle: title
//             })

//     }


//     return (
//         <View style={styles.screen}>
//             <FlatList
//                 style={{ backgroundColor: 'white' }}
//                 data={products}
//                 keyExtractor={(item, index) => item.id}
//                 renderItem={itemData => <ProductItem
//                     showButton
//                     image={itemData.item.imageUrl}
//                     title={itemData.item.title}
//                     price={itemData.item.price}
//                     onSelect={() => {
//                         selectItemHandler(itemData.item.id, itemData.item.title)
//                     }}

//                 >
//                     <Button
//                         color={Colors.primary}
//                         title="Szczegóły"
//                         onPress={() =>
//                             selectItemHandler(itemData.item.id, itemData.item.title)
//                         }
//                     />
//                     <Text>Hello</Text>

//                     <Button
//                         color="green"
//                         title="Do koszykaaaaaa"
//                         onPress={() => dispatch(cartActions.addToCart(itemData.item))
//                         }
//                     />

//                 </ProductItem>}
//             />
//         </View>
//     )
// }

// ProductsOverviewScreen.navigationOptions = navData => {

//     return {
//         headerTitle: 'Wszystkie produkty',
//         // headerLeft: (
//         //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//         //         <Item
//         //             title="Menu"
//         //             iconName="md-menu"
//         //             onPress={() => { navData.navigation.toggleDrawer() }}
//         //         />
//         //     </HeaderButtons>
//         // ),
//         headerRight:()=> (
//             <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//                 <Item
//                     title="Cart"
//                     iconName="md-cart"
//                     onPress={() => { navData.navigation.navigate('Cart') }}
//                 />
//             </HeaderButtons>
//         )
//     }
// }


// const styles = StyleSheet.create({
//     screen: {

//     }
// })


import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'



export default function ProductsOverviewScreen(props) {


    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()
    return (
        <View>

            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <ProductItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onViewDetail={() => {
                            props.navigation.navigate("ProductDetail", {
                                productId: itemData.item.id,
                                ProductTitle: itemData.item.title
                            })
                        }}
                        onAddToCart={() => { dispatch(cartActions.addToCart(itemData.item)) }}
                    />
                )}
            />
        </View>
    )
}
ProductsOverviewScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Wszystkie produkty',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName="md-cart"
                    onPress={() => {
                        navData.navigation.navigate("Cart")
                    }}
                />
            </HeaderButtons>
        )
    }
}



const styles = StyleSheet.create({})
