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
  View,
  AsyncStorage
} from 'react-native';


import ResourceList from './App/Components/ResourceList'
import Resource from './App/Components/Resource'
import Main from './App/Components/Main'
import ImmediateAssistance from './App/Components/ImmediateAssistance'
import AboutUs from './App/Components/AboutUs'
import Login from './App/Components/Login'
import NewPost from './App/Components/NewPost'
import Community from './App/Components/Community'
import SchoolList from './App/Components/SchoolList'
import School from './App/Components/School'
import Post from './App/Components/Post'
import NewComment from './App/Components/NewComment'
import SignUp from './App/Components/SignUp'

class Chelsie extends Component {
  renderScene(route, navigator){
    if (route.name == 'ResourceList') {
      return <ResourceList navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'Resource') {
      return <Resource navigator={navigator} {...route.passProps} />
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
    if (route.name == 'NewPost') {
      return <NewPost navigator={navigator} {...route.passProps} />
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
    if (route.name == 'Post') {
      return <Post navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'NewComment') {
      return <NewComment navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'SignUp') {
      return <SignUp navigator={navigator} {...route.passProps} />
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      root_route: {name: "Main"},
      isLoading: true
    }
  }
  // last_school datastructure in AsyncStorage{ name: school_name, id: school_id }

  componentDidMount() {
    AsyncStorage.getItem('last_school').then((value) => {
      if ( value === null ) {
        this.setState({isLoading: false});
      } else {
        var parsed_value = JSON.parse(value)
        this.setState({root_route: {name: 'School', passProps: {schoolName: parsed_value.name, schoolId: parsed_value.id}}})
        this.setState({isLoading: false});
      }
    }).done();
  }


  render() {
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    } else {
      return (
        <Navigator
        initialRoute={ this.state.root_route }
        renderScene={ this.renderScene.bind(this) }
        navigationBar={
          <Navigator.NavigationBar
          style={ styles.nav }
          routeMapper={NavigationBarRouteMapper}/>}
          />
        );
    }
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
  word: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginTop:13,
    fontSize:21
  },
  nav: {
    height: 80,
    backgroundColor: '#00bfd8'
  },
  navBarTitleText: {
    color: '#aaecca',
    fontWeight: '900',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  backBtn:{
    marginLeft: 14,
    marginTop: 14,
  }
});

AppRegistry.registerComponent('Chelsie', () => Chelsie);
