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
  Alert,
  Platform
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
  user?: types.User;
  updateSurveys?: (surveys: types.Survey[]) => any;
}

interface IProp {
  surveyData: any;
  navigation: any;
}

class Survey extends Component<IProp & ReduxProps> {
  state = {
    answers: [],
    currentSurvey: this.props.surveyData
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={styles.headerTitle}>
        {" "}
        {Platform.OS === "ios" ? navigation.state.params.title : " "}{" "}
      </Text>
    ),
    //title: "Webview",
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

  //first version of the sendResultsToFirebase. It is not used  because it is not suited to the requirements but it is preserved for the knowledge
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
          const url =
            "/surveys/" +
            this.props.navigation.state.params.index +
            "/questions/" +
            id +
            "/answers/" +
            question.currentPressedAnswers +
            "/count";
          console.log(url);
          var adaRankRef = firebase.database().ref(url);
          adaRankRef.transaction(
            currentCount => {
              // If users/ada/rank has never been set, currentRank will be `null`.
              return currentCount + 1;
            },
            function (Error) {
              //console.log(Error);
            }
          );
          console.log(pressedAnswer);
          surveys[this.props.navigation.state.params.index].questions[
            id
          ].currentPressedAnswers = pressedAnswer;
          this.props.updateSurveys(surveys);
          //son iki satırı silince pressedAnswers undefined oluyor
        });
      }
    });
  };

  sendResultsToFirebaseV2 = () => {
    //console.log(this.props.navigation.state.params.title)
    //console.log(this.props.surveys)
    const surveys = this.props.surveys;
    let survey;
    this.props.surveys.map(item => {
      if (item.id === this.props.navigation.state.params.index) survey = item;
    });

    this.setState({ currentSurvey: survey }, () => {
      //console.log(this.state.currentSurvey)
      let allAnswered = true; //control variable for questions that are not answered
      this.state.currentSurvey.questions.map((question, id) => {
        if (question.type === 0) {
          //traverse the question array of the related survey and check current pressed answers. If it is undefined, question is not answered.
          if (question.currentPressedAnswers == undefined) {
            allAnswered = false;
          }
        }
      });
      //if all questions are not answered, show alert
      if (!allAnswered) {
        Alert.alert(
          "Warning",
          "All questions must be answered.",
          [
            {
              text: "OK",
              onPress: () => { }
            }
          ],
          { cancelable: false }
        );
        //if all questions are answered, proceed
      } else {
        //check firebase to ensure that user does not vote again for same voting
        //userVoteBefore is a promise whose return value must be handled by .then
        //userVoteBefore is a control variable for checking that user does not vote before
        const userVoteBefore = this.checkUserVote();
        userVoteBefore.then(response => {
          if (response) {
            //if userVoteBefore true, this means that user did vote before
            //console.log("user vote before:")
            Alert.alert(
              "Warning",
              "You have already voted.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    this.props.navigation.navigate("MainRouter", {
                      showAlert: false
                    });
                  }
                }
              ],
              {
                cancelable: false
              }
            );
          } else {
            //if userVoteBefore is false, this means that user did not vote before. So proceed.
            //console.log("not vote")

            let givenAnswers = [];
            this.state.currentSurvey.questions.map((question, id) => {
              if (question.type === 0) {
                const pressedAnswer = question.currentPressedAnswers;
                givenAnswers.push(pressedAnswer); //push given aswers to this array for inserting it firebase

                //increase the counter of the pressed answers.
                const url =
                  "/surveys/" +
                  this.props.navigation.state.params.index +
                  "/questions/" +
                  id +
                  "/answers/" +
                  question.currentPressedAnswers +
                  "/count";
                //console.log(url)
                var adaRankRef = firebase.database().ref(url);
                adaRankRef.transaction(
                  currentCount => {
                    // If users/ada/rank has never been set, currentCount will be `null`.
                    return currentCount + 1;
                  },
                  function (Error) {
                    //console.log(Error);
                  }
                );

                //set the global state again after updating firebase because when question.currentPressedAnswers are read to update firebase it become undefined for the next time.
                //thats why, after it becomes undefined, it is set and updated again to preserve satete by pressedAnswer
                surveys.map(item => {
                  if (item.id === this.props.navigation.state.params.index) {
                    item.questions[id].currentPressedAnswers = pressedAnswer;
                    console.log(item.questions[id].currentPressedAnswers);
                  }
                });

                //surveys[this.props.navigation.state.params.index].questions[id].currentPressedAnswers = pressedAnswer;
                this.props.updateSurveys(surveys);
              } else if (question.type === 1) {
                const typedAnswer = question.answers[0].text;
                givenAnswers.push(typedAnswer);

                const url =
                  "/surveys/" +
                  this.props.navigation.state.params.index +
                  "/questions/" +
                  id +
                  "/answers/text";
                //console.log(url)
                let key = firebase.database().ref(url).push().key;

                var updates = {};
                updates[key] = typedAnswer;


                firebase.database().ref(url).update(updates);


                surveys.map(item => {
                  if (item.id === this.props.navigation.state.params.index) {
                    item.questions[id].answers[0].text = typedAnswer;
                    console.log(item.questions[id].currentPressedAnswers);
                  }
                });
              }

            });
            surveys.map(item => {
              if (item.id === this.props.navigation.state.params.index) {
                console.log(item);
              }
            });

            //insert the userid of the current user to the firebase for keeping track of who votes and who does not. Needed to prevent double voting problem.
            const votersUrl =
              "/surveys/" +
              this.props.navigation.state.params.index +
              "/voters/" +
              this.props.user.userid;
            const voter = {
              id: this.props.user.userName,
              vote: givenAnswers
            };
            //insert voter data to firebase
            firebase
              .database()
              .ref(votersUrl)
              .update({
                voter
              })
              .then(data => {
                //success callback
                //console.log("data ", data);
              })
              .catch(error => {
                //error callback
                //console.log("error ", error);
              });
            Alert.alert(
              "You Vote!!",
              "Thank you for voting.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    this.props.navigation.navigate("MainRouter", {
                      showAlert: false
                    });
                  }
                }
              ],
              {
                cancelable: false
              }
            );
          }
        });
      }
    });
  };

  //return false if user does not vote, otherwise return true meaning that user vote before this survey.
  checkUserVote = () => {
    const votersUrl =
      "/surveys/" +
      this.props.navigation.state.params.index +
      "/voters/" +
      this.props.user.userid;
    return firebase
      .database()
      .ref(votersUrl)
      .once("value")
      .then(function (snapshot) {
        //console.log(snapshot.val())
        if (snapshot.val() === null) {
          console.log(snapshot.val());
          return Boolean(false);
        } else {
          console.log(snapshot.val());
          return Boolean(true);
        }
      });
  };

  renderQuestions = () => {
    //console.log(this.props.navigation.state.params.surveyData)
    return this.props.navigation.state.params.surveyData.questions.map(
      (item, id) => {
        console.log(item)
        if (item.valid) {
          return (<Question
            question={item}
            questionIndex={id}
            surveyIndex={this.props.navigation.state.params.index}
            key={id}
            type={item.type}
          />);
        }

      }
    );
  };

  render() {
    //console.log(this.props.navigation.state.params.surveyData);

    return (
      <ImageBackground
        source={require("../../../img/background/BACKGROUND.png")}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      >
        <View style={styles.container}>
          {this.renderQuestions()}
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.sendResultsToFirebaseV2();
              }}
              disabled={false}
            >
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
    marginTop: "3%"
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
    marginTop: "3%"
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5
  }
});

const mapStateToProps = (state: types.GlobalState) => {
  return {
    surveys: state.Surveys,
    user: state.User
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
