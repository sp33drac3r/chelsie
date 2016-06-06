import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import Post from "./Post"
import NewComment from "./NewComment"
import SchoolList from "./SchoolList"

class Community extends Component {

  _onPostButton(){
    this.props.navigator.push({
      component: Post,
      name: "Post"
    })
  }

  _onNewCommentButton(){
    this.props.navigator.push({
      component: NewComment,
      name: "NewComment"
    })
  }

  _onSchoolButton(){
    this.props.navigator.push({
      component: SchoolList,
      name: "SchoolList"
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Community </Text>
        <TouchableHighlight style={styles.button} onPress={this._onPostButton.bind(this)}>
          <Text style={styles.buttonText}> New Post </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onNewCommentButton.bind(this)}>
          <Text style={styles.buttonText}> New Comment </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onSchoolButton.bind(this)}>
          <Text style={styles.buttonText}> Schools </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: '#B5E3FF',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Cochin',
    alignSelf: 'center'
  }
});

module.exports = Community;
