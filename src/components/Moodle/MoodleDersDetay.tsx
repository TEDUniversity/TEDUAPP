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
  createMaterialTopTabNavigator,
  HeaderBackButton
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Moodle from "../../screens/Moodle";

interface IProp {
  navigation: any;
  courseId: string;
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
          <Text style={styles.text}>
            {this.props.navigation.state.params.courseId}
          </Text>
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

class back extends Component<IProp> {
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

const hScreen = createMaterialTopTabNavigator(
  {
    Detay: {
      screen: Detay,
      navigationOptions: {
        tabBarLabel: "Home Page",
        tabBarIcon: ({ tintColor }) => <Icon name="file-document" size={25} />
      }
    },
    Forum: {
      screen: Forum,
      navigationOptions: {
        tabBarLabel: "Forum",
        tabBarIcon: ({ tintColor }) => <Icon name="forum" size={25} />
      }
    },
    Grades: {
      screen: Grades,
      navigationOptions: {
        tabBarLabel: "Grades",
        tabBarIcon: ({ tintColor }) => <Icon name="contact-mail" size={25} />
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: "#144d8c"
      },
      activeTintColor: "white",
      inactiveTintColor: "gray",
      labelStyle: { fontSize: 20 },
      indicatorStyle: { backgroundColor: "black" }
    }
  }
);
export default hScreen;
