import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  ActivityIndicatorIOS,
  ScrollView,
  Navigator,
  Switch,
  StatusBar,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';

import Separator  from './Helpers/Separator'
import NewComment from './NewComment'
import Login      from './Login'

var deleteButton = null;

var flagText = "Login to Flag";
var flagBoolean = true;

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
      commentsFlagged: [],
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      flagId: '',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value !== null){
        flagText = "Flag This Post",
        flagBoolean = false
      }
      this.setState({user_id: value});
      this.fetchData(value)
    }).done();
  }


  fetchData(value) {
    if (value === null) {
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
      fetch(`https://afternoon-badlands-40242.herokuapp.com/flags/${this.state.user_id}`)
      .then((response) => response.json())
      .then((responseData) => {
        //Mark post as flagged as needed and store all comment IDs flagged by user in commentsFlagged array in props.
        for (var i = 0; i < responseData.length; i++) {
          if(responseData[i].flaggable_type === 'Post' && responseData[i].flaggable_id === this.state.postId){
            this.state.falseSwitchIsOn = true;
            this.setState({ flagId: responseData[i].id })
          } else if(responseData[i].flaggable_type === 'Comment') {
            this.state.commentsFlagged.push(responseData[i].flaggable_id)
          }
        }
      })
      .catch((error) => {
        console.warn(error);
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
        .catch((error) => {
          console.warn(error);
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

  _onFlagCommentButton(comment) {
    console.log("We flagged a thing!")
    console.log(comment)
    console.log(comment.id)
    var alreadyFlagged = false;

    for (var i = 0; i < this.state.commentsFlagged.length; i++) {
      if (comment.id === this.state.commentsFlagged[i]) {
        alreadyFlagged = true;
      }
    }

    if ( alreadyFlagged === true ) {
      Alert.alert('You have already flagged this comment. Thank you!')
      // fetch(`https://afternoon-badlands-40242.herokuapp.com/flags/${this.state.flagId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Access-Control-Allow-Methods': 'DELETE',
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user_id: this.state.user_id,
      //     flaggable: this.state.commentId,
      //     flaggable_type: "comment"
      //   })
      // })
      // .then((responseText) => responseText.json())
      // .then((responseData) => {
      //   console.log(responseData);
      // })
      // .catch((error) => {
      //   console.warn(error);
      // })
    } else {
      fetch(`https://afternoon-badlands-40242.herokuapp.com/flags`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          flaggable: comment.id,
          flaggable_type: "comment"
        })
      })
      .then((responseText) => responseText.json())
      .then((responseData) => {
        console.log("Flag created! Or atleast a response was received.")
        console.log(responseData)
        this.state.commentsFlagged.push(responseData.flaggable_id)
      })
      .catch((error) => {
        console.warn(error);
      })
    }
  }


  _loginButton(){
    this.props.navigator.push({
      component: Login,
      name: "Login"
    })
  }

  render(){
    return(
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
        <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
        />
        <View style={styles.content}>
          <Text style={styles.header}>{this.props.postTitle}</Text>
          <Text style={styles.text}>{this.props.postBody}</Text>
          <View style={styles.flexContainer}>
            <View style={styles.flagText}>
            <TouchableOpacity onPress={()=>{if (flagBoolean === true){this.props.navigator.push({name: "Login"})}}}>
              <Text style={styles.text}>{flagText}</Text>
            </TouchableOpacity>
            </View>
          <View style={styles.switchContainer}>
            <Switch
            onValueChange={(value) => {
                this.setState({falseSwitchIsOn: value});
                this._onFlagPostButton(value)
              }
            }
            onTintColor="gray"
            disabled={flagBoolean}
            style={{marginBottom: 10, alignItems: 'flex-end'}}
            thumbTintColor="#ffffff"
            tintColor="gray"
            value={this.state.falseSwitchIsOn} />
          </View>
          </View>
        <Text style={styles.header}> Responses </Text>
        <ScrollView style={styles.commentContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderCommentView.bind(this)}
            enableEmptySections={true}
            style={styles.listView}
          />
        </ScrollView>
        <View style={styles.footerNav}>
          <TouchableOpacity style={styles.buttonNav} onPress={this._onAddCommentButton.bind(this)}>
            <Text style={styles.addBtnText}>RESPOND</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Image>
    );
  }

  renderPostFlagSwitch(){
    return(
      <View>
        <Switch
          disabled={true}
          style={{marginBottom: 10}}
          value={true} />
      </View>
    )
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
      <View style={styles.rowContainer}>
        <Text style={styles.text}> {comment.body} </Text>
        <View style={styles.flagText}>
        <TouchableOpacity onPress={()=>{if (flagBoolean === true){this.props.navigator.push({name: "Login"})} else {this._onFlagCommentButton(comment)}}}>
          <Text style={styles.text}>{flagText}</Text>
        </TouchableOpacity>
        </View>
        <Separator />
      </View>
    );
  }

  _onAddCommentButton(){
    if(this.state.user_id !== null){
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
    } else {
      Alert.alert('Please login to respond.')
      this.props.navigator.push({
        component: Login,
        name: "Login"
      })
    }
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
  flagText:{
    alignItems: 'flex-end',
    width: 350,
    paddingRight: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  switchContainer: {
    width: 50,
    paddingRight: 8,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  commentContainer:{
    marginTop: 10,
  },
  listView: {
    paddingTop: 1,
    backgroundColor: 'transparent'
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 20,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 15,
    fontFamily: 'Apple SD Gothic Neo',
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFFFFF',
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 17,
    fontWeight: 'normal'
  },
  flexContainer: {
    marginTop: 20,
    alignItems: 'stretch',
    flexDirection: 'row',
    width: 400,
    marginBottom: 20,
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
  },
  rowContainer: {
    padding: 3,
    paddingLeft: 12,
    paddingRight: 12,
  },
});

module.exports = Post;
