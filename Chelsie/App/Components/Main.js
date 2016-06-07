import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Navigator
} from 'react-native';

import Swiper from 'react-native-swiper'
import ResourceList from "./ResourceList"
import ImmediateAssistance from "./ImmediateAssistance"
import Login from "./Login"
import Community from "./Community"
import SignUp from "./SignUp"

// Navbar Routes
import SchoolList from "./SchoolList"
import AboutUs from "./AboutUs"

class Main extends Component {
  constructor(props){
    super(props)
    this.state={
    }
  }

  _onMainButton(){
    this.props.navigator.resetTo({
      component: Main,
      name: "Main"
    })
  }

  _onSchoolsButton(){
    this.props.navigator.resetTo({
      component: SchoolList,
      name: "SchoolList"
    })
  }

  _onProfileButton(){
    this.props.navigator.push({
      component: Profile,
      name: "Profile"
    })
  }

  _onLoginButton(){
    this.props.navigator.push({
      component: Login,
      name: "Login"
    })
  }

  _onSignUpButton(){
    this.props.navigator.push({
      component: SignUp,
      name: "SignUp"
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
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>I think my anger in this case is related to the fact that, like many women, I was raped by an acquaintance in college after a night of drinking.</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>If you’re a guy, you can go out and drink all you want and the worst you end up with is a hangover...If you’re a woman, you have to assess.</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>You took away my worth, my privacy, my energy, my time, my safety, my intimacy, my confidence, my own voice, until today... I am not just a drunk victim ... I am a human being who has been irreversibly hurt.</Text>
        </View>
      </Swiper>
      <View style={styles.cotent}>
      <Text style={styles.content}>Cronut fanny pack waistcoat food truck. Cronut fanny pack waistcoat food truck. Cronut fanny pack waistcoat food truck.</Text>
      </View>
      </ScrollView>
        <View style={styles.footerNav}>
          <TouchableOpacity style={styles.button} onPress={this._onMainButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/help.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._onSchoolsButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/resource.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._onProfileButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/info.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._onLoginButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/group.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._onSignUpButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/add.png')} />
          </TouchableOpacity>
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
    backgroundColor: '#29808C',
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
  header: {
    fontWeight: 'bold',
    marginTop: 110,
    fontSize: 20,
    color: '#29808C',
    fontFamily: 'Arial',
    alignSelf: 'center'
  },
  wrapper: {
    flex: 1,
  },
  content: {
    borderColor: 'red',
    borderWidth: 4,
    fontWeight: 'bold',
    marginTop: 90,
    paddingTop: 10,
    fontSize: 20,
    color: '#29808C',
    fontFamily: 'Arial',
    alignSelf: 'center'
  },
  slide1: {
    paddingLeft: 32,
    paddingRight: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    paddingLeft: 32,
    paddingRight: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    paddingLeft: 32,
    paddingRight: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  footerNav: {
    flex: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  buttonNav: {
    flex: 1,
    marginTop: 5,
    alignSelf: 'stretch',
    height: 70,
    backgroundColor: '#29808C',
  },
  navBtn: {
    marginTop: 12,
    alignSelf: 'center'
  },
});

module.exports = Main;
