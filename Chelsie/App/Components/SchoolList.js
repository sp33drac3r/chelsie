import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Navigator,
  AsyncStorage
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
      posts: '',
      searchText: '',
      school: '',
      user_id: ''
    };
  }

  componentDidMount() {
    this.fetchData();
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({'user_id': value});
      console.log(this.state.user_id);
    }).done();
  }

  componentDidUpdate() {
    if (this.state.searchText === '') {
      this.fetchData();
    }
  }

  fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  filterSchools(searchText, schools) {
    var text = searchText.toLowerCase();
    var rows = [];

   for (var i=0; i < schools.length; i++) {
     var schoolName = schools[i].name.toLowerCase();
     if(schoolName.search(text) !== -1){
         rows.push(schools[i]);
    }
  }

  this.setState({
      dataSource: this.state.dataSource.cloneWithRows(rows),
      loaded: true,
     });
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
        this.filterSchools(searchText, responseData);
    })
    .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <TextInput
        style={styles.searchBar}
        value={this.state.searchText}
        onChange={this.setSearchText.bind(this)}
        placeholder="Search" />
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
    // console.log(JSON.parse(JSON.stringify(school)).name)
    AsyncStorage.setItem('last_school', JSON.stringify(school) )

    this.props.navigator.push({
      component: School,
      name: "School",
      passProps: {
        schoolName: school.name,
        schoolId: school.id
        // schoolAddress: school.address
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
  searchBar: {
    paddingLeft: 30,
    fontSize: 22,
    height: 10,
    flex: .1,
    borderWidth: 9,
    borderColor: '#E4E4E4',
  },
});

module.exports = SchoolList;
