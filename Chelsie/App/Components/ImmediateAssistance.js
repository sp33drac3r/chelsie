import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Linking,
  Navigator
} from 'react-native';

import Communications from 'react-native-communications';

var hotlineUrl = `https://ohl.rainn.org/online/`

class ImmediateAssistance extends Component {

  _onBackButton(){
    this.props.navigator.pop({
    })
  }

  _onHotlineButton(){
    Communications.phonecall('2134584288', true)
  }

  _onChatButton(){
    Linking.openURL(hotlineUrl)
  }

  render(){
    return (
      <View style={styles.container}>
      <TouchableHighlight style={styles.backButton} onPress={this._onBackButton.bind(this)}>
        <Text> back </Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={this._onHotlineButton}>
        <Text style={styles.buttonText}> Hotline </Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={this._onChatButton}>
        <Text style={styles.buttonText}> Chat </Text>
      </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = ImmediateAssistance;
