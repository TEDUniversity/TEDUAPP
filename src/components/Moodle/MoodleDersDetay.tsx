/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  StackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

interface IProp {
  navigation: any;
}

class Detay extends Component<IProp> {
  static navigationOptions = {
    title: "Detay",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.text}>This is ders detay.</Text>
        </View>
      </View>
    );
  }
}

class Forum extends Component<IProp> {
  static navigationOptions = {
    title: "Forum",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.text}>This is ders detay.</Text>
        </View>
      </View>
    );
  }
}

class Grades extends Component<IProp> {
  static navigationOptions = {
    title: "Notlar",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.text}>This is ders detay.</Text>
        </View>
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

// const detay = StackNavigator(
//   {
//     HayalListesi: { screen: HayalListe },
//     HayalDetay: { screen: HayalDetayScreen }
//   },
//   {
//     // Default config for all screens
//     headerMode: "none",
//     initialRouteName: "HayalListesi"
//   }
// );

const hScreen = createMaterialTopTabNavigator(
  {
    Detay: Detay,
    Forum: Forum,
    Grades: Grades
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#144d8c"
      },
      activeTintColor: "white",
      inactiveTintColor: "gray",
      labelStyle: { fontSize: 20 },
      indicatorStyle: {}
    }
  }
);
export default hScreen;
