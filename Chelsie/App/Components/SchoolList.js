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
  ScrollView,
  Navigator,
  StatusBar,
  AsyncStorage,
  Image
} from 'react-native';

import School from './School'
import Separator from './Helpers/Separator'

// Navbar Routes
import Main from "./Main"
import AboutUs from "./AboutUs"
import Profile from './Profile'

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
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
        <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
        />
        <View style={styles.container}>
        <TextInput
        style={styles.searchBar}
        value={this.state.searchText}
        onChange={this.setSearchText.bind(this)}
        placeholder="Search" />
        <ScrollView style={styles.content}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderSchoolView.bind(this)}
              style={styles.listView}/>
          </ScrollView>
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

  _onButton(school){
    console.log("THIS IS SCHOOL WE'RE PASSING FROM LIST: ")
    console.log(school)

    AsyncStorage.setItem('last_school', JSON.stringify(school) )

    this.props.navigator.push({
      component: School,
      name: "School",
      passProps: {
        schoolName: school.name,
        schoolId: school.id
      },
    });
  }

  renderSchoolView(school){
    return (
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={(this._onButton.bind(this, school))}>
        <Text style={styles.text}>{school.name}</Text>
        <Separator/>
      </TouchableOpacity>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    top: 10,
    flex: 0.05,
  },
  activityLoading:{
    flex: 1,
    marginTop: 200,
    flexDirection: 'column',
  },
  rowContainer: {
    width: 410,
    padding: 10,
  },
  text: {
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'normal',
  },
  listView: {
    height: 500,
  },
  searchBar: {
    marginTop: 100,
    marginBottom: 20,
    marginLeft: 10,
    paddingLeft: 15,
    fontSize: 22,
    height: 10,
    width: 390,
    flex: 0.05,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'normal',
  },
});

module.exports = SchoolList;
