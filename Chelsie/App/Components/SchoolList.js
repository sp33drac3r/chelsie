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
        onPress={(this._onButton.bind(this, school))}
        underlayColor="white">
        <Text>{school.name}</Text>
        <Separator/>
      </TouchableOpacity>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    top: 90,
    // marginTop: 5,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  content: {
    // marginTop: 10,
  },
  rowContainer: {
    padding: 10,
  },
  word: {
    fontFamily: 'Apple SD Gothic Neo',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  listView: {
    height: 500,
    paddingTop: 1,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flex: 1,
    alignItems: 'stretch',
    margin: 20
  },
  searchBar: {
    // marginTop: 30,
    paddingLeft: 20,
    fontSize: 20,
    height: 2,
    flex: 0.1,
    borderWidth: 2,
    borderColor: '#E4E4E4',
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
  },
});

module.exports = SchoolList;
