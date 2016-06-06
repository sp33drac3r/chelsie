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

import School from './School'

var url = `https://afternoon-badlands-40242.herokuapp.com/schools`

class SchoolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      title: '',
      schoolName: '',
      schoolId: '',
      schoolAddress: '',
      posts: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        {console.log(responseData)}
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderSchoolView.bind(this)}
          style={styles.listView}
        />
      <View style={styles.subcontainer}>
        <TouchableHighlight style={styles.button} onPress={this._onBackButton.bind(this)}>
          <Text style={styles.word}>Test</Text>
        </TouchableHighlight>
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

  _onButton(school){
    console.log("THIS IS SCHOOL WE'RE PASSING FROM LIST: ")
    console.log(school)

    this.props.navigator.push({
      component: School,
      name: "School",
      passProps: {
        schoolName: school.name,
        schoolId: school.id,
        schoolAddress: school.address
      },
    });


    // fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${school.id}`)
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     console.log(responseData)
    //     this.props.navigator.push({
    //       component: School,
    //       name: "School",
    //       passProps: {
    //         schoolName: responseData.school.name,
    //         schoolId: responseData.school.id,
    //         schoolAddress: responseData.school.address
    //       },
    //     });
    //   }).done();
  }

  _onBackButton(){
    this.props.navigator.pop()
  }

  renderSchoolView(school){
    return (
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={(this._onButton.bind(this, school))}
        underlayColor="white">
        <Text>{school.name}</Text>
      </TouchableOpacity>
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
  subcontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  listView: {
    paddingTop: 30,
    backgroundColor: '#FFFFFF'
  },
  row: {
  flex: 1,
  alignItems: 'stretch',
  margin: 20
  },
});

module.exports = SchoolList;
