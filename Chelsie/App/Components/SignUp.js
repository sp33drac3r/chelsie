import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  TextInput,
  Navigator,
  AsyncStorage,
  Image
} from 'react-native';

import Main from "./Main"

const SCREEN_WIDTH = require('Dimensions').get('window').width;

class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      user_id: ""
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({'user_id': value});
      console.log(this.state.user_id);
    }).done();
  }

  signUp(){
    fetch(`https://afternoon-badlands-40242.herokuapp.com/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: this.state.username.toLowerCase(),
          email: this.state.email.toLowerCase(),
          password: this.state.password.toLowerCase()
        }
      })
    })
    .then((responseText) => responseText.json())
    .then((responseData) => {
      var stringId = String(responseData.id)
      AsyncStorage.setItem('user_id', stringId)
      this.props.navigator.push({
        component: Main,
        name: 'Main'
      })
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render(){
    return(
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
        <Text style={styles.text}>username</Text>
        <TextInput
          style={styles.loginArea}
          onChangeText={(username) => this.setState({username: username})}
          value={this.state.username}
        />
        <Text style={styles.text}>email</Text>
        <TextInput
          style={styles.loginArea}
          onChangeText={(email) => this.setState({email: email})}
          value={this.state.email}
        />
        <Text style={styles.text}>password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.loginArea}
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}
        />
        <TouchableHighlight onPress={this.signUp.bind(this)} style={styles.signUpButton}>
          <Text style={styles.buttonText}>
            SIGN UP
          </Text>
        </TouchableHighlight>
        </View>
      </Image>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    top: 100,
    flex: 0.05,
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  signUpButton: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: '#29808C',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  loginArea: {
    height: 45,
    color: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'normal',
    alignSelf: 'center',
  }
});

module.exports = SignUp;
