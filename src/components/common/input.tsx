import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { View } from 'react-native';
import { colors } from '../../constant';

interface InputProps {
    value?: string;
    placeholder: string;
    label?: string;
    onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ value, onChangeText, placeholder, label }) => {
    return (
        <>
            <View style={styles.container}>

                {label && <Text style={styles.label}>{label}</Text>}
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                />
            </View>
        </>
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    container: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
    },
})