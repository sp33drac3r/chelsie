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
  TouchableOpacity,
  ActivityIndicatorIOS,
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
import Profile from './App/Components/Profile'


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
      return <Login navigator={navigator} {...route.passProps} />
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
    if (route.name == 'Profile') {
      return <Profile navigator={navigator} {...route.passProps} />
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      root_route: {name: "Main"},
      loaded: false
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
        this.setState({loaded: true});
      }
    }).done();
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={!this.state.loaded}
            color="#111"
            size="large"></ActivityIndicatorIOS>
        </View>
      );

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
    if(index === 0) {
      return (
        <TouchableOpacity
           underlayColor="transparent"
           onPress={() => { navigator.resetTo({ component: SchoolList, name: "SchoolList" }) } }>
          <Text style={ styles.titleNav }>community</Text>
        </TouchableOpacity>
    )}
    if(index > 0) {
      return (
        <TouchableOpacity
        	 underlayColor="transparent"
           onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Image style={styles.backBtn} source={require('./imgs/back.png')} />
        </TouchableOpacity>
  	)}
  	else { return null }
  },
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity
         underlayColor="transparent"
         onPress={() => { navigator.resetTo({ component: Profile, name: "Profile" }) } }>
        <Text style={ styles.titleNav }>my diary</Text>
      </TouchableOpacity>
  )
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity
         underlayColor="transparent"
         onPress={() => { navigator.resetTo({ component: Main, name: "Main" }) } }>
         <Text style={ styles.title }>CHELSIE</Text>
      </TouchableOpacity>
    )
  }
};


var styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flex: 1,
    flexDirection: 'column',
  },
  backBtn:{
    marginLeft: 14,
    marginTop: 14,
  },
  title: {
    fontFamily: 'Apple SD Gothic Neo',
    color: 'white',
    fontWeight: '600',
    marginTop:13,
    fontSize:21
  },
  titleNav: {
    color: 'rgba(255,255,255,1)',
    fontWeight: '400',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop:14,
    fontSize:16
  },
  nav: {
    height: 70,
    // opacity: 0.9,
    backgroundColor: 'transparent'
    //  '#00bfd8'
  }
});

AppRegistry.registerComponent('Chelsie', () => Chelsie);
