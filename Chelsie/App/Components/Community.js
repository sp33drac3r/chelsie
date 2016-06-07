import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  Navigator,
  AsyncStorage,
  Image
} from 'react-native';

import NewPost from "./NewPost"
import NewComment from "./NewComment"
import SchoolList from "./SchoolList"
import Main from "./Main"
import AboutUs from "./AboutUs"

class Community extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: ""
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({'user_id': value});
      console.log(this.state.user_id);
    }).done();
  }

  _onSchoolButton(){
    this.props.navigator.push({
      component: SchoolList,
      name: "SchoolList"
    })
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
    this.props.navigator.resetTo({
      component: AboutUs,
      name: "AboutUs"
    })
  }

  render(){
    console.log(this.props.navigator)
    return (
      <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}> Community </Text>
        <TouchableHighlight style={styles.button} onPress={this._onSchoolButton.bind(this)}>
          <Text style={styles.buttonText}> Schools </Text>
        </TouchableHighlight>
      </View>
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
        </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: '#B5E3FF',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Cochin',
    alignSelf: 'center'
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

module.exports = Community;
