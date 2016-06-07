import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  TextInput
} from 'react-native';

import Community from "./Community"

class NewPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      postTitle: "",
      postText: "",
      user_id: 1
    }
  }

<<<<<<< HEAD
  postRequest(){
=======
  _onPostButton(){
>>>>>>> development
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/1/posts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: {
          title: this.state.postTitle,
          body: this.state.postText,
          user_id: this.state.user_id
        }
      })
    })
    .then((responseText) => responseText.json())
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.warn(error);
    });
    this.props.navigator.push({
      component: Community,
      name: "Community"
    })
  }

  render(){
    return (
      <View style={styles.container}>
      <Text style={styles.header}>Title</Text>
      <TextInput
        style={styles.smallTextArea}
        onChangeText={(title) => this.setState({postTitle: title})}
        value={this.state.postTitle}
      />
      <Text style={styles.header}>Post</Text>
      <TextInput
        style={styles.textArea}
        onChangeText={(text) => this.setState({postText: text})}
        value={this.state.postText}
      />
<<<<<<< HEAD
      <TouchableHighlight onPress={this.postRequest.bind(this)} style={styles.button}>
=======
      <TouchableHighlight onPress={this._onPostButton.bind(this)} style={styles.button}>
>>>>>>> development
        <Text style={styles.buttonText}>
          submit
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
  smallTextArea: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: '#E74C3C',
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
  asapButton: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: '#E74C3C',
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

module.exports = NewPost;
