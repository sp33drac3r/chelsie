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
      <View style={styles.container}>
      <ScrollView style={styles.content}>
          <TextInput
          style={styles.searchBar}
          value={this.state.searchText}
          onChange={this.setSearchText.bind(this)}
          placeholder="Search" />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderSchoolView.bind(this)}
            style={styles.listView}/>
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

  _onButton(school){
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
    marginTop: 5,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  content: {
    marginTop: 90,
  },
  rowContainer: {
    padding: 10,
  },
  word: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  listView: {
    paddingTop: 1,
  },
  row: {
    flex: 1,
    alignItems: 'stretch',
    margin: 20
  },
  searchBar: {
    marginTop: 74,
    paddingLeft: 30,
    fontSize: 22,
    height: 8,
    flex: .1,
    borderWidth: 9,
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
