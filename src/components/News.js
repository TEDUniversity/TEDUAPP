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
  FlatList,
  ImageBackground
} from "react-native";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import DetailNews from "./DetailNews";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Header } from 'react-navigation';
import Image from "react-native-scalable-image";

const Spinner = ({ size }) => (
  <View >
    <ActivityIndicator size={size || "large"} />
  </View>
);

const MIN_HEIGHT = Header.HEIGHT;
//const MAX_HEIGHT = 135;
const getHeaderHeight = () => { 
    const currHeight = Dimensions.get("window").height;
    if (currHeight < 736) {
        return 120;
    } else if (currHeight > 735) {
        return 160;
    }
};


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
    
    state = { data: [], loading: true, deviceHeight: 0, MAX_HEIGHT: 0 };

  
  componentWillMount() {
    //const parseString = require("xml2js").parseString;
    //Below, i am trying to adjust header height based on different secreen heights for having responsive header but ı get "Invariant Violation: inputRange must be monotonically non-decreasing 0,NaN" error
    /*
    this.setState({ deviceHeight: Dimensions.get("window").height });
    const currHeight = this.state.deviceHeight;
    console.log("this.state.deviceHeight: " + this.state.deviceHeight);
    if (currHeight < 736) {
        this.setState({ MAX_HEIGHT: 120 });
        console.log("device height less than 736");
        console.log("currHeight: " + currHeight);
    } else if (currHeight >= 736) {
        console.log("device height greater than 736");
        console.log("currHeight: " + currHeight);
        this.setState({ MAX_HEIGHT: 140 });
    }*/

    const winHeight = Dimensions.get('window').height;
    console.log("winHeight" + winHeight);
    
    
    if (winHeight < 736) {
        console.log("device height less than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.175 }); //20%
    } else if (winHeight >= 736) {
        console.log("device height greater than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //20%
    }

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
      console.log("Width: " + Dimensions.get("window").width);
      console.log("Height: " + Dimensions.get("window").height);
      //console.log("this.state.deviceHeight:: " + this.state.deviceHeight);
      console.log("this.state.MAX_HEIGHT:: " + this.state.MAX_HEIGHT);

    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
        <HeaderImageScrollView
        maxHeight={this.state.MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => <Image
            resizeMode="stretch"
            width={Dimensions.get("window").width}
            style={StyleSheet.absoluteFill}
            style={{ }}
            source={require("./img/header/anatepe2.png")}
                               />}
            overlayColor="#144d8c"
            maxOverlayOpacity={1}
            bounces={false}
            contentOffset={ {x: 0, y:0}}
        >
        <ImageBackground source={require("./img/background/BACKGROUND.png")} style={{ width: Dimensions.get("window").width }} >
        
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={this.state.data}
                renderItem={({ item }) => <DetailNews data={item} />}
                numColumns={2}
                horizontal={false}
                keyExtractor={item => item.title}
            /> 
        
        </ImageBackground>
      </HeaderImageScrollView>
        
      );
    }
  }
}

//other way of using custom component(header collapsible scrollview) 
/*<HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          minOverlayOpacity={0.4}
          renderHeader={() => <Image source={require('../../assets/avignon.jpg')} style={styles.image} />}
          ScrollViewComponent={FlatList}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />*/

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

  },
  list: {
    marginBottom: 10,
  },
  listContent: {
      
  }
});
/*
<FlatList
                //style={styles.list}
                contentContainerStyle={styles.list}
                data={this.state.data}
                renderItem={({ item }) => <DetailNews data={item} />}
                numColumns={2}
                horizontal={false}
                keyExtractor={item => item.title}
            />  
*/
/*<View style={styles.container}>
        <ScrollView>
          <View style={styles.subContainer} >{this.renderData()}</View>
        </ScrollView>
      </View>*/

export default News;
