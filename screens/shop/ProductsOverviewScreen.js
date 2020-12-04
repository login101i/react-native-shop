
import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import Colors from '../../constants/Colors'



export default function ProductsOverviewScreen(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isRefreshing, setIsRefreshing] = useState(false)


    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (err) {
            setError(true)
        }
        setIsRefreshing(false)

    }, [dispatch, setIsLoading, setError])
    // _________________________________

    useEffect(() => {
        // To Listener, który ładuje produkty kiedy chodzimy po Navigacji Drawera
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts)

        return () => {
            willFocusSub.remove()
            // odwołuje substkrypcje kiedy jest odmontowany ten komponent
        }
    }, [loadProducts])

    // _________________________________


    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() =>
            setIsLoading(false)
        )
    }, [dispatch])

    const onDetailHandler = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            ProductTitle: title
        })
    }

    const onAddToCartHandler = (item) => {

        dispatch(cartActions.addToCart(item))
    }
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Coś poszło nie tak po stronie serwera.</Text>
                <View style={{ marginTop: 22 }}>
                    <Button
                        color={Colors.third}
                        title="Spróbuj ponownie"
                        onPress={loadProducts}
                    />

                </View>

            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.textEmpty} >
                <Text style={{ color: Colors.third, fontSize: 23 }}>Brak produktów.</Text>

            </View>
        )
    }

    return (
        <View>

            <FlatList
                onRefresh={loadProducts}
                refreshing={isRefreshing}
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
                            color={Colors.third}
                            onPress={() => { onDetailHandler(itemData.item.id, itemData.item.title) }}
                        />
                        <Button
                            title='Do koszyka'
                            color={Colors.third}
                            onPress={() => onAddToCartHandler(itemData.item)}
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
    textEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})
