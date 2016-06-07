import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView,
  Image,
  Navigator
} from 'react-native';

class Resource extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Resource</Text>
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
    marginTop: 90,
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center'
  }
});

module.exports = Resource;
