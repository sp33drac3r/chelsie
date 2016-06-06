import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  TextInput,
  Navigator,
  AsyncStorage
} from 'react-native';

import Community from "./Community"

var fakeUsername = "elizlalala"
var fakeEmail = "liz@gmail.com"
var fakePassword = "doggy"

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
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      })
    })
    .then((responseText) => responseText.json())
    .then((responseData) => {
      console.log(String(responseData.id));
      var stringId = String(responseData.id)
      AsyncStorage.setItem('user_id', stringId)
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.header}>username</Text>
      <TextInput
        style={styles.loginArea}
        onChangeText={(username) => this.setState({username: username})}
        value={this.state.username}
      />
      <Text style={styles.header}>email</Text>
      <TextInput
        style={styles.loginArea}
        onChangeText={(email) => this.setState({email: email})}
        value={this.state.email}
      />
      <Text style={styles.header}>password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.loginArea}
        onChangeText={(password) => this.setState({password: password})}
        value={this.state.password}
      />
      <TouchableHighlight onPress={this.signUp.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Sign Up
        </Text>
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
    backgroundColor: '#E9D460',
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
  }
});

module.exports = SignUp;
