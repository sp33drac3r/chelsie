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
      resourceAddress: this.props.resourceAddress,
      resourceTel1: this.props.resourceTel1,
      resourceTel2: this.props.resourceTel2,
      resourceWeb: this.props.resourceWeb,
      resourcePopServed: this.props.resourcePopServed,
    }
  }

  render(){
    console.log(this.props.navigator.state.routeStack)
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>{this.props.resourceName}</Text>
          <Text style={styles.text}>{this.props.resourceAddress}</Text>
          <Text style={styles.text}>{this.props.resourceTel1}</Text>
          <Text style={styles.text}>{this.props.resourceTel2}</Text>
          <Text style={styles.text}>{this.props.resourceWeb}</Text>
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
