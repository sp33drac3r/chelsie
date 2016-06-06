import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView,
  Navigator
} from 'react-native';

import Separator from './Helpers/Separator'

var url = `https://afternoon-badlands-40242.herokuapp.com/centers/geo/37.7749/-122.4194/10`

class Resource extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
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
    console.log("I made it to Resources!!!")
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
        <Text style={styles.header}> Local Resources </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderResourceView}
          style={styles.listView}
        />
        </ScrollView>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          color="#111"
          size="large"></ActivityIndicatorIOS>
      </View>
    );
  }

  renderResourceView(resource){
    return (
      <View style={styles.container}>
        <Text>{resource.name}</Text>
        <Text>{resource.address}</Text>
        <Separator />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    marginTop: 90,
  },
  word: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  listView: {
    paddingTop: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Cochin',
    alignSelf: 'center'
  }
});

module.exports = Resource;
