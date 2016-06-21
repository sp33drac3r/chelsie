import React, { Component } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

class Separator extends React.Component{
  render(){
    return (
      <View style={styles.separator} />
    );
  }
};

var styles = StyleSheet.create({
  separator: {
    height: 1,
    marginTop: 10,
    backgroundColor: '#E4E4E4',
    flex: 1,
  },
});


module.exports = Separator;
