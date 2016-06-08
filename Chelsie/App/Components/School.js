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

// Navbar Routes
import Main from "./Main"
import AboutUs from "./AboutUs"
import Profile from './Profile'

var url = `https://afternoon-badlands-40242.herokuapp.com/schools`

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
      console.log(this.state.user_id);
    }).done();
  }

  fetchData() {
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}/posts`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
          loaded: true
        });
      })
      .done();
  }

  _onMainButton(){
    this.props.navigator.resetTo({
      component: Main,
      name: "Main"
    })
  }

  _onSchoolsButton(){
    this.props.navigator.resetTo({
      component: SchoolList,
      name: "SchoolList"
    })
  }

  _onProfileButton(){
    this.props.navigator.push({
      component: Profile,
      name: "Profile"
    })
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
        <Text style={styles.header}>{this.props.schoolName}</Text>
        <TouchableHighlight style={styles.button} onPress={this._onAddPostButton.bind(this)}>
          <Text style={styles.add}>Add Post</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPostView.bind(this)}
          style={styles.listView}
        />
        </ScrollView>
        <View style={styles.footerNav}>
          <TouchableOpacity style={styles.buttonNav} onPress={this._onMainButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/help.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNav} onPress={this._onSchoolsButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/resource.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNav} onPress={this._onProfileButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/info.png')} />
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

  _onBackButton(){
    this.props.navigator.pop()
  }

  renderPostView(post){
    return (
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={(this._onPostClick.bind(this, post))}
        underlayColor="white">
        <Text>{post.title}</Text>
         <Separator />
      </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    marginTop: 90,
  },
  listView: {
    paddingTop: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  add: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 14,
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    margin: 20
  },
  rowContainer: {
    padding: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Cochin',
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
  navBtn: {
    marginTop: 12,
    alignSelf: 'center'
  }
});

module.exports = School;
