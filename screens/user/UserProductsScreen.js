import React from 'react'
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector } from 'react-redux'
import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
import Colors from '../../constants/Colors'
import { useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/products'

export default function UserProductsScreen(props) {

    const userProducts = useSelector(state => state.products.userProducts)

    const dispatch = useDispatch()

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id })
    }


    const deleteHandler = (id) => {
        Alert.alert('Na pewno?', "Czy na pewno chcesz usunąć ten element?", [
            { text: 'Nie', style: 'default' },
            {
                text: 'Tak', style: 'destructive', onPress: () => {
                    dispatch(productsActions.deleteProduct(id))
                }
            }
        ])
    }


    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => { editProductHandler(itemData.item.id) }}
            >
                <Button
                    color={Colors.primary}
                    title="Edytuj"
                    onPress={() => { editProductHandler(itemData.item.id) }}
                />
                <Button
                    color={Colors.primary}
                    title="usuń"
                    onPress={()=>{deleteHandler(itemData.item.id)}}
                />

            </ProductItem>}
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Twoje produkty',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="md-menu"
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add"
                    iconName="md-create"
                    onPress={() => { navData.navigation.navigate('EditProduct') }}
                />
            </HeaderButtons>
        )
    }
}



const styles = StyleSheet.create({})


// import React from 'react'
// import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
// import { useSelector, useDispatch } from 'react-redux'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons'

// import ProductItem from '../../components/shop/ProductItem'
// import * as cartActions from '../../store/actions/cart'
// import * as productActions from '../../store/actions/products'
// import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
// import Colors from '../../constants/Colors'


// export default function UserProductsScreen(props) {


//     const products = useSelector(state => state.products.userProducts)
//     const dispatch = useDispatch()


//     return (
//         <View>
//             <FlatList
//                 data={products}
//                 keyExtractor={item => item.id}
//                 renderItem={itemData => (
//                     <ProductItem
//                         // style={styles.product}
//                         image={itemData.item.imageUrl}
//                         title={itemData.item.title}
//                         price={itemData.item.price}
//                         onSelect={() => {
//                             props.navigation.navigate("ProductDetail", {
//                                 productId: itemData.item.id,
//                                 productTitle: itemData.item.title
//                             })
//                         }}
//                     >
//                         <Button
//                             color={Colors.primary}
//                             title="Edytuj"
//                             // onPress={() => { handleDelete(itemData.item.productId) }}
//                         />
//                         <Button
//                             color={Colors.primary}
//                             title="usuń"
//                             onPress={() => {dispatch(productActions.deleteProduct(itemData.item.id))}}/>
//                     </ProductItem>
//                 )}
//             />
//         </View>
//     )
// }

// UserProductsScreen.navigationOptions = navData => {
//     return {
//         headerTitle: "Twoje Produkty",
//         headerRight: (
//             <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//                 <Item
//                     title="Create"
//                     iconName="md-create"
//                     onPress={() => {
//                         navData.navigation.navigate("")
//                     }}
//                 />
//             </HeaderButtons>
//         ),
//         headerLeft: (
//             <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//                 <Item
//                     title="Menu"
//                     iconName="md-menu"
//                     onPress={() => {
//                         navData.navigation.toggleDrawer()
//                     }}
//                 />
//             </HeaderButtons>
//         )
//     }
// }
// ProductsOverviewScreen.navigationOptions = navData => {

//     return {
//         headerTitle: 'Wszystkie produkty',
//         headerRight: (
//             <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//                 <Item
//                     title="Cart"
//                     iconName="md-cart"
//                     onPress={() => {
//                         navData.navigation.navigate("Cart")
//                     }}
//                 />
//             </HeaderButtons>
//         ),
//         headerLeft: () => (
//             <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//                 <Item
//                     title="Cart"
//                     iconName="md-menu"
//                     onPress={() => {
//                         navData.navigation.toggleDrawer()
//                     }}
//                 />
//             </HeaderButtons>
//         )
//     }
// }





// const styles = StyleSheet.create({
//     product: {
//         height: '28%',
//     }
// })

