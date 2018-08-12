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
  ActivityIndicator
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
import firebase from "firebase";
import * as types from "../store/types";
import * as actions from "../store/actions";
import { connect } from "react-redux";

import { Dispatch } from "redux";

const Spinner = ({ size }) => (
  <View>
    <ActivityIndicator size={size || "large"} />
  </View>
);

interface ReduxProps {
  surveys?: types.Survey[];
  updateSurveys?: (surveys: types.Survey[]) => any;
}
interface IProps {
  navigation: any;
}

class CouncilVotings extends Component<IProps & ReduxProps> {
  state = {
    selectedSurey: "",
    loading: true,
    surveys: [
      {
        //survey#1
        name: "OrientationParty",
        questions: [
          {
            question: "Where do you want to go for the party?",
            answers: ["The lux", "6:45", "Bomonti"]
          },
          {
            question: "Choose a date",
            answers: ["11-05-2019", "22-05-2018", "05-07-2018"]
          }
        ]
      },
      {
        //survey#2
        name: "SpringParty",
        questions: [
          {
            question: "Where do you want to go for the party?",
            answers: ["Keçi", "Kite", "Ses"]
          },
          { question: "hi", answers: ["11", "22", "33"] }
        ]
      },
      {
        //survey#3
        name: "WinterParty",
        questions: [
          {
            question: "Where do you want to go for the party?",
            answers: ["Suite 34", "Magazin", "The house"]
          },
          { question: "Choose a date", answers: ["11", "22", "33"] }
        ]
      }
    ],

    firebase: "",

    questions: [
      {
        question: "Where do you want to go for the party?",
        answers: ["The lux", "6:45", "Bomonti"]
      },
      { question: "hi", answers: ["11", "22", "33"] }
    ]
  };

  componentWillMount() {
    this.readSurveyData();
  }

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

  readSurveyData() {
    firebase
      .database()
      .ref("/")
      .on("value", response => {
        // this.setState({ firebase: response.val(), loading: false });
        if (!response || !this.props.updateSurveys) {
          return;
        }
        this.props.updateSurveys(response.val().surveys);
        this.setState({ loading: false });
        console.log(this.state.firebase);
      });
  }

  renderSurvey = surveyName => {
    //this.setState({selectedSurey: surveyName});//for rendering survey on same page
    if (!this.props.surveys) {
      alert("surveys undefined");
      return;
    }
    return this.props.surveys.map((item, id) => {
      if (item.name === surveyName) {
        //console.log(item);
        this.props.navigation.navigate("SurveyRouter", {
          title: surveyName,
          backButton: "Votings",
          surveyData: item
        });
        //return <Survey key={id} surveyData={item} />
      }
    });
  };

  renderSurveyButtons = () => {
    if (!this.props.surveys) {
      alert("surveys undefined");
      return;
    }
    return this.props.surveys.map((item, id) => {
      return (
        <TouchableOpacity
          key={id}
          style={styles.button}
          onPress={() => this.renderSurvey(item.name)}
        >
          <Text style={{ color: "rgb(66,103,178)", marginLeft: "-5%" }}>
            {item.name}
          </Text>
          <Icon size={25} color="rgb(66,103,178)" name={"arrow-right"} />
        </TouchableOpacity>
      );
    });
  };

  render() {
    //this.writeSurveyData(this.state.surveys)
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
        <View style={styles.container}>
          {this.renderSurveyButtons()}
          {/*  (this is for rendering the survey on same page with state parameters)   this.renderSurvey()*/}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
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
)(CouncilVotings);
