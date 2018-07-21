/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, Text, View, StyleSheet, Dimensions } from "react-native";
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
    const { width } = Dimensions.get("window");
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.subContainer}>
            <ImageBackground source={require("./img/subMenu/menu1.jpg")} style={{ width: Dimensions.get("window").width,height: 60  }}>
                <Text style={styles.text}>This is Menu.</Text>
            </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("./img/subMenu/menu2.jpg")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>This is Menu.</Text>
            </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("./img/subMenu/menu3.jpg")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>This is Menu.</Text>
            </ImageBackground>        
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("./img/subMenu/menu4.jpg")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>This is Menu.</Text>
            </ImageBackground>        
          </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("./img/subMenu/menu6.png")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>This is Menu.</Text>
          </ImageBackground>        
        </TouchableOpacity>
        <TouchableOpacity style={styles.subContainer}>
          <ImageBackground source={require("./img/subMenu/menu7.png")} style={{ width: Dimensions.get("window").width, height: 60 }}>
                <Text style={styles.text}>This is Menu.</Text>
          </ImageBackground>        
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,

  },
  text: {
    fontWeight: "bold",
    color: "white",
    alignItems: "center",
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: "center",
    alignSelf: 'center'
  },
  subContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignSelf: 'center',

  }
});

export default Menu;
