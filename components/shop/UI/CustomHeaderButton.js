import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'

import {HeaderButton} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../../../constants/Colors'

export default function CustomHeaderButton(props) {
    return (
       <HeaderButton
       {...props}
       IconComponent={Ionicons}
       iconSize={34}
       color={Platform.OS==='android'?"white": Colors.primary}
       />
    )
}

const styles = StyleSheet.create({})