import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native';

import School from "./School"

class NewPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      postTitle: "",
      postText: "",
      user_id: "",
      schoolId: this.props.schoolId,
      schoolName: this.props.schoolName,
      schoolAddress: this.props.schoolAddress
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({'user_id': value});
    }).done();
  }

  _onPostButton(){
    if (this.state.postTitle.replace(/\s+/g, '') === '' ){
      Alert.alert('Title is currently empty.')
    } else if (this.state.postText.replace(/\s+/g, '') === '') {
      Alert.alert('Post is currently empty.')
    } else {
      fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}/posts`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: {
            title: this.state.postTitle,
            body: this.state.postText,
            user_id: this.state.user_id,
            school_id: this.state.school_id
          }
        })
      })
      .then((responseText) => responseText.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.warn(error);
      })
      .done(() => {
        this.props.navigator.replacePreviousAndPop({
          component: School,
          name: "School",
          passProps: {
            schoolId: this.state.schoolId,
            schoolName: this.state.schoolName,
            schoolAddress: this.state.schoolAddress
          }})
        })
    }
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
      <TouchableHighlight onPress={this._onPostButton.bind(this)} style={styles.button}>
      <Text style={styles.buttonText}>
      submit
      </Text>
      </TouchableHighlight>
      </View>
    );
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
