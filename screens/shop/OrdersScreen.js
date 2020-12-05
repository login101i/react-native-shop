
import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import OrderItem from '../../components/shop/OrderItem'
import DefaultText from '../../components/shop/DefaultText'
import * as ordersActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'



export default function OrdersScreen(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
  

    const orders = useSelector(state => state.orders.orders)
   

    // if (orders.length === 0) {
    //     return (
    //         <View style={styles.screen}>
    //             <Text style={styles.text}>Nie masz żadnych zamówień.</Text>
    //         </View>
    //     )
    // }
    // ____________________________________

    const dispatch = useDispatch()

    const loadOrders = useCallback(async () => {
        setError(null)
        // setIsRefreshing(true)
        try {
            await dispatch(productsActions.fetchOrders())
        } catch (err) {
            setError(true)
        }
        // setIsRefreshing(false)

    }, [dispatch, setIsLoading, setError])
    // _________________________________

    useEffect(() => {
        // To Listener, który ładuje produkty kiedy chodzimy po Navigacji Drawera
        const willFocusSub = props.navigation.addListener('willFocus', loadOrders)

        return () => {
            willFocusSub.remove()
            // odwołuje substkrypcje kiedy jest odmontowany ten komponent
        }
    }, [loadOrders])

    // _________________________________


    useEffect(() => {
        setIsLoading(true)
        loadOrders().then(() =>
            setIsLoading(false)
        )
    }, [dispatch])
    // ____________________________________


    if (!isLoading && orders.length === 0) {
        return (
            <View style={styles.textEmpty} >
                <Text style={{ color: Colors.third, fontSize: 23 }}>Brak zamówień.</Text>

            </View>
        )
    }

    // ____________________________________

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Coś poszło nie tak po stronie serwera.</Text>
                <View style={{ marginTop: 22 }}>
                    <Button
                        color={Colors.third}
                        title="Spróbuj ponownie"
                        onPress={loadOrders}
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

    return (
        <View >
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={itemData => <OrderItem
                    amount={itemData.item.totalAmount}
                    items={itemData.item.items}
                    date={itemData.item.readableDate}
                />}
            />



        </View>
    )
}



OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Twoje zamówienie",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName="md-menu"
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',



    },
    text: {
        fontSize: 22,
        fontFamily: 'open-sans-bold'

    },
    textEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})

