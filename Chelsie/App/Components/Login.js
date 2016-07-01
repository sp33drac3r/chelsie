import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Navigator,
  Alert,
  AsyncStorage,
  Image
} from 'react-native';

import Main from "./Main"

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      user_id: "",
      message: this.props.message || ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({'user_id': value});
    }).done();
  }

  login(){
    fetch(`https://afternoon-badlands-40242.herokuapp.com/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email.toLowerCase(),
        password: this.state.password.toLowerCase()
      })
    })
    .then((responseText) => responseText.json())
    .then((responseData) => {
      console.log(responseData)
      if (responseData.response === "User authentication failed"){
        Alert.alert('User Authentication Failed', 'Please validate email and/or password')
      } else {
        var stringId = String(responseData.id)
        AsyncStorage.setItem('user_id', stringId)
        this.props.navigator.resetTo({
          component: Main,
          name: 'Main'
        })
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render(){
    return(
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
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
          <TouchableOpacity onPress={this.login.bind(this)} style={styles.loginButton}>
            <Text style={styles.text}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableHighlight onPress={() => {this.props.navigator.resetTo({name: 'SignUp'})}}>
            <Text style={styles.text}>Create an account</Text>
          </TouchableHighlight>
        </View>
      </Image>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    top: 200,
    flex: 0.05,
    width: 415,
    alignItems: 'center',
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
  },
  loginButton: {
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
});

module.exports = Login;
