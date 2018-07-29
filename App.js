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
import Webview from "./src/components/Webview";




export default class App extends Component {
 
  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = createStackNavigator(
  {

    MainRouter: {
      screen: Main,
      
    },
    NewsRouter: News,
    MenuRouter: Menu,
    CouncilRouter: Council,
    CalendarRotuer: Calendar,
    MoodleRouter: Moodle,
    WebviewRouter: Webview,
  },
    {
      //headerMode: 'none',
      initialRouteName: "MainRouter",
      initialRouteParams: { showAlert: true, },
    }
);


//() => <Main showAlert={true} />