import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Navigator,
  TextInput,
  Alert,
  Image,
  AsyncStorage,
  StatusBar,
  ScrollView,
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
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
      <StatusBar
      backgroundColor="blue"
      barStyle="light-content"
      />
      <View style={styles.content}>
      <Text style={styles.header}>Title</Text>
      <TextInput
        style={styles.smallTextArea}
        onChangeText={(title) => this.setState({postTitle: title})}
        value={this.state.postTitle}
      />
      <Text style={styles.header}>Post</Text>
      <ScrollView>
      <TextInput
        style={styles.textArea}
        multiline={true}
        onChangeText={(text) => this.setState({postText: text})}
        value={this.state.postText}
      />
      </ScrollView>
      <View style={styles.footerNav}>
        <TouchableOpacity style={styles.buttonNav} onPress={this._onPostButton.bind(this)}>
          <Text style={styles.addBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Image>
    );
  }

}


var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 90,
    backgroundColor: 'transparent',
  },
  smallTextArea: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    borderWidth: 1
  },
  textArea: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 450,
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    borderWidth: 1
  },
  header: {
    paddingLeft: 10,
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingBottom: 7,
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
  addBtnText:{
    marginTop: 23,
    alignSelf: 'center',
    fontWeight: '400',
    fontSize: 17,
    color: '#FFFFFF',
  }
});

module.exports = NewPost;
