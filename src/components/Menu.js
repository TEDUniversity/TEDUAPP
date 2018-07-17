/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import BottomToolbarr from "./BottomToolbarr";

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
        <View style={{ flex: 1 }}>
          <Image
            resizeMode="contain"
            style={{ width, marginTop: -120 }}
            source={require("./img/header/anatepe2.png")}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.text}>This is Menu.</Text>
        </View>
        <BottomToolbarr navigation={this.props.navigation} />
      </View>
    );
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
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Menu;
