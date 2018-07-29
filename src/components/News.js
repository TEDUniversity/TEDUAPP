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
  ImageBackground,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import DetailNews from "./DetailNews";
import HorizontalList from "./HorizontalList";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Header } from 'react-navigation';
import Image from "react-native-scalable-image";

const Spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || "large"} />
  </View>
);
const MIN_HEIGHT = Header.HEIGHT - 20;
//const MAX_HEIGHT = 120;

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
  state = { data: [], dataEtkinlikler: [], dataHaberler: [], dataDuyurular: [], loading: true, MAX_HEIGHT: 0, scrollHeight: 0, 
    user: { name: "arda", surname: "tumay", age: "22", traits: { eye: "brown", tall: "185" } } };

  
    storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log(error);
        }
      }

    retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            //console.log(value);
            return value;
          }
         } catch (error) {
           // Error retrieving data
         }
      }
  componentWillMount() {
    //AsyncStorage.setItem("user", JSON.stringify(this.state.user), () => { AsyncStorage.getItem("user", (err, result) => { console.log(result); }); }); DENEME

    //AsyncStorage.getItem("user", (err, result) => { console.log(result); }); DENEME
 
    const winHeight = Dimensions.get('window').height;
    console.log("winHeight" + winHeight);
    
    if (winHeight < 736) {
        //console.log("device height less than 736");
        this.setState({ scrollHeight: winHeight * 0.755 }); //75.5%
    } else if (winHeight >= 736) {
        //console.log("device height greater than 736");
        this.setState({ scrollHeight: winHeight * 0.76 }); //76%
    }

    if (winHeight < 736) {
        //console.log("device height less than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.175 }); //17.5%
    } else if (winHeight >= 736) {
        //console.log("device height greater than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //18%
    }

    fetch("https://www.tedu.edu.tr/rss.xml")
      .then(response => response.text())
      .then(responseData => { 
                            //this.storeData("teduRSS", responseData);
                            console.log(responseData);
                            })
      .catch(error => console.log(error));
      

      //AsyncStorage.getItem("teduRSS", (err, result) => rssParser.parse(result))
      //.then(rss => { 
                     //this.whenLoaded(rss.items);
                     //console.log(rss.items.length); 
                    //});
    AsyncStorage.removeItem("teduRSS");
    this.retrieveData("teduRSS")
    .then(RSS => rssParser.parse(RSS))
    .then(result => { 
        this.whenLoaded(result.items); 
        console.log(result.items); 
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
      <DetailNews navigation={this.props.navigation} key={Id} data={responseData} imgsrc={"sarı"} />
    ));
  }
  renderDataEtkinlikler = () => {   
    return this.state.dataHaberler.map((responseData, Id) => (
      <DetailNews navigation={this.props.navigation} key={Id} data={responseData} imgsrc={"kırmızı"} />
    ));
  }
  renderDataHaberler = () => {
    return this.state.dataEtkinlikler.map((responseData, Id) => (
        <DetailNews navigation={this.props.navigation} key={Id} data={responseData} imgsrc={"mavi"} />
    ));
  }
  render() {
    //console.log("scrollHeigth: " + this.state.scrollHeight);
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
            source={require("../../img/header/anatepe2.png")}
                               />}
            overlayColor="#144d8c"
            maxOverlayOpacity={1}
            bounces={false}
        >
        <View>
        <ImageBackground source={require("../../img/background/BACKGROUND.png")} style={styles.mainBackGround}>
            <View style={{ marginBottom: 50 }}>
                <HorizontalList Data={this.renderDataDuyurular} title={"Duyurular"} />
                <HorizontalList Data={this.renderDataEtkinlikler} title={"Etkinlikler"}/>
                <HorizontalList Data={this.renderDataHaberler} title={"Haberler"} />
            </View>
        </ImageBackground>
        </View>
        </HeaderImageScrollView>
        
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: "space-between",
    //alignItems: "center",
    //marginTop: 30,
    height: 500,
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    width: Dimensions.get("window").width / 2,
    //flexDirection: "row",
  },
  mainBackGround: {
      width: '100%',
      flex: 1,
      height: null,
      
  }
});

export default News;

//if you want to scroll only the content not the header, add scrollview that capsulate horizontallists

//height={this.state.scrollHeight} add it to view component for responsivnes

/*
<ImageBackground source={require("./img/background/BACKGROUND.png")} style={styles.mainBackGround}>

            <View style={styles.container}>
                <ScrollView 
                scrollEnabled={false}
                >
                    <HorizontalList Data={this.renderDataDuyurular} title={"Duyurular"} />
                    <HorizontalList Data={this.renderDataEtkinlikler} title={"Etkinlikler"} />
                    <HorizontalList Data={this.renderDataHaberler} title={"Haberler"} />
                </ScrollView>
            </View>
            </ImageBackground>
*/