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
  ActivityIndicator,
  ScrollView
} from "react-native";
import Image from "react-native-scalable-image";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import firebase from "firebase";
import * as types from "../store/types";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { storeData, retrieveData } from "../util/helpers";

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

let deviceWidth = Dimensions.get("window").width;

class CouncilVotings extends Component<IProps & ReduxProps> {
  state = {
    selectedSurey: "",
    loading: true,
    surveys: [
      //example
      {
        //survey#1
        name: "OrientationParty",
        questions: [
          {
            question: "Where do you want to go for the party?",
            answers: [
              { count: 0, text: "The lux" },
              { count: 0, text: "6:45" },
              { count: 0, text: "Bomonti" }
            ]
          },
          {
            question: "Choose a date",
            answers: [
              { count: 0, text: "11-05-2019" },
              { count: 0, text: "22-05-2018" },
              { count: 0, text: "05-07-2018" }
            ]
          }
        ]
      },
      {
        //survey#2
        name: "SpringParty",
        questions: [
          {
            question: "Where do you want to go for the party?",
            answers: [
              { count: 0, text: "Keçi" },
              { count: 0, text: "Kite" },
              { count: 0, text: "Sess" }
            ]
          },
          {
            question: "hi",
            answers: [
              { count: 0, text: "Keçi" },
              { count: 0, text: "Kite" },
              { count: 0, text: "Sess" }
            ]
          }
        ]
      },
      {
        //survey#3
        name: "WinterParty",
        questions: [
          {
            question: "Where do you want to go for the party?",
            answers: [
              { count: 0, text: "Suite 34" },
              { count: 0, text: "Magazin" },
              { count: 0, text: "The House" }
            ]
          }
        ]
      }
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
    if (this.props.surveys.length === 0) {
      firebase
      .database()
      .ref("/surveys")
      .on("value", response => {
        // this.setState({ firebase: response.val(), loading: false });
        if (!response || !this.props.updateSurveys) {
          return;
        }
        //console.log("firebase data: " + response.val());

        //store the data returned from firebase in asyncstorage

        // storeData("CouncilVotings", JSON.stringify(response.val())).then(() => {
        //   //it is casted to string because it is stored as string in local storage. After getting is parse it as json.
        //   retrieveData("CouncilVotings").then((res: string) => { this.updateSurvey(JSON.parse(res)) })
        // });
        //this.updateSurvey(voting)
        //console.log(this.props.surveys);
        let arr = [];
        response.forEach(child => {
          arr.push(child.val());
        });
        this.props.updateSurveys(arr);
        this.setState({ loading: false });

      });
    } else {
      this.setState({ loading: false });
      firebase
      .database()
      .ref("/surveys")
      .on("value", response => {
        // this.setState({ firebase: response.val(), loading: false });
        if (!response || !this.props.updateSurveys) {
          return;
        }
        //console.log("firebase data: " + response.val());

        //store the data returned from firebase in asyncstorage

        // storeData("CouncilVotings", JSON.stringify(response.val())).then(() => {
        //   //it is casted to string because it is stored as string in local storage. After getting is parse it as json.
        //   retrieveData("CouncilVotings").then((res: string) => { this.updateSurvey(JSON.parse(res)) })
        // });
        //this.updateSurvey(voting)
        //console.log(this.props.surveys);
        let arr = [];
        response.forEach(child => {
          arr.push(child.val());
        });
        this.props.updateSurveys(arr);
      });
    }
    
    //   retrieveData("CouncilVotings").then((res: string) => { this.updateSurvey(JSON.parse(res)) })
  }



  renderSurvey = surveyName => {
    //this.setState({selectedSurey: surveyName});//for rendering survey on same page
    if (!this.props.surveys) {
      alert("surveys undefined");
      return;
    }
    return this.props.surveys.map((item, id) => {

      if (item.name === surveyName) {

        //traverse the question array of the related survey and set all currentPressedAnswers to UNDEFINED before navigating to survey
        //Reason is that if a user pressed answers but not submit the survey, the given answers is preserved in the global state and when user
        //opens the related survey for sending again it sent with previos answer state.
        item.questions.map(question => {
          question.currentPressedAnswers = undefined;
        });
        //console.log(item);
        this.props.navigation.navigate("SurveyRouter", {
          title: surveyName,
          backButton: "Votings",
          surveyData: item,
          index: item.id
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
      //console.log(item.valid);
      if (item.valid) {
        //if the survey is valid, publish in the app. it is come from firebase
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
      }
    });
  };

  render() {
    //this.writeSurveyData(this.state.surveys)
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
        <View style={styles.container} height={Dimensions.get("window").height} >
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
    height: deviceWidth / 10.5,
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
