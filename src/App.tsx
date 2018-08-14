/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";
import News, { Spinner } from "./screens/News";
import Moodle from "./screens/Moodle";
import Menu from "./screens/Menu";
import Council from "./screens/Council";
import Calendar from "./screens/Calendar";
import Main from "./screens/Main";
import Webview from "./components/Webview";
import Survey from "./components/Survey/Survey";
import firebase from "firebase";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import MoodleDersDetay from "./components/Moodle/MoodleDersDetay";

// symbol polyfills
require("core-js/es6/symbol");
require("core-js/fn/symbol/iterator");

// collection fn polyfills
require("core-js/fn/map");
require("core-js/fn/set");
require("core-js/fn/array/find");

export default class App extends Component<any> {
  constructor(prop: any) {
    super(prop);
    var config = {
      databaseURL: "https://teduapp-210c9.firebaseio.com",
      projectId: "teduapp-210c9"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Spinner size="large" />} persistor={persistor}>
          <View style={{ flex: 1 }}>
            <RootStack />
          </View>
        </PersistGate>
      </Provider>
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
    WebviewRouter: Webview,
    SurveyRouter: Survey,
    DersDetayRouter: MoodleDersDetay
  },
  {
    headerMode: "none",
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
