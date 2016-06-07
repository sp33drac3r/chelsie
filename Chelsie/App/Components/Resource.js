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
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position)
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var initialPosition = JSON.stringify(position);
      this.setState({initialPosition});
      this.fetchData(lat,lng);
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
  }


  fetchData(lat, lng) {
    var url = `https://afternoon-badlands-40242.herokuapp.com/centers/geo/${lat}/${lng}/10`
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
