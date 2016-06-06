/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight,
  Image,
  View
} from 'react-native';


import Resource from './App/Components/Resource'
import Main from './App/Components/Main'
import ImmediateAssistance from './App/Components/ImmediateAssistance'
import AboutUs from './App/Components/AboutUs'
import Login from './App/Components/Login'
import Post from './App/Components/Post'
import Community from './App/Components/Community'
import SchoolList from './App/Components/SchoolList'
import School from './App/Components/School'
import NewComment from './App/Components/NewComment'

class Chelsie extends Component {
  renderScene(route, navigator){
    if (route.name == 'Resource') {
      return <Resource navigator={navigator} />
    }
    if (route.name == 'Main') {
      return <Main navigator={navigator} />
    }
    if (route.name == 'ImmediateAssistance') {
      return <ImmediateAssistance navigator={navigator} />
    }
    if (route.name == 'AboutUs') {
      return <AboutUs navigator={navigator} />
    }
    if (route.name == 'Login') {
      return <Login navigator={navigator} />
    }
    if (route.name == 'Post') {
      return <Post navigator={navigator} />
    }
    if (route.name == 'Community') {
      return <Community navigator={navigator} />
    }
    if (route.name == 'SchoolList') {
      return <SchoolList navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'School') {
      return <School navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'NewComment') {
      return <NewComment navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Community' }}
        renderScene={ this.renderScene.bind(this) }
        navigationBar={
          <Navigator.NavigationBar
             style={ styles.nav }
          routeMapper={NavigationBarRouteMapper}/>}
      />
    );
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
        	 underlayColor="transparent"
           onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Image style={styles.backBtn} source={require('./imgs/back.png')} />
        </TouchableHighlight>
  	)}
  	else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if (route.onPress) return ( <TouchableHighlight
    														onPress={ () => route.onPress() }>
                                <Text style={ styles.navBarRightButton }>
                                  	{ route.rightText || 'Right Button' }
                                </Text>
                              </TouchableHighlight> )
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>CHELSIE</Text>
  }
};


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
  title: {
  marginTop:4,
  fontSize:16
  },
  nav: {
  height: 60,
  backgroundColor: '#efefef'
  },
  navBarTitleText: {
    color: '#aaecca',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
  paddingLeft: 10,
  },
  navBarRightButton: {
  paddingRight: 10,
  },
  backBtn:{
    marginLeft: 12,
    marginTop: 5,
  }
});

AppRegistry.registerComponent('Chelsie', () => Chelsie);
