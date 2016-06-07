import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Image,
  ScrollView,
  StatusBar,
  Navigator
} from 'react-native';

import ResourceList from "./ResourceList"
import ImmediateAssistance from "./ImmediateAssistance"
import AboutUs from "./AboutUs"
import Login from "./Login"

var url = `https://afternoon-badlands-40242.herokuapp.com/schools`

class Main extends Component {
  constructor(props){
    super(props)
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
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/2`)
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

  _onASAPButton(){
    this.props.navigator.push({
      component: ImmediateAssistance,
      name: "ImmediateAssistance"
    })
  }

  _onResourcesButton(){
    this.props.navigator.push({
      component: ResourceList,
      name: "ResourceList"
    })
  }

  _onAboutUsButton(){
    this.props.navigator.push({
      component: AboutUs,
      name: "AboutUs"
    })
  }

  _onLoginButton(){
    this.props.navigator.push({
      component: Login,
      name: "Login"
    })
  }

  render(){
    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
      />
      <ScrollView>
        <TouchableHighlight onPress={this._onAboutUsButton.bind(this)}>
      <Text style={styles.header}>You Are Not Alone</Text>
      </TouchableHighlight>
      <View style={styles.cotent}>
      <Text style={styles.content}>Cronut fanny pack waistcoat food truck. Cronut fanny pack waistcoat food truck. Cronut fanny pack waistcoat food truck.</Text>
      </View>
      </ScrollView>
        <View style={styles.footerNav}>
          <TouchableHighlight style={styles.button} onPress={this._onASAPButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/help.png')} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onResourcesButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/resource.png')} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onAboutUsButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/info.png')} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._onLoginButton.bind(this)}>
            <Image style={styles.navBtn} source={require('./../../imgs/group.png')} />
          </TouchableHighlight>
          </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#EAFCFD',
  },
  footerNav: {
    flex: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  button: {
    flex: 1,
    marginTop: 5,
    alignSelf: 'stretch',
    height: 70,
    backgroundColor: '#29808C',
  },
  navBtn: {
    marginLeft: 15,
    marginTop: 15,
  },
  header: {
    fontWeight: 'bold',
    marginTop: 110,
    fontSize: 20,
    color: '#29808C',
    fontFamily: 'Arial',
    alignSelf: 'center'
  },
  content: {
    borderColor: 'red',
    fontWeight: 'bold',
    marginTop: 90,
    paddingTop: 10,
    fontSize: 20,
    color: '#29808C',
    fontFamily: 'Arial',
    alignSelf: 'center'
  }
});

module.exports = Main;
