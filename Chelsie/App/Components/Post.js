import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Navigator
} from 'react-native';


var url = `https://afternoon-badlands-40242.herokuapp.com/schools`

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
      commentText: '',
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${this.state.schoolId}/posts/${this.state.postId}`)
      .then((response) => response.json())
      .then((responseData) => {
        {console.log(responseData)}
        {console.log(responseData.comments)}
        // this.setState({
        //   dataSource: this.state.dataSource.cloneWithRows(responseData),
        //   loaded: true
        // });
      })
      .done();
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.postTitle}</Text>
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
    fontSize: 30,
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

module.exports = Post;
