import React, { useReducer, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const INPUT_CHANGE = "INPUT_CHANGE"
const INPUT_BLUR = "INPUT_BLUR"

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValidForSure
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }

        default:
            return state


    }
}


export default function Input(props) {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false,

    })


    const { onInputChange, id } = props

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
            console.log("hihi")
            console.log(inputState.value)
            console.log(" to jest isValid ze stanu:" + inputState.isValid)
        }
    }, [inputState, onInputChange, id])


    const textChangeHandler = text => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false
        }
        if (props.min != null && +text < props.min) {
            isValid = false
        }
        if (props.max != null && +text > props.max) {
            isValid = false
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false
        }
        console.log(" to jest isValid:" + isValid)
        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValidForSure: isValid,


        })
    }

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}

            />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}
                    </Text>
                </View>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        padding: 10,


    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#888',
        borderBottomEndRadius: 6,

    },
    errorText: {
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold'
    },
    errorContainer: {
        marginVertical: 5,
    }
})
