import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
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
        console.log(responseData.comments)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.comments),
          loaded: true
        });
      })
      .done();
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.postTitle}</Text>
        <Text style={styles.text}>{this.props.postBody}</Text>
        <Text style={styles.header}> Comments </Text>

        <TouchableHighlight style={styles.button} onPress={this._onAddCommentButton.bind(this)}>
          <Text style={styles.add}>Add Comment</Text>
        </TouchableHighlight>

        <View style={styles.container}>{commentBox}</View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCommentView.bind(this)}
          style={styles.listView}
        />
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
    // console.log("this is button ")
    // commentBox=(<NewComment>Hey!</NewComment>)
    // this.render()

    this.props.navigator.push({
      component: NewComment,
      name: "NewComment",
      passProps: {
        schoolId: this.state.schoolId,
        postId: this.state.postId,
      },
    });
  }

}

var styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  listView: {
    paddingTop: 10,
    backgroundColor: '#FFFFFF'
  },
  text: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  row: {
  flex: 1,
  alignItems: 'stretch',
  margin: 20
  },
  header: {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Cochin',
    alignSelf: 'center'
  }
});

module.exports = Post;
