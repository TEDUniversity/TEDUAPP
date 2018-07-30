/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import News from "./screens/News";
import Moodle from "./screens/Moodle";
import Menu from "./screens/Menu";
import Council from "./screens/Council";
import Calendar from "./screens/Calendar";
import Main from "./components/Main";
import Webview from "./components/Webview";

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    MainRouter: {
      screen: Main
    },
    NewsRouter: News,
    MenuRouter: Menu,
    CouncilRouter: Council,
    CalendarRotuer: Calendar,
    MoodleRouter: Moodle,
    WebviewRouter: Webview
  },
  {
    //headerMode: 'none',
    initialRouteName: "MainRouter",
    initialRouteParams: { showAlert: true }
  }
);

//() => <Main showAlert={true} />
