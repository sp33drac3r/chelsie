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


var url = `https://afternoon-badlands-40242.herokuapp.com/users`
var deleteButton = null;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      // userName: this.props.userName,
      // postId: this.props.postId,
      // postTitle: this.props.postTitle,
      // postBody: this.props.postBody,
      user_id: '',
    }
  }

  componentDidMount() {
    this.fetchData();
    AsyncStorage.getItem('user_id').then((value) => {
      console.log(value)
      this.setState({'user_id': value});
    }).done();
  }

  fetchData() {
    // fetch(`https://afternoon-badlands-40242.herokuapp.com/users/${this.state.userId}`)
    fetch(`https://afternoon-badlands-40242.herokuapp.com/users/1`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("***********************************ß")
        console.log(responseData)
        console.log("________________________________ß")
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true
        });
      })
      .done();
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.userName}</Text>
        <Text style={styles.header}> Posts </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPostView.bind(this)}
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

  renderPostView(post){

    if (this.state.user_id !== null && this.state.user_id == post.user_id) {
      console.log("I'm ALIIIVEEEE")
      deleteButton = "Delete"
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}> {post.title} </Text>
        <Text style={styles.text}> {post.body} </Text>
        <Text style={styles.text}> {deleteButton} </Text>
      </View>
    );
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

module.exports = Profile;