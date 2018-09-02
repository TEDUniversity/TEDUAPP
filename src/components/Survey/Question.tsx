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
import * as types from "../../store/types";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface IProp {
    question: any;
    questionIndex: number;
    surveyIndex: number;
  }

  interface ReduxProps {
    surveys?: types.Survey[];
    updateSurveys?: (surveys: types.Survey[]) => any;
  }

class Question extends Component<IProp & ReduxProps> {
  state = {
    answers: [],//not working this version
    prevAnswers: [],//not workind this versin
    currentAnswer: "",//working in this verison
    chosenIndex: -1,//working in this version


  };
  
  //prev version of the answer. not suiting for requierements
  /*setAnswers = (val) => {
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
  };*/



  setAnswersSingle = (index:number) => {
    if(this.state.chosenIndex != index) {
      this.setState({chosenIndex: index}, this.UpdateGlobalState );
    }
    
  };


  UpdateGlobalState = () => {
    var survey = this.props.surveys;
    survey[this.props.surveyIndex].questions[this.props.questionIndex].currentPressedAnswers = this.state.chosenIndex;
    this.props.updateSurveys(survey);
  }

  renderAnswers = () => {
      return this.props.question.answers.map((item, id) => (
        <Answer 
        index={id}
        answer={item}
        key={id}
        getAnswer={ this.setAnswersSingle }
        isChosen={this.state.chosenIndex === id}
        //unClickAnswer={ this.state.prevAnswers }
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


  const mapStateToProps = (state: types.GlobalState) => {
    return {
      surveys: state.Surveys
    };
  };
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateSurveys: (surveys: types.Survey[]) => {
      dispatch(actions.updateSurveys(surveys));
    }
  });
  
  export default connect<{}, {}, ReduxProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Question);

