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
  Image,
  AsyncStorage
} from 'react-native';

import Login from './Login'
import Separator from './Helpers/Separator'
import Post from './Post'

var url = `https://afternoon-badlands-40242.herokuapp.com/users`

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      user_id: '',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value === null) {
        this.props.navigator.resetTo({
          component: Login,
          name: 'Login',
          passProps: {
            message: "You must be logged in to view your profile.",
          }
        })
      } else {
        this.setState({'user_id': value});
        this.fetchData(value);
      }
    }).done();
  }

  fetchData(user_id) {
    fetch(`https://afternoon-badlands-40242.herokuapp.com/users/${user_id}`)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.response === "No posts for this user" ){
          this.setState({
            username: responseData.username,
            dataSource: responseData.response,
            loaded: true
          })
        } else {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
            username: responseData.username,
            loaded: true
          });
        }
      })
      .done();
  }

    _onLogoutButton () {
      AsyncStorage.removeItem('user_id')
        this.props.navigator.push({
          component: Login,
          name: 'Login'
        })
          console.log(this.state.user_id)
  }

  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else if (this.state.dataSource === "No posts for this user"){
      return(
        <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Text style={styles.text}> You do not have any posts </Text>
          </View>
        </Image>
      )
    } else {
      return(
          <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
          <ScrollView style={styles.content}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPostView.bind(this)}
            style={styles.listView}
          />
          </ScrollView>
          <TouchableOpacity style={styles.deleteButton} onPress={this._onLogoutButton.bind(this)}>
            <View>
              <Text style={styles.textResource}>Log out</Text>
            </View>
          </TouchableOpacity>
        </Image>
      );
    }
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

  _onDeleteButton(post){
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${post.school_id}/posts/${post.id}`, {
      method: 'delete',
      headers: {
        'Access-Control-Allow-Methods': 'DELETE',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        school_id: post.school_id,
        id: post.id
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

  _onPostButton (post) {
    console.log(post)
    this.props.navigator.push({
      component: Post,
      name: "Post",
      passProps: {
        schoolId: post.school_id,
        postTitle: post.title,
        postId: post.id,
        postBody: post.body
      },
    });
  }


  renderPostView(post){
    return (
      <View>
      <View style={styles.flexContainer}>
        <View style={styles.postContainer}>
          <TouchableOpacity
            sytle={styles.rowContainer}
            onPress={(this._onPostButton.bind(this, post))}
            underlayColor="white">
            <Text style={styles.textResource}>{post.title}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={this._onDeleteButton.bind(this, post)}>
          <View>
          <Image source={require('./../../imgs/delete.png')}/>
          </View>
          </TouchableOpacity>
        </View>
      </View>
      <Separator/>
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
  container: {
    flex: 1,
    width: 400,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  postContainer: {
    width: 370,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rowContainer: {
    padding: 10,
  },
  delete: {
    width: 30,
    color: '#fff',
    fontSize: 12,
  },
  content:{
    marginTop: 90,
    backgroundColor: 'transparent',
  },
  listView: {
    paddingTop: 1,
    backgroundColor: 'transparent',
  },
  text: {
    paddingLeft: 12,
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFF',
    fontSize: 16,
  },
  textResource:{
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    color: '#FFFFFF',
  },
  deleteButtonContainer:{
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  flexContainer: {
    alignItems: 'stretch',
    flexDirection: 'row',
    width: 400,
  },
});

module.exports = Profile;
