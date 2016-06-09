import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  Navigator
} from 'react-native';

class AboutUs extends Component {
  render(){
    return (
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>ABOUT CHELSIE</Text>
        <Text style={styles.text}>Chelsie is a community for survivors of college sexual assault. Too often, survivors are left with few resources and feelings of loneliness or detachment, not knowing who they can reach out to for help or advice. Through anonymous posts, survivors can share their stories and journal their healing process, giving their support back to the community.  This community borrows its name from a former student of Kenyon College who was sexually assaulted in November of 2015. She went public with her story through an open letter to Kenyon written by her brother, also an alum.  An anonymous community is important for the protection of survivors but anonymity online brings risk of abuse. We rely on the community to flag hateful or abusive language so it can be removed. This is a safe space. < /Text>
      </View>
      </Image>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 400,
    paddingTop: 90,
    paddingLeft: 14,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  header:{
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Apple SD Gothic Neo',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 5
  },
  text: {
    fontSize: 17,
    textAlign: 'justify',
    color: '#FFFFFF',
    fontFamily: 'Apple SD Gothic Neo',
    alignSelf: 'center'
  }
});

module.exports = AboutUs;
