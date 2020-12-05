import React, { useEffect } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../store/actions/auth'

const StartUpScreen = props => {

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            const transformedData = JSON.parse(userData)
            if (!userData) {
                props.navigation.navigate("Auth")
                return
            }
            const { token, userId, expiryDate } = transformedData
            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return
            }

            // element czasu-ostatnie video
            const expirationTime = expirationDate.getTime() - new Date().getTime()
            // element czasu-ostatnie video

            props.navigation.navigate("Shop")
            dispatch(AuthActions.authenticate(
                userId,
                token,
                expirationTime
            ))

        }
        tryLogin()
    })


    return <View style={styles.container}>
        <ActivityIndicator style={styles.screen} size="large" color="green" />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartUpScreen