/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { ImageBackground, Linking, TouchableOpacity,
 Text, View, StyleSheet, Dimensions, WebView } from "react-native";
import Image from "react-native-scalable-image";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Header } from 'react-navigation';

const MIN_HEIGHT = Header.height;

class Menu extends Component {
  static navigationOptions = {
    title: "Menu",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false,
    style: {
      color: "#000000"
    }
  };
  state={ MAX_HEIGHT: 0 }

  componentWillMount(){
    const winHeight = Dimensions.get('window').height;
    console.log("winHeight" + winHeight);
    
    
    if (winHeight < 736) {
        console.log("device height less than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.175 }); //20%
    } else if (winHeight >= 736) {
        console.log("device height greater than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //20%
    }
  }

  render() {
    //Linking.openURL(`https://www.tedu.edu.tr/tr`)
    
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
            bounces={true}
            contentOffset={ {x: 0, y:0}}
            
        >
        
        <ImageBackground source={require("../../img/background/BACKGROUND.png")} style={{ width: Dimensions.get("window").width }} >
        <View style={styles.container}>
        <ImageBackground source={require("../../img/background/BACKGROUND.png")} style={styles.mainBackGround}>
        <TouchableOpacity style={styles.subContainer} onPress={() => { return (<WebView source={{ uri: 'https://www.tedu.edu.tr/tr' }} />); }} >
            <ImageBackground source={require("../../img/subMenu/menu1.jpg")} style={{ width: Dimensions.get("window").width, height: 60  }}>
                <Text style={styles.text}>Fitness center programme</Text>
            </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("../../img/subMenu/menu2.jpg")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>Cafeteria programme</Text>
            </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("../../img/subMenu/menu3.jpg")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>TEDU Portal</Text>
            </ImageBackground>        
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("../../img/subMenu/menu4.jpg")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>Karafanzin</Text>
            </ImageBackground>        
          </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("../../img/subMenu/menu6.png")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>Academic calender</Text>
          </ImageBackground>        
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("../../img/subMenu/menu7.png")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>Listen radio tedu</Text>
          </ImageBackground>        
        </TouchableOpacity>
        </ImageBackground>
      </View>
        </ImageBackground>
        
      </HeaderImageScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    height: 493
  },
  text: {
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
    textAlignVertical: 'center',
    
  },
  mainBackGround: {
    flex: 1, 
    alignSelf: 'stretch', 
    resizeMode: 'cover', 
    width: null, 
    height: null 
  },
  subContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: 'center',
  }
});

export default Menu;
