import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  NavigatorIOS
} from 'react-native';

class Resource extends Component {
  render(){
    return (
      <View style={styles.other}>
        {console.log(styles.word)}
        <Text style={styles.word}> Hey </Text>
        <Text>Hey</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  other: {
    flex: 1,
    backgroundColor: '#aaeaca'
  },
  word: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
});

module.exports = Resource;
