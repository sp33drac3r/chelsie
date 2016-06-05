import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import Resource from "./Resource"

class Main extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  _onResourcesButton(){
    console.log(this.props)
    this.props.navigator.push({
      component: Resource,
      name: "Resource"
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this._onResourcesButton.bind(this)}>
          <Text style={styles.buttonText}>Hi Mila!</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
          <Text style={styles.buttonText}>Hi Riley!</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
          <Text style={styles.buttonText}>Hi Andrew!</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
          <Text style={styles.buttonText}>Hi Elizlalala!</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    // alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Main;
