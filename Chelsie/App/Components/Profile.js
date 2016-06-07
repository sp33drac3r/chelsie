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
      this.setState({'user_id': value});
      this.fetchData(value);
    }).done();
  }

  fetchData(user_id) {
    fetch(`https://afternoon-badlands-40242.herokuapp.com/users/${user_id}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
          username: responseData.username,
          loaded: true
        });
      })
      .done();
  }

  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return(
      <View>
        <View style={styles.content}>
        <Text style={styles.header}> {this.state.username} </Text>
        <Text style={styles.header}> Posts </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPostView.bind(this)}
          style={styles.listView}
        />
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

  _onDeleteButton(){
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

  renderPostView(post){
    return (
      <View style={styles.container}>
        <Text>{post.title}</Text>
        <Text>{post.body}</Text>
        <TouchableOpacity style={styles.button} onPress={this._onDeleteButton.bind(this)}>
          <Text style={styles.add}>Add Post</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  content:{
    marginTop: 90,
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
    fontSize: 24,
    fontFamily: 'Cochin',
    alignSelf: 'center'
  }
});

module.exports = Profile;
