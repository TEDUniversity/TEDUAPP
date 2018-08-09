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
import Main from "./screens/Main";
import Webview from "./components/Webview";
import Survey from "./components/Survey/Survey";
import firebase from "firebase";


// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

export default class App extends Component {
  constructor(){
    var config = {
      databaseURL: "https://teduapp-210c9.firebaseio.com",
      projectId: "teduapp-210c9",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }
  

  render() {
    return <RootStack />;
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
    WebviewRouter: Webview,
    SurveyRouter: Survey,
  },
  {
    //headerMode: 'none',
    initialRouteName: "MainRouter",
    initialRouteParams: { showAlert: true }
  }
);

//() => <Main showAlert={true} />
/*

<script src="https://www.gstatic.com/firebasejs/5.3.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA1mZtQ1X-R-ftJKSHPoHXydyzetDkfnow",
    authDomain: "teduapp-210c9.firebaseapp.com",
    databaseURL: "https://teduapp-210c9.firebaseio.com",
    projectId: "teduapp-210c9",
    storageBucket: "teduapp-210c9.appspot.com",
    messagingSenderId: "1003884632988"
  };
  firebase.initializeApp(config);
</script>
*/