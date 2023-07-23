import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Animated
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';

const Form = ({ search, setSearch }) => {

    const { city, country } = search

    const [animationBtn] = useState(new Animated.Value(1))

    const inAnimation = () => {
        Animated.spring(animationBtn, {
            toValue: .9
        }).start()

    }

    const outAnimation = () => {
        Animated.spring(animationBtn, {
            toValue: 1,
            friction: 4,
            tension: 30,
        }).start()
    }

    const animationStyle = {
        transform: [{ scale: animationBtn }]
    }

    return (
        <>
            <View style={styles.form}>
                <View>
                    <TextInput
                        placeholder='City Name'
                        placeholderTextColor='#666'
                        style={styles.input}
                        value={city}
                    />
                </View>
                <Picker
                    itemStyle={{ height: 120, backgroundColor: '#fff' }}
                    selectedValue={country}
                >
                    <Picker.Item label='Select a country...' value='' />
                    <Picker.Item label='Ecuador' value='EC' />
                    <Picker.Item label='Chile' value='CL' />
                    <Picker.Item label='United States of America' value='US' />
                    <Picker.Item label='Canada' value='CA' />
                    <Picker.Item label='Mexico' value='MX' />
                    <Picker.Item label='Japan' value='JP' />
                </Picker>
            </View>
            <TouchableWithoutFeedback
                onPressIn={() => inAnimation()}
                onPressOut={() => outAnimation()}

            >
                <Animated.View style={[animationStyle, styles.btnSearch]}>
                    <Text style={styles.txtSearch}>Search Weather</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default Form

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnSearch: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center'
    },
    txtSearch: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    },
})