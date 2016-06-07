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
  Navigator
} from 'react-native';

import Separator from './Helpers/Separator'
import SchoolList from './SchoolList'
import NewPost from './NewPost'

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
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}`)
      .then((response) => response.json())
      .then((responseData) => {
        {console.log(responseData)}
        {console.log(responseData.posts)}
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
          loaded: true
        });
      })
      .done();
  }

  render() {
    console.log("****ROUTE STACK*****")
    console.log(this.props.navigator.state.routeStack)

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
      name: "NewPost"
    })
  }
  _onPostClick (post){
    console.log("THIS IS POST WE'RE PASSING FROM LIST: ")
    console.log(post)
    this.props.navigator.push({
      component: Post,
      name: "Post",
      passProps: {
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
    backgroundColor: '#FFFFFF'
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
  }
});

module.exports = School;
