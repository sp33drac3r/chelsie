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

  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else if (this.state.dataSource === "No posts for this user"){
      return(
        <View>
          <View style={styles.content}>
          <Text style={styles.header}> {this.state.username} </Text>
          <Text style={styles.text}> You do not have any posts </Text>
          </View>
        </View>
      )
    } else {
      return(
        <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
          <View style={styles.content}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPostView.bind(this)}
            style={styles.listView}
          />
          </View>
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
    console.log(this)
    console.log(post)
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

  renderPostView(post){
    return (
      <View style={styles.container}>
        <Text>{post.title}</Text>
        <Text>{post.body}</Text>
        <TouchableOpacity style={styles.button} onPress={this._onDeleteButton.bind(this, post)}>
          <Text style={styles.add}>Delete Post</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  content:{
    marginTop: 90,
    alignItems: 'stretch'
  },
  listView: {
    paddingTop: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'Apple SD Gothic Neo',
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
    flex: 1,
    alignItems: 'stretch',
    alignSelf: 'center',
    backgroundColor: '#88FFFF',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Apple SD Gothic Neo',
  }
});

module.exports = Profile;
