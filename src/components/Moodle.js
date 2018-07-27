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
import Image from "react-native-scalable-image";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import DetailNews from "./DetailNews";
import MoodleLogin from "./MoodleLogin";
import { API_LINK } from "../util/types";

const MIN_HEIGHT = Header.height;

class Moodle extends Component {
  static navigationOptions = {
    headerTitle: (
      <Image
        resizeMode="contain"
        width={Dimensions.get("window").width}
        style={{ marginTop: 40 }}
        source={require("../../img/header/anatepe2.png")}
      />
    ),
    title: "Council",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
  };
  state = { selectedTab: "", MAX_HEIGHT: 0, scrollHeight: 500 };

  componentWillMount() {
    //const parseString = require("xml2js").parseString;

    const winHeight = Dimensions.get("window").height;
    console.log("winHeight" + winHeight);

    if (winHeight < 736) {
      console.log("device height less than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.175 }); //17.5%
    } else if (winHeight >= 736) {
      console.log("device height greater than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //18%
    }
  }

  login = () => {
    // this.setState({ userName: userName, password: password });
    // var moodle_client = require("moodle-client");
    alert("userName");
    // moodle_client.init({
    //   wwwroot: API_LINK,
    //   username: this.state.userName,
    //   password: this.state.password
    // });
    //   .then(function(client) {
    //     return do_something(client);
    //   })
    //   .catch(function(err) {
    //     alert("Unable to initialize the client: " + err);
    //   });
  };
  render() {
    return (
      <HeaderImageScrollView
        maxHeight={this.state.MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image
            resizeMode="stretch"
            width={Dimensions.get("window").width}
            style={StyleSheet.absoluteFill}
            style={{}}
            source={require("../../img/header/anatepe2.png")}
          />
        )}
        overlayColor="#144d8c"
        maxOverlayOpacity={1}
        scrollEnabled={false}
      >
        <View height={this.state.scrollHeight}>
          <ImageBackground
            source={require("../../img/background/BACKGROUND.png")}
            style={styles.mainBackGround}
          >
            <View style={styles.container}>
              <MoodleLogin onPress={this.login} />
            </View>
          </ImageBackground>
        </View>
      </HeaderImageScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center"
  },
  answers: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    padding: 5,
    margin: 5
  },
  answerButton: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 3
  },
  question: {
    marginLeft: "5%"
  },
  text: {
    fontWeight: "bold"
  },

  tabNav: {
    //marginLeft: -100,
    width: "100%",
    flex: 1,
    height: 25,
    backgroundColor: "#373738",
    alignItems: "center"
  },
  tabNavTitle: {},
  mainBackGround: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover",
    width: null,
    height: null
  }
});

export default Moodle;
