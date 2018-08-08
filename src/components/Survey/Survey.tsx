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
import Icon from "react-native-vector-icons/Ionicons";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import Answer from "./Answer";
import Question from "./Question";


interface IProp {
    surveyData: any;
    navigation: any;
  }

class Survey extends Component<IProp> {
  state = {
    answers: [],
    sendAnswers: false,
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

  getAnswers = (answers) => {
    //this.state.answers = this.state.answers.concat(answers);
    //this.setState({answers: answers.concat(answers)})
    this.state.answers.push(answers);
  }

  setSendAnswers = (val) => {
      this.setState({sendAnswers: val})
  }

  renderQuestions = () => {
    return this.props.navigation.state.params.surveyData.questions.map((item, id) => (
      <Question
      question={item}
      key={id}
      getAnswers = { this.getAnswers }
      sendParent = { this.state.sendAnswers }
      set = { this.setSendAnswers }
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
        <View style={ styles.container }>
          { this.renderQuestions() }
          <TouchableOpacity onPress={() => { this.setState({sendAnswers: true}); console.log(this.state.answers); }}>
            <Text>PRESS</Text>
          </TouchableOpacity>
          
        </View>
        
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  }

  });


export default Survey;
