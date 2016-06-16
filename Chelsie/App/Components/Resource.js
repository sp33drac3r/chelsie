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
      resourceName:      this.props.resourceName,
      resourceAddress:   this.props.resourceAddress,
      resourceTel1:      this.props.resourceTel1,
      resourceTel2:      this.props.resourceTel2,
      resourceWeb:       this.props.resourceWeb,
      resourcePopServed: this.props.resourcePopServed,
    }
  }

  _onResourceButton(){
    Linking.openURL(this.props.resourceWeb)
  }

  _onMapButton(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
    return (
      <Image source={require('./../../imgs/gradient3.jpg')}
             style={styles.backgroundImage}>
        <View style={styles.content}>
        <ScrollView>
          <Text style={styles.header}>{this.props.resourceName}</Text>
          <TouchableOpacity onPress={this._onMapButton.bind(this)}>
            <Text style={styles.subheader}>Address: </Text>
            <Text style={styles.text}>{this.props.resourceAddress}</Text>
          </TouchableOpacity>
          <Text style={styles.subheader}>Telephone: </Text>
          <Text style={styles.text}>{this.props.resourceTel1}</Text>
          <Text style={styles.text}>{this.props.resourceTel2}</Text>
          <TouchableOpacity onPress={this._onResourceButton.bind(this)}>
            <Text style={styles.subheader}>Website: </Text>
            <Text style={styles.text}>{this.props.resourceWeb}</Text>
          </TouchableOpacity>
          <Text style={styles.subheader}>Population Served: </Text>
          <Text style={styles.text}>{this.props.resourcePopServed}</Text>
        </ScrollView>
        </View>
      </Image>
    )
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
  content: {
    flex: 1,
    paddingRight: 12,
    paddingLeft: 12,
    marginTop: 90,
    backgroundColor: 'transparent',
  },
  header: {
    alignSelf: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingBottom: 10,
  },
  subheader: {
    fontSize: 17.5,
    color: '#FFFFFF',
    paddingBottom: 3,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingBottom: 8,
  }
});

module.exports = Resource;
