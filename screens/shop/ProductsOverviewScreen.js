
import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'



export default function ProductsOverviewScreen(props) {


    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const onDetailHandler = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            ProductTitle: title
        })
    }

    const onAddToCartHandler = (item) => {

        dispatch(cartActions.addToCart(item))
    }
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
                        onSelect={() => {
                            onDetailHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <Button
                            title='Szczegóły'
                            onPress={() => { onDetailHandler(itemData.item.id, itemData.item.title) }}
                        />
                        <Button
                            title='Do koszyka'
                            onPress={()=>onAddToCartHandler(itemData.item)}
                        />
                    </ProductItem>
                )}
            />
        </View>
    )
}
ProductsOverviewScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Wszystkie produkty',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName="md-cart"
                    onPress={() => {
                        navData.navigation.navigate("Cart")
                    }}
                />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName="md-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        )
    }
}





const styles = StyleSheet.create({

})
