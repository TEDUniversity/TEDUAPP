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
import Answer from "./Answer";

interface IProp {
    question: any;
  }

class Question extends Component<IProp> {
  state = {
    buttonBackgroundColor: "",
    clicked: false,
    borderBottomWidth: 0.5
    
  };
  
  renderAnswers = () => {
      return this.props.question.answers.map((item, id) => (
        <Answer 
        text={item}
        key={id}
        />
      ));
  }

  render() {
    console.log(this.props.question);
    return (
        <View style={styles.questionContainer}>
          <View style={styles.question}>
            <Text style={styles.text}>
              {this.props.question.question}
            </Text>
          </View>
          <View style={styles.answers}>
            {this.renderAnswers()}
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

export default Question;
