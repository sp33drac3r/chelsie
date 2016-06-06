import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  Navigator
} from 'react-native';

import SchoolList from './SchoolList'


class School extends Component {
  render(){
    console.log("THIS IS PROPS: ")
    console.log(this.props)
    console.log(this.props.title)
    console.log(this.props.schoolName)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.schoolName}</Text>
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
