

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Form from './components/Form';
function App(): JSX.Element {

  const [search, setSearch] = useState({
    city: '',
    country: ''
  });

  const hideKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <View style={styles.appS}>
        <View style={styles.content}>
          <Form
            search={search}
            setSearch={setSearch}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  appS: {
    flex: 1,
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  }

});

export default App;
