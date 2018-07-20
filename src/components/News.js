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
  Platform, 
  Animated
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
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.array = [];
    }
    //const HEADER_MIN_HEIGHT = 50;
    //const HEADER_MAX_HEIGHT = 200;
    state = { data: [], loading: true };

  
  componentWillMount() {  
    for (let i = 1; i <= 50; i++)
    {
        this.array.push(i);
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


    const headerHeight = this.scrollYAnimatedValue.interpolate(
        {
            inputRange: [ 0, ( 200 - 50 ) ],
            outputRange: [ 200, 50 ],
            extrapolate: 'clamp'
        });
     
        const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
        {
            inputRange: [ 0, ( 200 - 50 )  ],
            outputRange: [ '#212121', '#01579B' ],
            extrapolate: 'clamp'
        });
    
return (<View style = { styles.container }>
    <ScrollView 
        contentContainerStyle = {{ paddingTop: 200 }}
        scrollEventThrottle = { 16 }
        onScroll = { Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue }}}]
    )}>
    {
        this.array.map(( item, key ) =>
        (
            <View key = { key } style = { styles.item }>
                <Text style = { styles.itemText }>Row { item }</Text>
            </View>
        ))
    }
    </ScrollView>

    <Animated.View style = {[ styles.animatedHeader, { height: headerHeight, backgroundColor: headerBackgroundColor } ]}>
        <Text style = { styles.headerText }>Animated Header</Text>
    </Animated.View>
</View>);


    /*if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.subContainer} >{this.renderData()}</View>
          </ScrollView>
        </View>
      );
    }*/
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
    width: Dimensions.get("window").width / 2,
    //flexDirection: "row",

  },
  container:
    {
        flex: 1,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },
 
    animatedHeader:
    {
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 20 : 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    headerText:
    {
        color: 'white',
        fontSize: 22
    },
 
    item:
    {
        backgroundColor: '#E0E0E0',
        margin: 8,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    itemText:
    {
        color: 'black',
        fontSize: 16
    }
});

export default News;