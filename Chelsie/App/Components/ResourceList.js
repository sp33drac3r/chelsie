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
  Image,
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
      <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
        <Text style={styles.header}> LOCAL RESOURCES </Text>
        <ScrollView style={styles.content}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderResourceView.bind(this)}
          enableEmptySections={true}
          style={styles.listView}
        />
        </ScrollView>
      </Image>
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
          style={styles.rowContainer}
          onPress={(this._onResourceButton.bind(this, resource))}
          underlayColor="white">
          <Text style={styles.text}>{resource.name}</Text>
          <Text style={styles.text}>Distance: {Math.round(resource.distance_in_miles*100)/100} miles</Text>
        </TouchableOpacity>
      <Separator />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  rowContainer: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  content: {
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  listView: {
    paddingTop: 1,
    backgroundColor: 'transparent',
  },
  text:{
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    color: '#FFFFFF',
  },
  header: {
    marginTop: 90,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 10,
  }
});

module.exports = ResourceList;
