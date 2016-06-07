import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Navigator,
  AsyncStorage
} from 'react-native';

import NewPost from "./NewPost"
import NewComment from "./NewComment"
import SchoolList from "./SchoolList"
import Profile from "./Profile"

class Community extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: ""
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      // console.log(value);
      this.setState({'user_id': value});
      // console.log(this.state.user_id);
    }).done();
  }

  _onSchoolButton(){
    this.props.navigator.push({
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

  render(){
    console.log(this.props.navigator)
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Community </Text>
        <TouchableHighlight style={styles.button} onPress={this._onSchoolButton.bind(this)}>
          <Text style={styles.buttonText}> Schools </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onProfileButton.bind(this)}>
          <Text style={styles.buttonText}> Profile </Text>
        </TouchableHighlight>
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
  }
});

module.exports = Community;
