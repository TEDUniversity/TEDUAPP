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
  ActivityIndicator
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
    }
  state = { data: [], loading: true };

  
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

  whenLoaded(response) {
    this.setState({ data: response });
    this.setState({ loading: false });
    //console.log(JSON.stringify(response));
    //console.log(this.state.data);
  }
  renderData() {
    return this.state.data.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} />
    ));
  }
  render() {
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.subContainer}>
            {this.renderData()}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    flex: 1,
  }
});

export default News;