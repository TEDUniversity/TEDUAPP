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
import CouncilNews from "./CouncilNews";

class CouncilVotings extends Component {
  state = {
    buttonBackgroundColor1: "",
    clicked1: false,
    buttonBackgroundColor2: "",
    clicked2: false,
    buttonBackgroundColor3: "",
    clicked3: false
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "rgb(66,103,178)", marginLeft: "-5%" }}>
            {" "}
            Orientation party!{" "}
          </Text>
          <Icon size={25} color="rgb(66,103,178)" name={"arrow-right"} />
        </TouchableOpacity>
        <View style={styles.questionContainer}>
          <View style={styles.question}>
            <Text style={styles.text}>
              Where do you want to go for the party?
            </Text>
          </View>
          <View style={styles.answers}>
            <TouchableOpacity
              style={[
                styles.answerButton,
                { backgroundColor: this.state.buttonBackgroundColor1 }
              ]}
              onPress={() => {
                this.setState({
                  buttonBackgroundColor1: "rgb(22,103,163)",
                  clicked1: true
                });
                if (this.state.clicked1) {
                  this.setState({
                    buttonBackgroundColor1: "transparent",
                    clicked1: false
                  });
                  console.log(this.state.clicked1);
                }
              }}
            >
              <Text> 6:45</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton,
                { backgroundColor: this.state.buttonBackgroundColor2 }
              ]}
              onPress={() => {
                this.setState({
                  buttonBackgroundColor2: "rgb(22,103,163)",
                  clicked2: true
                });
                if (this.state.clicked2) {
                  this.setState({
                    buttonBackgroundColor2: "transparent",
                    clicked2: false
                  });
                  console.log(this.state.clicked2);
                }
              }}
            >
              <Text> Bomonti</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton,
                { backgroundColor: this.state.buttonBackgroundColor3 }
              ]}
              onPress={() => {
                this.setState({
                  buttonBackgroundColor3: "rgb(22,103,163)",
                  clicked3: true
                });
                if (this.state.clicked3) {
                  this.setState({
                    buttonBackgroundColor3: "transparent",
                    clicked3: false
                  });
                  console.log(this.state.clicked3);
                }
              }}
            >
              <Text> Lux the mix</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <View style={styles.question}>
            <Text style={styles.text}>
              Which date do you want to have a party?
            </Text>
          </View>
          <View style={styles.answers}>
            <TouchableOpacity
              style={[
                styles.answerButton,
                { backgroundColor: this.state.buttonBackgroundColor1 }
              ]}
              onPress={() => {
                this.setState({
                  buttonBackgroundColor1: "rgb(22,103,163)",
                  clicked1: true
                });
                if (this.state.clicked1) {
                  this.setState({
                    buttonBackgroundColor1: "transparent",
                    clicked1: false
                  });
                  console.log(this.state.clicked1);
                }
              }}
            >
              <Text> 20-05-2019 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton,
                { backgroundColor: this.state.buttonBackgroundColor2 }
              ]}
              onPress={() => {
                this.setState({
                  buttonBackgroundColor2: "rgb(22,103,163)",
                  clicked2: true
                });
                if (this.state.clicked2) {
                  this.setState({
                    buttonBackgroundColor2: "transparent",
                    clicked2: false
                  });
                  console.log(this.state.clicked2);
                }
              }}
            >
              <Text> 15-07-2019 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton,
                { backgroundColor: this.state.buttonBackgroundColor3 }
              ]}
              onPress={() => {
                this.setState({
                  buttonBackgroundColor3: "rgb(22,103,163)",
                  clicked3: true
                });
                if (this.state.clicked3) {
                  this.setState({
                    buttonBackgroundColor3: "transparent",
                    clicked3: false
                  });
                  console.log(this.state.clicked3);
                }
              }}
            >
              <Text> 10-03-2019 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "1%"
  },
  questionContainer: {
    //justifyContent: "center"
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

  button: {
    //marginLeft: -100,
    //flex: 1,

    flexDirection: "row",
    //width: "100%",
    height: 35,
    backgroundColor: "rgb(12,57,98)",
    alignItems: "center",
    justifyContent: "space-around"
    //#373738
  },
  tabNavTitle: {},
  mainBackGround: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
    // width: null,
    // height: null
  }
});

export default CouncilVotings;
