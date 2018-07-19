/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
<<<<<<< HEAD
import { Text, View, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import Image from 'react-native-scalable-image';


class News extends Component {
    static navigationOptions = {
        
      };
    
      state = { data: [], loading: true };
=======
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import Detail from "./DetailNews";

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
>>>>>>> master

  state = { data: [], loading: true };

  /*    
      xml parse etmek için bulduğum linkler aşağıda 
      https://www.npmjs.com/package/xmldom
      https://github.com/Leonidas-from-XIV/node-xml2js
      https://stackoverflow.com/questions/29805704/react-native-fetch-xml-data
      */

<<<<<<< HEAD
    //chrome dan js debug yaparak görebilirsin console log ları
    componentWillMount() {
        //internetten bulduğum kod burda ama çalışmıyor
        //const parseString = require('xml2js').parseString;
        //const xml = "<root>Hello xml2js!</root>"
        /*axios
          .get("https://www.tedu.edu.tr/rss.xml")
          .then(response => {
            parseString(response, (err, result) => {
                console.log(result);
                });
          });*/
        
        //Yunusmarkette kullandığımız kod aşağıda
        //browser da  linki açarak response u görebilirsin
        /*axios
=======
  //chrome dan js debug yaparak görebilirsin console log ları
  componentWillMount() {
    //internetten bulduğum kod burda ama çalışmıyor
    const parseString = require("xml2js").parseString;
    // const xml = "<root>Hello xml2js!</root>";

    // axios.get("https://www.tedu.edu.tr/rss.xml").then(response => {
    //   parseString(fs.read(response), (err, result) => {
    //     alert(result + " err:" + err);
    //     this.whenLoaded(result + " err:" + err);
    //   });
    // });

    fetch("https://www.tedu.edu.tr/rss.xml")
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(rss => {
        this.whenLoaded(rss.items);
        console.log(rss.items.length);
      });

    // (async () => {
    //   let feed = await parser.parseURL("https://www.reddit.com/.rss");
    //   alert(feed.title);

    //   feed.items.forEach(item => {
    //     console.log(item.title + ":" + item.link);
    //   });
    // })();

    //Yunusmarkette kullandığımız kod aşağıda
    //browser da  linki açarak response u görebilirsin
    /*axios
>>>>>>> master
          .get("https://www.tedu.edu.tr/rss.xml")
          .then(response => {
            this.whenLoaded(response);
          })
          .catch(error => {
            console.log(error);
          });*/
  }

<<<<<<< HEAD
    sendNavOps = props => {
        this.props.navOp.setParams({
            headerTitle: (
                <Image resizeMode="contain" width={Dimensions.get('window').width} style={{ marginTop: 40 }} source={require("./img/header/anatepe2.png")} />
            ),
            title: "Council",
            headerStyle: { marginTop: 0, backgroundColor: "#fff" },
            headerLeft: null,
            gesturesEnabled: false,
        });
    }

    render() {
    this.sendNavOps();
    return (
=======
  whenLoaded(response) {
    this.setState({ data: response });
    this.setState({ loading: false });
    alert(JSON.stringify(response));
    // console.log(this.state.data);
  }
  renderData() {
    return this.state.data.map((responseData, Id) => (
      <Detail key={Id} data={responseData} />
    ));
  }
  render() {
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
>>>>>>> master
        <View style={styles.container}>
          <ScrollView style={styles.subContainer}>
            <Detail data={this.state.data[1]} />
            {/* <Text>{this.state.data[0].title}</Text> */}
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
    flex: 1
    // alignItems: "center"
  }
});

export default News;
