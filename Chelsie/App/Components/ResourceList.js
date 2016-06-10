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
  Linking,
  Navigator
} from 'react-native';

import Separator from './Helpers/Separator'
import Resource from './Resource'
import Profile from './Profile'
import Communications from 'react-native-communications';

var hotlineUrl = `https://ohl.rainn.org/online/`


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
    console.log(lat)
    console.log(lng)
    var url = `https://afternoon-badlands-40242.herokuapp.com/centers/geo/${lat}/${lng}/10`
    console.log(url)
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

  _onHotlineButton(){
    Communications.phonecall('2134584288', true)
  }

  _onChatButton(){
    Linking.openURL(hotlineUrl)
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
        <View style={styles.footerNav}>
        <TouchableHighlight style={styles.button} onPress={this._onHotlineButton.bind(this)} underlayColor="#3D94A0">
          <Text style={ styles.bottomNav }>hotline</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onChatButton.bind(this)} underlayColor="#3D94A0">
          <Text style={ styles.bottomNav }>chat</Text>
        </TouchableHighlight>
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
          <Text style={styles.textResource}>{resource.name}</Text>
          <Text style={styles.textDistance}>Distance: {Math.round(resource.distance_in_miles*100)/100} miles</Text>
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
  textResource:{
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    color: '#FFFFFF',
  },
  textDistance:{
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 15,
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
  },
  footerNav: {
    flex: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  bottomNav: {
    justifyContent: 'center',
    alignItems: 'stretch',
    color: 'rgba(255,255,255,1)',
    fontWeight: '400',
    fontSize:16
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#29808C',
  },
  buttonNav: {
    flex: 1,
    marginTop: 5,
    alignSelf: 'stretch',
    height: 70,
    backgroundColor: '#29808C',
  },
  activityLoading:{
    flex: 1,
    marginTop: 200,
    flexDirection: 'column',
  },
});

module.exports = ResourceList;
