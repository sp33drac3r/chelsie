import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  TextInput,
  Navigator,
  Alert,
  AsyncStorage
} from 'react-native';

import Community from "./Community"

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
        this.props.navigator.push({
          component: Community,
          name: 'Community'
        })
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.header}>Chelsie</Text>
      <Text style={styles.redirectMessage}>{this.state.message}</Text>
      <TextInput
        style={styles.loginArea}
        placeholder="EMAIL"
        onChangeText={(email) => this.setState({email: email})}
        value={this.state.email}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="PASSWORD"
        style={styles.loginArea}
        onChangeText={(password) => this.setState({password: password})}
        value={this.state.password}
      />
      <TouchableHighlight onPress={this.login.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Log In
        </Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => {this.props.navigator.resetTo({name: 'SignUp'})}}>
        <Text style={styles.newUserText}>New to Chelsie? Create an account.</Text>
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
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: '#F0F3BD',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  loginArea: {
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
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
  redirectMessage: {
    fontSize: 20,
    fontFamily: 'Cochin',
    alignSelf: 'center',
    color: 'red'
  },
  newUserText: {
    fontSize: 18,
    color: 'blue',
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
});

module.exports = Login;
