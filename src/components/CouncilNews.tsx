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
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from "react-native";
// import Image from "react-native-scalable-image";
// import TabNavigator from "react-native-tab-navigator";
// import Icon from "react-native-vector-icons/FontAwesome";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
// import { Header } from "react-navigation";
// import DetailNews from "./DetailNews";

class CouncilNews extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> news </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "1%"
  }
});

export default CouncilNews;
