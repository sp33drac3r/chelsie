import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  TextInput,
  ListView,
  Alert,
  ScrollView,
  AsyncStorage
} from 'react-native';

import Post from "./Post"
import Separator from './Helpers/Separator'

class NewComment extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      schoolId: this.props.schoolId,
      postId: this.props.postId,
      postBody: this.props.postBody,
      postTitle: this.props.postTitle,
      commentText: "",
      user_id: ''
    }
  }

  componentDidMount() {
    this.fetchData();
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({'user_id': value});
    }).done();
  }

  fetchData() {
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}/posts/${this.state.postId}`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.comments),
          loaded: true
        });
      })
      .done();
  }

  _postCommentButton(){
    if (this.state.commentText.replace(/\s+/g, '') === '' ){
      Alert.alert('Comment is currently empty.')
    } else {
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}/posts/${this.state.postId}/comments/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: {
          body: this.state.commentText,
          user_id: this.state.user_id,
          post_id: this.state.post_id
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
        component: Post,
        name: "Post",
        passProps: {
        postId: this.state.postId,
        schoolId: this.state.schoolId,
        postBody: this.state.postBody,
        postTitle: this.state.postTitle
      }})
    });
    }
  }

  render(){
    return (
      <View style={styles.container}>
      <ScrollView style={styles.content}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCommentView.bind(this)}
        enableEmptySections={true}
        style={styles.listView}
      />
      </ScrollView>
      <Text style={styles.header}>Add Your Comment:</Text>
      <TextInput
        style={styles.textArea}
        onChangeText={(text) => this.setState({commentText: text})}
        value={this.state.commentText}
      />
      <TouchableHighlight onPress={this._postCommentButton.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          SUBMIT
        </Text>
      </TouchableHighlight>
      </View>

    )
  }

  renderCommentView(comment){
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.text}> {comment.body} </Text>
        <Separator />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  content: {
    marginTop: 90,
  },
  rowContainer: {
    padding: 10,
  },
  commentContainer:{
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
  },
  text: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 18,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1
  },
  listView: {
    paddingTop: 1,
    backgroundColor: '#F5FCFF',
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
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Cochin',
  }
});

module.exports = NewComment;
