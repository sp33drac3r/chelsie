import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView,
  Navigator
} from 'react-native';

import Separator from './Helpers/Separator'
import Resource from './Resource'
import Profile from './Profile'


class ResourceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      resourceID: '',
      resourceName: '',
      resourceAddress: '',
      resourceZip: '',
      resourcePopServed: '',
      resourceTel1: '',
      resourceTel2: '',
      resourceWeb: ''
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
          renderRow={this.renderResourceView.bind(this)}
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

  _onResourceButton(resource){
    fetch(`https://afternoon-badlands-40242.herokuapp.com/centers/${resource.id}`)
      .then((response) => response.json())
      .then(responseData => {
        console.log(responseData)
        this.props.navigator.push({
          component: Resource,
          name: "Resource",
          passProps: {
            resourceID: responseData.id,
            resourceName: responseData.name,
            resourceAddress: responseData.address,
            resourcePopServed: responseData.populations_served,
            resourceTel1: responseData.telephone,
            resourceTel2: responseData.tty,
            resourceWeb: responseData.website
          },
      });
    }).done();
  }

  renderResourceView(resource){
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          onPress={(this._onResourceButton.bind(this, resource))}
          underlayColor="white">
          <Text>{resource.name}</Text>
          <Text>Distance: {Math.round(resource.distance_in_miles*100)/100} miles</Text>
        </TouchableOpacity>
      <Separator />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EAFCFD'
  },
  content: {
    marginTop: 90,
    marginLeft: 10,
  },
  word: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  listView: {
    paddingTop: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Cochin',
    alignSelf: 'center',
    marginBottom: 10,
  }
});

module.exports = ResourceList;
