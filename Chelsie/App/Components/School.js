import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  Navigator
} from 'react-native';

class School extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>School</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
});

module.exports = School;
