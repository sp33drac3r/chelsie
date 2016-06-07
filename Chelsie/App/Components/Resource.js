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

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      resourceName: this.props.resourceName,
      resourceId: this.props.resourceId,
      resourceAddress: this.props.resourceAddress,
    }
  }

  render(){
    console.log(this.props.navigator.state.routeStack)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.resourceName}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    marginTop: 90,
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center'
  }
});

module.exports = Resource;
