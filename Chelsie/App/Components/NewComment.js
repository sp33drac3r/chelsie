import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  TextInput
} from 'react-native';

class NewComment extends Component {
  constructor(props){
    super(props)
    this.state = {
      commentText: "",
      user_id: 1
    }
  }

  post(){
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/1/posts/1/comments/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: {
          body: this.state.commentText,
          user_id: this.state.user_id,
          post_id: 1
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
  }

  render(){
    return (
      <View style={styles.container}>
      <Text style={styles.header}>Comment</Text>
      <TextInput
        style={styles.textArea}
        onChangeText={(text) => this.setState({commentText: text})}
        value={this.state.commentText}
      />
      <TouchableHighlight onPress={this.post.bind(this)} style={styles.button}>
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



module.exports = NewComment;
