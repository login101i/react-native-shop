// import React, { useState, useEffect, useCallback } from 'react'
// import { StyleSheet, Text, TextInput, ScrollView,  View } from 'react-native'

// import CustomHeaderButton from '../../components/shop/UI/CustomHeaderButton'
// import { HeaderButtons, Icon, Item } from 'react-navigation-header-buttons'
// import { useSelector, useDispatch } from 'react-redux'
// import * as productsActions from '../../store/actions/products'



// export default function EditProductScreen(props) {
//     const prodId = props.navigation.getParam('productId')
//     const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))



//     const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
//     const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
//     const [price, setPrice] = useState()
//     const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

//     const dispatch = useDispatch()

//     const submitHandler = useCallback(() => {
//         if (editedProduct) {
//             dispatch(productsActions.updateProduct(prodId, title, description, imageUrl))
//         } else {
//             dispatch(productsActions.createProduct(title, description, imageUrl, +price))
//         }

//         props.navigation.goBack()

//     }, [dispatch, prodId, title,description, price, imageUrl ])

//     useEffect(() => {
//         props.navigation.setParams({ submit: submitHandler })
//     }, [submitHandler])

   
//     return (
//         <ScrollView>
//             <View style={styles.form}>

//                 <View style={styles.formControl}>
//                     <Text style={styles.label}>TYTUŁ</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={title}
//                         onChangeText={text => setTitle(text)}
//                     />
//                 </View>
//                 <View style={styles.formControl}>
//                     <Text style={styles.label}>IMAGE URL</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={imageUrl}
//                         onChangeText={text => setImageUrl(text)}

//                     />
//                 </View>
//                 {!editedProduct && <View style={styles.formControl}>
//                     <Text style={styles.label}>PRICE</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={price}
//                         onChangeText={text => setPrice(text)}

//                     />
//                 </View>}
//                 <View style={styles.formControl}>
//                     <Text style={styles.label}>Opis produktu:</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={description}
//                         onChangeText={text => setDescription(text)}

//                     />
//                 </View>

//             </View>
//         </ScrollView>

//     )
// }

// EditProductScreen.navigationOptions = navData => {

//     const submitFn = navData.navigation.getParam('submit')
//     return {
//         headerTitle: navData.navigation.getParam('productId') ? "Edytuj produkt" : "Dodaj Produkt",
//         headerRight: (
//             <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//                 <Item
//                     title="Save"
//                     iconName="md-checkmark"
//                     onPress={submitFn}
//                 />
//             </HeaderButtons>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     form: {
//         margin: 22,
//     },
//     formControl: {
//         width: '100%',


//     },
//     label: {
//         fontFamily: 'open-sans-bold',
//         marginVertical: 8,
//     },
//     input: {
//         paddingHorizontal: 2,
//         paddingVertical: 5,
//         borderBottomWidth: 1,
//         borderBottomColor: '#888',
//         borderBottomEndRadius: 6,

//     }
// })
