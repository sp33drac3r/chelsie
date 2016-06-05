import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  TextInput,
  Navigator
} from 'react-native';


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.header}>Chelsie</Text>
      <TextInput
        style={styles.loginArea}
        onChangeText={(username) => this.setState({username: username})}
        value={this.state.username}
      />
      <TextInput
        style={styles.loginArea}
        onChangeText={(password) => this.setState({password: password})}
        value={this.state.password}
      />
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
    backgroundColor: 'red',
    borderColor: 'red',
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
    backgroundColor: 'grey',
    borderColor: 'blue',
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

module.exports = Login;
