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
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Image from "react-native-scalable-image";
import Main from "./Main";

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
    this.setNavOp = this.setNavOp.bind(this);
    }
  state = { data: [], 
    loading: true,
    title: "News",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
 };

  
  componentWillMount() {
    Main.navigationOptions.title = this.state.title;
    /*const { setParams } = this.props.navigation;
    setParams({ headerTitle: (
        <Image
          resizeMode="contain"
          width={Dimensions.get("window").width}
          style={StyleSheet.absoluteFill}
          style={{ marginTop: 40 }}
          
          source={require("./img/header/anatepe2.png")}
        />
      ) });*/
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
      /*this.props.navigation.setParams({
        headerTitle: (
            <Image
              resizeMode="contain"
              width={Dimensions.get("window").width}
              style={StyleSheet.absoluteFill}
              style={{ marginTop: 40 }}
              
              source={require("./img/header/anatepe2.png")}
            />
          ),
          title: "Main",
          headerStyle: { backgroundColor: "#fff", height: 80 },
          headerLeft: null,
          gesturesEnabled: false
      });*/
  }

  setNavOp(props) {
    props.navigation.setParams({ 
      headerTitle: (
          <Image
            resizeMode="contain"
            width={Dimensions.get("window").width}
            style={StyleSheet.absoluteFill}
            style={{ marginTop: 40 }}
            
            source={require("./img/header/anatepe2.png")}
          />
        ),
        title: "Main",
        headerStyle: { backgroundColor: "#fff", height: 80 },
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
      <DetailNews key={Id} data={responseData} />
    ));
  }

  
  render() {

    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
        
        <HeaderImageScrollView
        maxHeight={120}
        minHeight={10}
        renderHeader={() => <Image resizeMode="contain" source={require("./img/header/anatepe2.png")} width={Dimensions.get("window").width} />}
        
        >
        <View style={{}}>
          <TriggeringView >
                <View style={styles.subContainer} >{this.renderData()}</View>
          </TriggeringView>
        </View>
      </HeaderImageScrollView>

        
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    //marginTop: 60
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    //width: Dimensions.get("window").width / 2,
    //flexDirection: "row",

  }
});

export default News;
