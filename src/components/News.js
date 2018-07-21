/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated,
  FlatList,
  ListView
} from "react-native";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import DetailNews from "./DetailNews";

const Spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || "large"} />
  </View>
);

class News extends Component {
    
  static navigationOptions = {
    title: "News",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.renderData = this.renderData.bind(this);
    this.state = { data: [], loading: true };
    }
  

  
  componentWillMount() {
    //const parseString = require("xml2js").parseString;
    
    fetch("https://www.tedu.edu.tr/rss.xml")
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(rss => {
        this.whenLoaded(rss.items);
        console.log(rss.items.length);
      });
  }


  componentDidMount() {
    this.props.setNavigationOptions({
    title: "News",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
    });
  }

  whenLoaded(response) {
    this.setState({ data: response });
    this.setState({ loading: false });
    //console.log(JSON.stringify(response));
    //console.log(this.state.data);
  }

  renderData() {
    return this.state.data.map((responseData, Id) => (
      <DetailNews  data={responseData} />
    ));
  }

  render() {
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (

        <View style={styles.container}>
            <FlatList
                //style={styles.list}
                contentContainerStyle={styles.list}
                data={this.state.data}
                renderItem={({ item }) => <DetailNews data={item} />}
                numColumns={2}
                horizontal={false}
                keyExtractor={item => item.title}
            />
         </View>
    
      );
    }
  }

  /*render() {
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
          <View>
          <ScrollView
          contentContainerStyle={styles.grid}
          >
            
            <View style={styles.subContainer} >{this.renderData()}</View>
          </ScrollView>
          </View>
      );
    }
  }*/
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginRight: 5,
    //marginLeft: 5,
  },
  list: {

  },
  text: {
    fontWeight: "bold"
  },
});

/*const styles = StyleSheet.create({
    grid: {
      marginTop: 40,
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center',
    flexDirection: 'row',
        flexWrap: 'wrap',
    },
    list: {
      
  
    },
    text: {
      fontWeight: "bold"
    },
    subContainer: {
    }
  });*/

export default News;