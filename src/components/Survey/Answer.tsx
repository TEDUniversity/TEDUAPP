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
import * as types from "../../store/types";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

import { Dispatch } from "redux";

interface IProp {
  answer: any;
  getAnswer: any;
  index: number;
  isChosen: boolean;
  styleType: string;
}

interface ReduxProps {
  surveys?: types.Survey[];
  updateSurveys?: (surveys: types.Survey[]) => any;
}

class Answer extends Component<IProp & ReduxProps> {


  constructor(props: IProp) {
    super(props);

  }

  state = {
    buttonBackgroundColor: "",
    borderBottomWidth: 0.5

  };

  componentWillReceiveProps(next: IProp & ReduxProps) {

    if (next.isChosen) {
      this.setState({
        buttonBackgroundColor: "rgb(22,103,163)",
        borderBottomWidth: 0,
      });
    } else {
      this.setState({
        buttonBackgroundColor: "transparent",
        borderBottomWidth: 0.5,
      });
    }
  }

  setStyleForAnswerContainer = (style) => {
    if(style === "row"){
      return styles.answerContainerRow;
    }else if(style === "column"){
      return styles.answerContainerColumn;
    }
  }

  onClick = () => {

    this.props.getAnswer(this.props.index);

  }

  //previous version of the answer. not working for this vers.
  componentDidUpdate() {

    /*if(this.state.clicked == true){
      this.props.answer(this.props.text);
    } else {
      this.props.answer("not " + this.props.text);
    }*/


  }

  /*componentWillMount(){
    console.log("txt: " +this.props.text)
    if( this.props.unClickAnswer == this.props.text) {
      console.log("unclick: " +this.props.unClickAnswer)
      this.setState({
        buttonBackgroundColor: "transparent",
        borderBottomWidth: 0.5,
        clicked: false
      });
    }
  }*/

  render() {
    //console.log(this.props.text);
    //console.log("after setting state and renderind screen" + this.state.clicked);

    return (
      <View style={this.setStyleForAnswerContainer(this.props.styleType)} >
        <TouchableOpacity
          style={[
            styles.answerButton,
            {
              backgroundColor: this.state.buttonBackgroundColor,
              borderBottomWidth: this.state.borderBottomWidth,
            }
          ]}
          onPress={this.onClick}
        >
          <Text style={styles.text} > {this.props.answer.text} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  answerButton: {
    borderWidth: 0,
    borderRadius: 5,
    padding: 3,

  },
  answerContainerRow: {
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  answerContainerColumn: {//assign this style to answer conditionally
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    marginRight: 5,
  },
  text:{
    fontSize:15,
    
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
)(Answer);
