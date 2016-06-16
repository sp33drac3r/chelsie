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
  Image,
  Navigator,
  AsyncStorage
} from 'react-native';

import Separator from './Helpers/Separator'
import SchoolList from './SchoolList'
import NewPost from './NewPost'
import Post from './Post'
import Main from "./Main"
import Profile from './Profile'

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      schoolName: this.props.schoolName,
      schoolId: this.props.schoolId,
      schoolAddress: this.props.schoolAddress,
      postId: '',
      postTitle: '',
      postBody: '',
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
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}/posts`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
          loaded: true
        });
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
        <ScrollView style={styles.content}>
        <Text style={styles.header}>{this.props.schoolName}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPostView.bind(this)}
          style={styles.listView}
        />
        </ScrollView>
        <View style={styles.footerNav}>
          <TouchableOpacity style={styles.buttonNav} onPress={this._onAddPostButton.bind(this)}>
            <Text style={styles.addBtnText}>ADD A POST</Text>
          </TouchableOpacity>
        </View>
      </Image>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.activityLoading}>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          color="#111"
          size="large"></ActivityIndicatorIOS>
      </View>
    );
  }

  _onAddPostButton(){
    this.props.navigator.push({
      component: NewPost,
      name: "NewPost",
      passProps: {
        schoolId: this.state.schoolId,
        schoolName: this.state.schoolName,
        schoolAddress: this.state.schoolAddress
      }
    })
  }
  _onPostClick (post){
    this.props.navigator.push({
      component: Post,
      name: "Post",
      passProps: {
        schoolId: this.state.schoolId,
        postTitle: post.title,
        postId: post.id,
        postBody: post.body
      },
    });
  }

  renderPostView(post){
    return (
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={(this._onPostClick.bind(this, post))}
        underlayColor="white">
        <Text style={styles.postTitle}>{post.title}</Text>
         <Separator />
      </TouchableOpacity>
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
  postTitle:{
    color: '#FFFFFF',
  },
  activityLoading:{
    flex: 1,
    marginTop: 200,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  content: {
    marginTop: 90,
    backgroundColor: 'transparent',
  },
  listView: {
    paddingTop: 1,
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFFFFF',
    fontSize: 30,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    opacity: 0.1,
  },
  rowContainer: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 20,
    paddingBottom: 15,
    fontFamily: 'Apple SD Gothic Neo',
    alignSelf: 'center'
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

module.exports = School;
