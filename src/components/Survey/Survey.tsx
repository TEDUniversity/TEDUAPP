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
  Alert
} from "react-native";
import Image from "react-native-scalable-image";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import Answer from "./Answer";
import Question from "./Question";
import * as types from "../../store/types";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import firebase from "firebase";


interface ReduxProps {
  surveys?: types.Survey[];
  updateSurveys?: (surveys: types.Survey[]) => any;
}

interface IProp {
  surveyData: any;
  navigation: any;
}

class Survey extends Component<IProp & ReduxProps> {
  state = {
    answers: [],
    currentSurvey: this.props.surveys[this.props.navigation.state.params.index],
    dataValid: true
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={styles.headerTitle}> {navigation.state.params.title} </Text>
    ),
    title: "Webview",
    headerStyle: { marginTop: 0, backgroundColor: "#144d8c", height: 35 },
    headerLeft: (
      <TouchableOpacity
        style={styles.headerLeftContainer}
        onPress={() => {
          navigation.navigate("MainRouter", { showAlert: false });
        }}
      >
        <Icon name="ios-arrow-back" size={30} />
        <Text style={styles.headerLeftText}>
          {navigation.state.params.backButton}
        </Text>
      </TouchableOpacity>
    )
  });

  /*getAnswers = (answers) => {
    //this.state.answers = this.state.answers.concat(answers);
    //this.setState({answers: answers.concat(answers)})
    this.state.answers.push(answers);
  }*/

  writeSurveyData = surveys => {
    firebase
      .database()
      .ref("/")
      .set({
        surveys
      })
      .then(data => {
        //success callback
        console.log("data ", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
  };

  sendResultsToFirebase = () => {
    //console.log(this.props.navigation.state.params.title)
    //console.log(this.props.surveys)
    const surveyName = this.props.navigation.state.params.title;
    const surveys = this.props.surveys;
    surveys.map((item, id) => {
      if (item.name === surveyName) {
        item.questions.map((question, id) => {
          const pressedAnswer = question.currentPressedAnswers;
          console.log(pressedAnswer);
          //console.log("/surveys/"+this.props.navigation.state.params.index+"/questions/"+id+"/answers/"+question.currentPressedAnswers+"/count")
          /*firebase
          .database()
          .ref("/surveys/"+this.props.navigation.state.params.index+"/questions/"+id+"/answers/"+question.currentPressedAnswers+"/count")
          .on("value", response => {
            // this.setState({ firebase: response.val(), loading: false });
            if (!response) {
              return;
            }
            console.log("before update: firebase data: " + JSON.stringify(response));
            //this.props.updateSurveys(response.val());
            //this.setState({ loading: false });
            //console.log(this.props.surveys);
          });*/
          const url = "/surveys/" + this.props.navigation.state.params.index + "/questions/" + id + "/answers/" + question.currentPressedAnswers + "/count";
          console.log(url)
          var adaRankRef = firebase
            .database()
            .ref(url);
          adaRankRef.transaction((currentCount) => {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return currentCount + 1;
          },
            function (Error) {
              //console.log(Error);
            });
          console.log(pressedAnswer);
          surveys[this.props.navigation.state.params.index].questions[id].currentPressedAnswers = pressedAnswer;
          this.props.updateSurveys(surveys);
          //son iki satırı silince pressedAnswers undefined oluyor
        })
      }
    })
  }
  sendResultsToFirebaseV2 = () => {
    //console.log(this.props.navigation.state.params.title)
    //console.log(this.props.surveys)
    const surveys = this.props.surveys;
    this.setState({ currentSurvey: this.props.surveys[this.props.navigation.state.params.index] })
    this.state.currentSurvey.questions.map((question, id) => {
      if (question.currentPressedAnswers == undefined) {
        this.setState({ dataValid: false });
        Alert.alert(
          "Required",
          "All questions must be answered.",
          [
            {
              text: "OK",
              onPress: () => { }
            }
          ],
          { cancelable: false }
        );
      }
    })
    this.state.currentSurvey.questions.map((question, id) => {
      const pressedAnswer = question.currentPressedAnswers;
      console.log(pressedAnswer);
      console.log(question)
      //console.log("/surveys/"+this.props.navigation.state.params.index+"/questions/"+id+"/answers/"+question.currentPressedAnswers+"/count")
      /*firebase
      .database()
      .ref("/surveys/"+this.props.navigation.state.params.index+"/questions/"+id+"/answers/"+question.currentPressedAnswers+"/count")
      .on("value", response => {
        // this.setState({ firebase: response.val(), loading: false });
        if (!response) {
          return;
        }
        console.log("before update: firebase data: " + JSON.stringify(response));
        //this.props.updateSurveys(response.val());
        //this.setState({ loading: false });
        //console.log(this.props.surveys);
      });*/
      if (this.state.dataValid) {
        const url = "/surveys/" + this.props.navigation.state.params.index + "/questions/" + id + "/answers/" + question.currentPressedAnswers + "/count";
        console.log(url)
        var adaRankRef = firebase
          .database()
          .ref(url);
        adaRankRef.transaction((currentCount) => {
          // If users/ada/rank has never been set, currentRank will be `null`.
          return currentCount + 1;
        },
          function (Error) {
            //console.log(Error);
          });
        console.log(pressedAnswer);
        surveys[this.props.navigation.state.params.index].questions[id].currentPressedAnswers = pressedAnswer;
        this.props.updateSurveys(surveys);
      }


    })


  }
  renderQuestions = () => {
    return this.props.navigation.state.params.surveyData.questions.map((item, id) => (
      <Question
        question={item}
        questionIndex={id}
        surveyIndex={this.props.navigation.state.params.index}
        key={id}
      />
    ));
  }


  render() {
    //console.log("survey data" + this.props.navigation.state.params.surveyData);
    return (
      <ImageBackground
        source={require("../../../img/background/BACKGROUND.png")}
        style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}
      >
        <View style={styles.container}>
          {this.renderQuestions()}
          <View style={styles.buttonView} >
            <TouchableOpacity style={styles.button} onPress={() => { this.sendResultsToFirebaseV2() }}>
              <Text>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "3%",

  },
  headerTitle: {
    fontWeight: "bold"
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3
  },
  headerLeftText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: "400"
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "5%",
    
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,

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
)(Survey);

