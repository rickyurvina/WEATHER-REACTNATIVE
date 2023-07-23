import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Weather = ({ resultWeather }) => {

    const { name, main } = resultWeather
    if (!name) return null

    const kelvin = 273.15
    return (
        <View style={styles.weather}>
            <Text style={[styles.txt, styles.actual]}>
                {parseInt(main.temp - kelvin)}
                <Text style={styles.temp}>
                    &#x2103;
                </Text>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: `http://openweathermap.org/img/w/${resultWeather.weather[0].icon}.png` }}
                />
            </Text>
            <View style={styles.temps}>
                <Text style={styles.txt}> Min {' '}
                    <Text style={styles.temp}>
                        {parseInt(main.temp_min - kelvin)} &#x2103; {' '}
                    </Text>
                </Text>

                <Text style={styles.txt}> Max {' '}
                    <Text style={styles.temp}>

                        {parseInt(main.temp_max - kelvin)} &#x2103; {' '}
                    </Text>
                </Text>
            </View>
        </View>
    )
}

export default Weather

const styles = StyleSheet.create({
    weather: {
        marginBottom: 20
    },
    txt: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temp: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    temps: {
        flexDirection: 'row',
        justifyContent: 'center'

    }

})