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
import * as types from "../../store/types";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Detay from "./CourseContent";
import Grades from "./Grades";
import Forum from "./Forum";

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
