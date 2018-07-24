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

  render() {
    //Linking.openURL(`https://www.tedu.edu.tr/tr`)
    const { width } = Dimensions.get("window");
    return (
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
