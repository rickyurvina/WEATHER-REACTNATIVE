

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import axios from 'axios';
import Form from './components/Form';
import Weather from './components/Weather';
const APPID = '7a934e8be83db1db32451fae0814075f'

function App(): JSX.Element {

  const [search, setSearch] = useState({
    city: '',
    country: ''
  });

  const [consult, setConsult] = useState(false)
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [resultWeather, setResultWeather] = useState({})
  const [bgColor, setBgColor] = useState('rgb(71,149,212)')

  const { city, country } = search;

  const bgColorApp = {
    backgroundColor: bgColor
  }

  useEffect(() => {
    if (consult) {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=${APPID}`
      try {
        const getLatLon = async () => {
          await axios.get(url).then(function (response) {
            setLat(response.data[0].lat)
            setLon(response.data[0].lon)
          }).catch(function (error) {
            showAlert()
          })
        }
        getLatLon()

      } catch (error) {
        console.log({ error })
      }
    }
    setConsult(false);
  }, [consult])

  useEffect(() => {
    if (lat && lon) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}`
      const getWeather = async () => {
        await axios.get(url)
          .then(function (response) {
            console.log(response.data)
            setResultWeather(response.data)
            setConsult(false)

            const kelvin = 273.15
            const { main } = response.data
            const actual = main.temp - kelvin
            if(actual < 10){
              setBgColor('rgb(105,108,149)')
            }else if(actual >= 10 && actual < 25){
              setBgColor('rgb(71,149,212)')
            }else if(actual >= 25){
              setBgColor('rgb(178,28,61)')
            }
          })
          .catch(function (error) {
            console.log({ error })
          })
      }
      getWeather()
    }
  }, [lat, lon])

  const hideKeyboard = () => {
    Keyboard.dismiss();
  }

  const showAlert = () => {
    Alert.alert(
      "Error",
      "There are no records, try with another city or country",
      [
        { text: "OK" }
      ]
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <View style={[styles.appS, bgColorApp]}>
        <View>
          <Weather resultWeather={resultWeather} />
        </View>
        <View style={styles.content}>
          <Form
            search={search}
            setSearch={setSearch}
            setConsult={setConsult}
          />
        </View>


      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  appS: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  }

});

export default App;
