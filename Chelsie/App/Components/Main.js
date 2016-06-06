import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Image,
  ScrollView,
  StatusBar,
  Navigator
} from 'react-native';

import Resource from "./Resource"
import ImmediateAssistance from "./ImmediateAssistance"
import AboutUs from "./AboutUs"
import Login from "./Login"

class Main extends Component {
  constructor(props){
    super(props)
    this.state={
    }
  }

  _onASAPButton(){
    this.props.navigator.push({
      component: ImmediateAssistance,
      name: "ImmediateAssistance"
    })
  }

  _onResourcesButton(){
    this.props.navigator.push({
      component: Resource,
      name: "Resource"
    })
  }

  _onAboutUsButton(){
    this.props.navigator.push({
      component: AboutUs,
      name: "AboutUs"
    })
  }

  _onLoginButton(){
    this.props.navigator.push({
      component: Login,
      name: "Login"
    })
  }

  render(){
    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
      />
      <ScrollView>
        <TouchableHighlight onPress={this._onAboutUsButton.bind(this)}>
      <Text style={styles.header}>Chelsie</Text>
      </TouchableHighlight>
      </ScrollView>
        <View style={styles.footerNav}>
          <TouchableHighlight style={styles.button} onPress={this._onASAPButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/help.png')} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onResourcesButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/resource.png')} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onAboutUsButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/info.png')} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onLoginButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/group.png')} />
          </TouchableHighlight>
          </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#EAFCFD',
  },
  footerNav: {
    flex: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  button: {
    flex: 1,
    marginTop: 5,
    alignSelf: 'stretch',
    height: 70,
    backgroundColor: '#29808C',
  },
  navBtn: {
    marginLeft: 15,
    marginTop: 15,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Cochin',
    alignSelf: 'center'
  }
});

module.exports = Main;
