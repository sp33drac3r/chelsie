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
  Switch,
  AsyncStorage
} from 'react-native';

import Separator from './Helpers/Separator'
import NewComment from './NewComment'


var url = `https://afternoon-badlands-40242.herokuapp.com/schools`
var deleteButton = null;
var commentBox;
var flag = 'Flag'

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
      postFlagger: false,
      commentId: '',
      commentBody: '',
      user_id: '',
      commentsFlagged: [],
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      flagId: '',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({'user_id': value});
    }).done(this.fetchData());
  }

  fetchData() {

    if (this.state.user_id === '') {
      console.log("I'm in the null case")
      fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}/posts/${this.state.postId}`)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.comments),
            loaded: true
          });
        })
        .done();
    } else {
      console.log("I'm in the else case")
      fetch(`https://afternoon-badlands-40242.herokuapp.com/flags/${this.state.user_id}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)

        //Mark post as flagged as needed and store all comment IDs flagged by user in commentsFlagged array in props.
        for (var i = 0; i < responseData.length; i++) {
          if(responseData[i].flaggable_type === 'Post' && responseData[i].flaggable_id === this.state.postId){
            this.setState.postFlagger = true;
            console.log("Post Flagger state")
            console.log(this.state.postFlagger)

            this.state.falseSwitchIsOn = true;
            console.log("False switch state")
            console.log(this.state.falseSwitchIsOn)

            this.setState({ flagId: responseDate[i].id })
          } else if(responseData[i].flaggable_type === 'Comment') {
            this.state.commentsFlagged.push(responseData[i].flaggable_id)
            console.log(this.state.commentsFlagged)
          }
        }
      })
      .done(fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}/posts/${this.state.postId}`)
        .then((response) => response.json())
        .then((responseData) => {

          // Empty comments that aren't flagged by user from the commentsFlagged prop
          for (var c = 0; c < responseData.comments.length; c++) {
            for (var i = 0; i < this.state.commentsFlagged.length; i++) {
              if (responseData.comments[c].id !== this.state.commentsFlagged[i]) {
                this.state.commentsFlagged.splice(i, 1)
              }
            }
          }
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.comments),
            loaded: true
          });
        })
        .done()
      );
    }


  }

  _onFlagPostButton(value) {
   if ( value === true ) {
     fetch(`https://afternoon-badlands-40242.herokuapp.com/flags`, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         user_id: this.state.user_id,
         flaggable: this.state.postId,
         flaggable_type: "post"
       })
     })
     .then((responseText) => responseText.json())
     .then((responseData) => {
       this.setState({flagId: responseData});
       console.log(responseData)
     })
     .catch((error) => {
       console.warn(error);
     })
   } else {
     fetch(`https://afternoon-badlands-40242.herokuapp.com/flags/${this.state.flagId}`, {
       method: 'DELETE',
       headers: {
         'Access-Control-Allow-Methods': 'DELETE',
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         user_id: this.state.user_id,
         flaggable: this.state.postId,
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
 }

  _onFlagCommentButton(comment){
    fetch(`https://afternoon-badlands-40242.herokuapp.com/flags`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        flaggable: comment.id,
        flaggable_type: 'comment'
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
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>{this.props.postTitle}</Text>
          <Text style={styles.text}>{this.props.postBody}</Text>
          <Text>{flag}</Text>
        <View style={styles.switchContainer}>
          <Switch
          onValueChange={(value) => {
              this.setState({falseSwitchIsOn: value});
              this._onFlagPostButton(value)
            }
          }
          onTintColor="red"
          style={{marginBottom: 10, alignItems: 'flex-end'}}
          thumbTintColor="#ffffff"
          tintColor="red"
          value={this.state.falseSwitchIsOn} />
        </View>

          <Text style={styles.header}> Comments </Text>
        </View>
      <ScrollView style={styles.commentContainer}>
        <View>{commentBox}</View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCommentView.bind(this)}
          enableEmptySections={true}
          style={styles.listView}
        />
      </ScrollView>
      <View style={styles.footerNav}>
        <TouchableOpacity style={styles.buttonNav} onPress={this._onAddCommentButton.bind(this)}>
          <Text style={styles.addBtnText}>ADD A COMMENT</Text>
        </TouchableOpacity>
      </View>
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
      deleteButton = "Delete"
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}> {comment.body} </Text>
        <TouchableOpacity style={styles.button} onPress={this._onFlagCommentButton.bind(this, comment)}>
          <Text>Flag Comment</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  switchContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end'
  },
  content:{
    marginTop: 90,
  },
  commentContainer:{
    marginTop: 10,
  },
  listView: {
    paddingTop: 1,
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
    fontFamily: 'Apple SD Gothic Neo',
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Apple SD Gothic Neo',
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
  },
  footerNav: {
    flex: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
  }
});

module.exports = Post;
