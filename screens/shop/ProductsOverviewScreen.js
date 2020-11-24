import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'

import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
import CartScreen from '../../screens/shop/CartScreen'




export default function ProductsOverviewScreen(props) {

    const products = useSelector(state => state.products.availableProducts)
    const itemId = props.navigation.getParam


    const dispatch = useDispatch()
    const toggleAddToCart = (itemData) => {
        dispatch(cartActions.addToCart(itemData.item))
    }



    return (
        <View style={styles.screen}>
            <FlatList
                style={{ backgroundColor: 'white' }}
                data={products}
                keyExtractor={(item, index) => item.id}
                renderItem={itemData => <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail',
                            {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            })

                    }}
                    onAddToCart={() => toggleAddToCart(itemData)}
                />}
            />
        </View>
    )
}

ProductsOverviewScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Wszystkie produkty',
        headerLeft:(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="md-menu"
                    onPress={() => { navData.navigation.toggleDrawer()}}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName="md-cart"
                    onPress={() => {navData.navigation.navigate('Cart')}}
                />
            </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    screen: {

    }
})
