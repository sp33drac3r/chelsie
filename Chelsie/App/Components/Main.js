import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  ScrollView,
  StatusBar,
  Navigator
} from 'react-native';

import Swiper from 'react-native-swiper'
import ResourceList from "./ResourceList"
import Login from "./Login"
import SignUp from "./SignUp"
import AboutUs from "./AboutUs"


class Main extends Component {
  constructor(props){
    super(props)
    this.state={
      loaded: false,
    }
  }

  componentDidMount(){
    this.setState({
      loaded: true,
    })
  }

  _onResourceListButton(){
    this.props.navigator.push({
      component: ResourceList,
      name: "ResourceList"
    })
  }

  _onAboutUsButton(){
    this.props.navigator.push({
      component: AboutUs,
      name: "AboutUs"
    })
  }

  renderLoadingView() {
    return (
      <View>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          color="#111"
          size="large"></ActivityIndicatorIOS>
      </View>
    );
  }

  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
      />
      <ScrollView>
      <Swiper style={styles.wrapper} showsButtons={true}>
        <Image source={require('./../../imgs/gradient3.jpg')} style={styles.slide}>
          <Text style={styles.text}>I think my anger in this case is related to the fact that, like many women, I was raped by an acquaintance in college after a night of drinking.</Text>
        </Image>
        <Image source={require('./../../imgs/gradient2.jpg')} style={styles.slide}>
          <Text style={styles.text}>If you’re a guy, you can go out and drink all you want and the worst you end up with is a hangover...If you’re a woman, you have to assess.</Text>
          </Image>
        <Image source={require('./../../imgs/gradient1.jpg')} style={styles.slide}>
          <Text style={styles.text}>You took away my worth, my privacy, my energy, my time, my safety, my intimacy, my confidence, my own voice, until today... I am not just a drunk victim ... I am a human being who has been irreversibly hurt.</Text>
        </Image>
      </Swiper>
      </ScrollView>
          <View style={styles.footerNav}>
          <TouchableHighlight style={styles.button} onPress={this._onResourceListButton.bind(this)} underlayColor="#3D94A0">
            <Text style={ styles.bottomNav }>resources</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onAboutUsButton.bind(this)} underlayColor="#3D94A0">
            <Text style={ styles.bottomNav }>about chelsie</Text>
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
    backgroundColor: '#29808C',
  },
  wrapper: {
    flex: 1,
  },
  slide: {
    paddingLeft: 32,
    paddingRight: 152,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    width: 355,
    fontWeight: 'bold',
  },
  footerNav: {
    flex: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  bottomNav: {
    justifyContent: 'center',
    alignItems: 'stretch',
    color: 'rgba(255,255,255,1)',
    fontWeight: '400',
    fontSize:16
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#29808C',
  },
  buttonNav: {
    flex: 1,
    marginTop: 5,
    alignSelf: 'stretch',
    height: 70,
    backgroundColor: '#29808C',
  },
});

module.exports = Main;
