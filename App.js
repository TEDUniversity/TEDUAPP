/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import News from "./src/components/News";
import Moodle from "./src/components/Moodle";
import Menu from "./src/components/Menu";
import Council from "./src/components/Council";
import Calendar from "./src/components/Calendar";
import Main from "./src/components/Main";




export default class App extends Component {
 
  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = createStackNavigator(
  {
      MainRouter: Main,
      NewsRouter: News,
      MenuRouter: Menu,
      CouncilRouter: Council,
      CalendarRotuer: Calendar,
      MoodleRouter: Moodle,
  },
    {
      //headerMode: 'none',
      initialRouteName: "MainRouter",
    }
);
