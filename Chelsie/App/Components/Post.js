import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView,
  Navigator,
  AsyncStorage
} from 'react-native';

import Separator from './Helpers/Separator'
import NewComment from './NewComment'


var url = `https://afternoon-badlands-40242.herokuapp.com/schools`
var deleteButton = null;
var commentBox;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      schoolId: this.props.schoolId,
      postTitle: this.props.postTitle,
      postId: this.props.postId,
      postBody: this.props.postBody,
      commentId: '',
      commentBody: '',
      user_id: '',
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

  _onFlagPostButton(){
    console.log(this.state.user_id)
    console.log(this.state.postId)
    fetch(`https://afternoon-badlands-40242.herokuapp.com/flags`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1,
        flaggable: 2,
        flaggable_type: "post"
      })
    })
    .then((responseText) => responseText.json())
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.warn(error);
    })
  }

  render(){
    return(
      <View>
        <View style={styles.content}>
          <Text style={styles.header}>{this.props.postTitle}</Text>
          <Text style={styles.text}>{this.props.postBody}</Text>
          <TouchableOpacity style={styles.button} onPress={this._onFlagPostButton.bind(this)}>
            <Text>Flag This Post</Text>
          </TouchableOpacity>
          <Text style={styles.header}> Comments </Text>
          <TouchableOpacity style={styles.button} onPress={this._onAddCommentButton.bind(this)}>
          <Text style={styles.add}>Add Comment</Text>
          </TouchableOpacity>
        </View>
      <ScrollView>
        <View style={styles.container}>{commentBox}</View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCommentView.bind(this)}
          style={styles.listView}
        />
      </ScrollView>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          color="#111"
          size="large"></ActivityIndicatorIOS>
      </View>
    );
  }

  renderCommentView(comment){

    if (this.state.user_id !== null && this.state.user_id == comment.user_id) {
      console.log("I'm ALIIIVEEEE")
      deleteButton = "Delete"
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}> {comment.body} </Text>
        <Text style={styles.text}> {deleteButton} </Text>
        <Separator />
      </View>
    );
  }

  _onAddCommentButton(){
    this.props.navigator.push({
      component: NewComment,
      name: "NewComment",
      passProps: {
        schoolId: this.state.schoolId,
        postId: this.state.postId,
        postBody: this.state.postBody,
        postTitle: this.state.postTitle
      },
    });
  }

}

var styles = StyleSheet.create({
  content:{
    marginTop: 90,
  },
  listView: {
    paddingTop: 2,
    backgroundColor: '#FFFFFF'
  },
  row: {
    flex: 1,
    alignItems: 'stretch',
    margin: 20
  },
  header: {
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 21,
    fontFamily: 'Cochin',
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Cochin',
    color: '#000000',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    fontWeight: 'normal'
  },
  button: {
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  }
});

module.exports = Post;
