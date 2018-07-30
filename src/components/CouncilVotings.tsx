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
import Answer from "./Survey/Answer";
import Question from "./Survey/Question";
import Survey from "./Survey/Survey";

class CouncilVotings extends Component {
  state = {
    selectedSurey: "",
    surveys: 
    [
      {//survey#1
        name:"orientationParty", 
        questions:
        [
          {question: "Where do you want to go for the party?", answers: ["The lux", "6:45", "Bomonti"]}, 
          {question: "Choose a date", answers: ["11-05-2019", "22-05-2018", "05-07-2018"]}
        ]
      },
      {//survey#2
        name:"SpringParty", 
        questions:
        [
          {question: "Where do you want to go for the party?", answers: ["Keçi", "Kite", "Ses"]}, 
          {question: "hi", answers: ["11", "22", "33"]}
        ]
      },
      
    
    ],
    
    
    
    
    questions: [{ question: "Where do you want to go for the party?", answers: ["The lux", "6:45", "Bomonti"]}, {question: "hi", answers: ["11", "22", "33"]}]
  };


  renderSurvey = () => {
     return this.state.surveys.map((item, id) => {
      if(item.name === this.state.selectedSurey){
        console.log(item);
        return <Survey key={id} surveyData={item} />
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => (this.setState({selectedSurey: "orientationParty"}))}>
          <Text style={{ color: "rgb(66,103,178)", marginLeft: "-5%" }}>
            Orientation party!
          </Text>
          <Icon size={25} color="rgb(66,103,178)" name={"arrow-right"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => (this.setState({selectedSurey: "SpringParty"}))}>
          <Text style={{ color: "rgb(66,103,178)", marginLeft: "-5%" }}>
            Spring party!
          </Text>
          <Icon size={25} color="rgb(66,103,178)" name={"arrow-right"} />
        </TouchableOpacity>
        {console.log("selected Survey:" + this.state.selectedSurey)}
        {this.renderSurvey()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //marginTop: "1%"
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
    padding: 3,
    
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
    justifyContent: "space-around",
    //#373738
    marginTop: "1%"
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
