import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import {NavigationActions} from 'react-navigation'

import ShopNavigator from './ShopNavigator'

export default function NavigationContainer() {
    const isAuth = useSelector(state => !!state.auth.token)
    const navRef = useRef()
    // używamy useRef bo tylko w komponentach używanych w ShopNavigator mamy dostęp do props.navigate


    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({routeName:'Auth'}))
            // dispatch jest możliwy dzięki ShopNavigator coś takiego
            // używamy ref aby dostać dię do właściwości elementu do którego przyczepiony jest ref-- to taka pijawaka
        }
    }, [isAuth])

    return <ShopNavigator ref={navRef} />
}

const styles = StyleSheet.create({})
