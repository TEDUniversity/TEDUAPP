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
  Dimensions
} from "react-native";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import DetailNews from "./DetailNews";
import HorizontalList from "./HorizontalList";

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
    //this.renderDataDuyurular = this.renderDataDuyurular.bind(this);
    //this.renderDataEtkinlikler = this.renderDataEtkinlikler.bind(this);
    //this.renderDataHaberler = this.renderDataHaberler.bind(this);
    }
  state = { data: [], dataEtkinlikler: [], dataHaberler: [], dataDuyurular: [], loading: true };

  
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
    //other way of traversing an array
    /*const arrayLength = this.state.data.length;
    for (let i = 0; i < arrayLength; i++) {
        //console.log(this.state.data[i]);
        if (this.state.data[i].link.includes("gundem/duyurular")) {
            //this.setState({ dataDuyurular: this.state.dataDuyurular.concat(item) });
            console.log("1");
        } else if (this.state.data[i].link.includes("gundem/etkinlikler")) {
            //this.setState({ dataEtkinlikler: this.state.dataEtkinlikler.concat(item) });
            console.log("2");
        } else if (this.state.data[i].link.includes("gundem/haberler")) {
            //this.setState({ dataHaberler: this.state.dataHaberler.concat(item) });
            console.log("3");
        }
    }*/
    //one way of traversing an array
    this.state.data.map((item) => {
        if (item.links[0].url.includes("gundem/duyurular")) {
            this.setState({ dataDuyurular: this.state.dataDuyurular.concat(item) });
        } else if (item.links[0].url.includes("gundem/etkinlikler")) {
            this.setState({ dataEtkinlikler: this.state.dataEtkinlikler.concat(item) });
        } else if (item.links[0].url.includes("gundem/haberler")) {
            this.setState({ dataHaberler: this.state.dataHaberler.concat(item) });
        }
        //console.log(item.links[0].url);
    });
    console.log(this.state.dataDuyurular);
    console.log(this.state.dataEtkinlikler);
    console.log(this.state.dataHaberler);
    this.setState({ loading: false });
    //console.log(JSON.stringify(response));
    //console.log(this.state.data);
  }
  renderDataDuyurular = () => {
    return this.state.dataDuyurular.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} />
    ));
  }
  renderDataEtkinlikler = () => {
    return this.state.dataHaberler.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} />
    ));
  }
  renderDataHaberler = () => {
    return this.state.dataEtkinlikler.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} />
    ));
  }
  render() {
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
            <View style={styles.container}>
                <ScrollView 
                scrollEnabled={false}
                >
                    <HorizontalList Data={this.renderDataDuyurular} title={"Duyurular"} />
                    <HorizontalList Data={this.renderDataEtkinlikler} title={"Etkinlikler"} />
                    <HorizontalList Data={this.renderDataHaberler} title={"Haberler"} />
                </ScrollView>
            </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "space-between",
    //alignItems: "center",
    marginTop: 30
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    width: Dimensions.get("window").width / 2,
    //flexDirection: "row",
  },
});

export default News;
