import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  ActivityIndicatorIOS,
  ScrollView,
  Linking,
  Image,
  Navigator
} from 'react-native';

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      resourceName: this.props.resourceName,
      resourceAddress: this.props.resourceAddress,
      resourceTel1: this.props.resourceTel1,
      resourceTel2: this.props.resourceTel2,
      resourceWeb: this.props.resourceWeb,
      resourcePopServed: this.props.resourcePopServed,
    }
  }

  _onResourceButton(){
    console.log(this.props.resourceWeb)
    Linking.openURL(this.props.resourceWeb)
  }

  _onMapButton(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        mapUrl = `http://maps.apple.com/?sll=${lat},${lng}&daddr=${this.props.resourceAddress}`
        Linking.openURL(mapUrl)
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render(){
    console.log(this.props.navigator.state.routeStack)
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>{this.props.resourceName}</Text>
          <TouchableOpacity onPress={this._onMapButton.bind(this)}>
            <Text style={styles.text}>{this.props.resourceAddress}</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{this.props.resourceTel1}</Text>
          <Text style={styles.text}>{this.props.resourceTel2}</Text>
          <TouchableOpacity onPress={this._onResourceButton.bind(this)}>
            <Text style={styles.text}>{this.props.resourceWeb}</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{this.props.resourcePopServed}</Text>
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 90,
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center'
  }
});

module.exports = Resource;
