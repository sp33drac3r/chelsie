import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator
} from 'react-native';

class AboutUs extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>About Us</Text>
        <Text> A mobile application to provide resources to college students who have been victims of sexual assualt. The platform aims to shed light on rape issues that occur in colleges and universities across America.< /Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center'
  }
});

module.exports = AboutUs;
