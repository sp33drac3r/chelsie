import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

var url = `https://afternoon-badlands-40242.herokuapp.com/`

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
      (position) => { console.log(position) }
    )
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

  _onBackButton(){
    this.props.navigator.pop({
    })
  }

  render() {
    console.log("I made it to Resources!!!")
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <TouchableHighlight style={styles.backButton} onPress={this._onBackButton.bind(this)}>
          <Text> back </Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderResourceView}
          style={styles.listView}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading resources...
        </Text>
      </View>
    );
  }

  renderResourceView(resource){
    return (
      <View style={styles.container}>
        <Text>{resource.name}</Text>
        <Text>{resource.address}</Text>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  other: {
    flex: 1,
    backgroundColor: '#aaeaca'
  },
  word: {
    fontFamily: 'Cochin',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  listView: {
    paddingTop: 30,
    backgroundColor: '#FFFFFF'
  },
  backButton:{
    paddingTop: 30,
  }
});

module.exports = Resource;
