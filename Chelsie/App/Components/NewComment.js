import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Navigator,
  TextInput,
  ListView,
  Alert,
  ScrollView,
  Image,
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
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
      <View style={styles.content}>
      <Text style={styles.header}>Current Comments:</Text>
      <ScrollView>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCommentView.bind(this)}
        enableEmptySections={true}
        style={styles.listView}
      />
      </ScrollView>
      <View style={styles.commentContainer}>
      <Text style={styles.header}>Add Your Comment:</Text>
      <TextInput
        multiline={true}
        style={styles.textArea}
        onChangeText={(text) => this.setState({commentText: text})}
        value={this.state.commentText}
      />
      <View style={styles.footerNav}>
        <TouchableOpacity style={styles.buttonNav} onPress={this._postCommentButton.bind(this)}>
          <Text style={styles.addBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
      </Image>

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
  rowContainer: {
    padding: 3,
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFFFFF',
    fontSize: 16,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  textArea: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 150,
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    borderWidth: 1
  },
  listView: {
    paddingTop: 1,
    backgroundColor: 'transparent',
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
  },
  commentContainer:{
    marginTop: 15,
  }
});

module.exports = NewComment;
