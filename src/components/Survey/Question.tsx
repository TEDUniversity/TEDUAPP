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
  TouchableOpacity,
  TouchableNativeFeedbackBase
} from "react-native";
import Image from "react-native-scalable-image";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import Answer from "./Answer";
import TextAnswer from "./TextAnswer";

import * as types from "../../store/types";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface IProp {
  question: any;
  questionIndex: number;
  surveyIndex: string;
  type: number;
}

interface ReduxProps {
  surveys?: types.Survey[];
  updateSurveys?: (surveys: types.Survey[]) => any;
}

class Question extends Component<IProp & ReduxProps> {
  state = {
    answers: [],//not working this version
    prevAnswers: [],//not workind this versin
    currentAnswer: "",// not working in this verison
    chosenIndex: -1,//working in this version for single answered questions
    textAnswer: "", //working in this version for free text answers
    multipleAnswers: [] as number[], //working in this version for multiple choice questions. added in update 4
    answerStyle: "", //working in this version for specifying answer alignment. added in update 4 

  };

  componentWillMount()
  {
  }

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

  setStyleForQuestionContainer = (directionType) => {
    //this.setState({answerStyle: directionType})
      if(directionType === "row"){
          return styles.multipleAnswerRow;
      } else if(directionType === "column") {
          return styles.multipleAnswerColumn;
      }
  }

  setAnswersSingle = (index: number) => {
    if (this.state.chosenIndex != index) {
      this.setState({ chosenIndex: index }, this.UpdateGlobalState);
    }

  };

  setAnswersText = (text: string) => {
    this.setState({ textAnswer: text }, this.UpdateGlobalState);
  };

  setAnswersMultiple = (index : number) => {
    if(!this.state.multipleAnswers.includes(index))
      this.setState({multipleAnswers: [...this.state.multipleAnswers, index]}, () =>   {  this.UpdateGlobalState();}   )
    else{
      var tempArr = this.state.multipleAnswers
      for(var i = tempArr.length - 1; i >= 0; i--) {
        if(tempArr[i] === index) {
          tempArr.splice(i, 1);
        }
    }
    this.setState({multipleAnswer: tempArr }, () =>   {  this.UpdateGlobalState();}  )
    }
  }


  UpdateGlobalState = () => {
    var survey = this.props.surveys;
    //console.log(survey)
    survey.map((item) => {
      if (item.id === this.props.surveyIndex) {

        if (item.questions[this.props.questionIndex].type === 0) {
          item.questions[this.props.questionIndex].currentPressedAnswers = this.state.chosenIndex;
        } else if (item.questions[this.props.questionIndex].type === 1) {
          item.questions[this.props.questionIndex].answers[0].text = this.state.textAnswer;
        } else if (item.questions[this.props.questionIndex].type === 2){
          item.questions[this.props.questionIndex].currentPressedAnswersMultiple = this.state.multipleAnswers;
        }
      }
    })
    //survey[this.props.surveyIndex].questions[this.props.questionIndex].currentPressedAnswers = this.state.chosenIndex;
    this.props.updateSurveys(survey);
  }

  renderAnswers = () => {
    if (this.props.type === 0) {
      return (
        <View style={this.setStyleForQuestionContainer("row")}>
          {this.renderSingleAnswer("row")}
        </View>
      );
    } else if (this.props.type == 1) {
      return (
        <View style={styles.textAnswer}>
          {this.renderTextAnswer()}
        </View>
      );
    } else if (this.props.type == 2) {
      return (
        <View style={this.setStyleForQuestionContainer("row")}>
          {this.renderMultipleAnswer("row")}
        </View>
      );
    }

  }

  renderTextAnswer = () => {
    return (<TextAnswer
      getAnswer={this.setAnswersText}
    />);
  }

  renderSingleAnswer = (answerStyleType) => {
    return this.props.question.answers.map((item, id) => (
      <Answer
        index={id}
        answer={item}
        key={id}
        getAnswer={this.setAnswersSingle}
        isChosen={this.state.chosenIndex === id}
        styleType={answerStyleType}
      //unClickAnswer={ this.state.prevAnswers }
      />
    ));
  }

  renderMultipleAnswer = (answerStyleType) => {
    return this.props.question.answers.map((item, id) => (
      <Answer
        index={id}
        answer={item}
        key={id}
        getAnswer={this.setAnswersMultiple}
        isChosen={this.state.multipleAnswers.indexOf(id) > -1}
        styleType={answerStyleType}
      />
    ));
  }


  render() {
    //console.log(this.props.type)
    //console.log(this.props.question);
    return (
      <View style={styles.questionContainer}>
        <View style={styles.question}>
          <Text style={styles.text}>
            {this.props.question.question}
          </Text>
        </View>
        {this.renderAnswers()}
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
    //justifyContent: "center",
    marginTop: 7,
  },
  multipleAnswerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    flexWrap: 'wrap',
  },
  multipleAnswerColumn: {
    flexDirection: "column",
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    flexWrap: 'wrap',
  },
  textAnswer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    flexWrap: "wrap"
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
    fontWeight: "bold",
    fontSize: 17
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

