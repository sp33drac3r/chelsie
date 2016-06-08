import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView,
  Image,
  Navigator,
  AsyncStorage
} from 'react-native';

import Main from "./Main"
import AboutUs from "./AboutUs"
import Profile from "./Profile"

class BottomStatusBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: '',
      parent: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({'user_id': value});
    }).done();
  }

  _onMainButton(){
    this.props.toRoute({
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
    this.props.navigator.resetTo({
      component: Profile,
      name: "Profile"
    })
  }

  render(){
    return(
      <View style={styles.footerNav}>
        <TouchableOpacity style={styles.buttonNav} onPress={this._onMainButton.bind(this)}>
          <Image style={styles.navBtn} source={require('./../../imgs/help.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNav} onPress={this._onSchoolsButton.bind(this)}>
          <Image style={styles.navBtn} source={require('./../../imgs/resource.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNav} onPress={this._onProfileButton.bind(this)}>
          <Image style={styles.navBtn} source={require('./../../imgs/info.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
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
  }
});

module.exports = BottomStatusBar;
