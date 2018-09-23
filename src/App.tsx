/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, Text, Platform, Dimensions, Alert } from "react-native";
import { createStackNavigator } from "react-navigation";
import News, { Spinner } from "./screens/News";
import Moodle from "./screens/Moodle";
import Menu from "./screens/Menu";
import Council from "./screens/Council";
import Calendar from "./screens/Calendar";
import Main from "./screens/Main";
import Webview from "./components/Webview";
import Survey from "./components/Survey/Survey";
import CouncilNewsContent from "./components/CouncilNewsContent";
import Credits from "./components/Credits";
import firebase from "firebase";
import firebasee from "react-native-firebase";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import MoodleDersDetay from "./components/Moodle/MoodleDersDetay";

let deviceWidth = Dimensions.get("window").width;

// symbol polyfills
require("core-js/es6/symbol");
require("core-js/fn/symbol/iterator");

// collection fn polyfills
require("core-js/fn/map");
require("core-js/fn/set");
require("core-js/fn/array/find");

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
      projectId: "teduapp-210c9",
      storageBucket: "teduapp-210c9.appspot.com"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }
  notificationDisplayedListener: any;
  notificationListener: any;

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
  }

  componentDidMount() {
    firebasee.messaging().subscribeToTopic("pushNotifications");
    firebasee
      .notifications()
      .android.createChannel(
        new firebasee.notifications.Android.Channel(
          "daily",
          "Reminders",
          firebasee.notifications.Android.Importance.High
        ).setDescription("Reminds you....")
      );
    this.notificationDisplayedListener = firebasee
      .app()
      .notifications()
      .onNotificationDisplayed((notification: any) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log("then notification", notification);
        // firebasee.notifications().displayNotification(notification);
      });
    this.notificationListener = firebasee
      .app()
      .notifications()
      .onNotification((notification: any) => {
        notification.android.setChannelId("daily");
        if (Platform.OS === 'ios') {
          //notification.ios.setBadge(1);
        }
        notification.android.setSmallIcon("@drawable/ic_stat_tedu");
        // Process your notification as required
        console.log("then notificationListener", notification);
        firebasee.notifications().displayNotification(notification);
      });
    this.notificationListener = firebasee
      .app()
      .messaging()
      .onMessage((notification: any) => {
        notification.android.setChannelId("daily");
        notification.android.setSmallIcon("@drawable/ic_stat_tedu");
        // Process your notification as required
        console.log("then notificationListener", notification);
        firebasee.notifications().displayNotification(notification);
      });

    firebasee
      .app()
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          firebase
            .messaging()
            .getToken()
            .then(token => {
              console.log("LOG: ", token);
            })
            .catch(er => {
              console.log(er);
            });
          // user has permissions
        } else {
          firebasee
            .messaging()
            .requestPermission()
            .then(() => {
              //Alert.alert("İzin verildi");
            })
            .catch(error => {
              //Alert.alert("Hata", "Error:" + error);
              // User has rejected permissions
            });
        }
      })
      .catch(er => {
        console.log(er);
      });
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
    CouncilContentRouter: CouncilNewsContent,
    CreditsRouter: Credits,
    DersDetayRouter: {
      screen: MoodleDersDetay,
      navigationOptions: {
        headerStyle: {
          marginTop: 0,
          backgroundColor: "#144d8c",
          height: deviceWidth / 12.5
        },
        title: Platform.OS === "ios" ? "Moodle" : ""
      }
    }
  },
  {
    // headerMode: "none",
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
