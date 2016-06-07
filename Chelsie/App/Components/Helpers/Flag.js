import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Navigator,
  AsyncStorage
} from 'react-native';

class Flag extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.elementType,
      elementId: this.props.elementId
    }
  }

  _flagButton() {

  }

  render(){
    return (
      <TouchableHighlight style={styles.button}
      onPress={this._flagButton}>
      <Text style={styles.flag}>report</Text>
      </TouchableHighlight>
    );
  }
};

var styles = StyleSheet.create({
  flag: {
    height: 1,
    marginTop: 10,
    backgroundColor: '#E4E4E4',
    flex: 1,
  },
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: '#E74C3C',
    borderColor: 'grey',
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

module.exports = Flag;
