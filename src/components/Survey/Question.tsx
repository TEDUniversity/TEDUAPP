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
    getAnswers: any;
    sendParent: any;
    set: any;
  }

class Question extends Component<IProp> {
  state = {
    answers: [],
    prevAnswers: [],
        
  };
  
  setAnswers = (val) => {
    if(val.includes("not")) {
      var splitted = val.split(' ').slice(1).join(' ');
      this.state.answers = this.state.answers.filter(function(item) { 
        return item !== splitted
      })
      //console.log(splitted);
    } else {
      this.state.answers.push(val);
    }
    this.props.getAnswers(this.state.answers);
  };

  setAnswersSingle = (val) => {
    if(val.includes("not")) {
      var splitted = val.split(' ').slice(1).join(' ');
      this.state.answers = this.state.answers.filter(function(item) { 
        return item !== splitted
    })
      //console.log(splitted);
    }else{
      //debugger;
      var popped = this.state.answers.pop();
      //console.log(popped)
      if(popped == undefined){
        this.state.answers.push(val);
        //console.log("popped undefined");
      }else{
        this.state.prevAnswers.pop();
        this.state.prevAnswers.push(popped);
        this.state.answers.push(val);
        //console.log("popped not undefined: " + popped);
      }
    }
    if(this.props.sendParent){
      //debugger;
      //console.log(this.state.answers)
      //console.log(this.props.text)
      this.sentAnswersToParent();
    }
  };

  sentAnswersToParent = () => {
    //console.log(this.state.answers)
  debugger;
    this.state.answers.map((item) => {
      if(item != undefined){
        this.props.getAnswers(item);
      }
    });
    this.props.set(false);
  }

  renderAnswers = () => {
      return this.props.question.answers.map((item, id) => (
        <Answer 
        text={item}
        key={id}
        answer={ this.setAnswersSingle }
        unClickAnswer={ this.state.prevAnswers }
        />
      ));
  }

  render() {
    //console.log(this.props.question);
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
          <TouchableOpacity onPress={() => (console.log(this.state.answers))}>
            <Text> show results </Text>
          </TouchableOpacity>
          
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
      borderRadius: 5,
      padding: 5,
      margin: 5,
      
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
