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


interface IProp {
    text: string;
    answer: any;
    unClickAnswer: any;
    
  }

class Answer extends Component<IProp> {
  

  constructor(props: IProp){
    super(props);
    
  }
  
  state = {
    buttonBackgroundColor: "",
    clicked: false,
    borderBottomWidth: 0.5
    
  };

  onClick = () => {
    //debugger;
    this.setState({
      buttonBackgroundColor: "rgb(22,103,163)",
      borderBottomWidth: 0,
      clicked: true
    });
    if (this.state.clicked) {
      this.setState({
        buttonBackgroundColor: "transparent",
        borderBottomWidth: 0.5,
        clicked: false
      });
      //console.log("during update component" + this.state.clicked);
    }
  }
 
  componentDidUpdate(){
    
    if(this.state.clicked == true){
      this.props.answer(this.props.text);
    } else {
      this.props.answer("not " + this.props.text);
    }
    
  }

  componentWillMount(){
    console.log("txt: " +this.props.text)
    if( this.props.unClickAnswer == this.props.text) {
      console.log("unclick: " +this.props.unClickAnswer)
      this.setState({
        buttonBackgroundColor: "transparent",
        borderBottomWidth: 0.5,
        clicked: false
      });
    }
  }

  render() {
      //console.log(this.props.text);
      //console.log("after setting state and renderind screen" + this.state.clicked);
      
    return (
        <TouchableOpacity
              style={[
                styles.answerButton,
                { backgroundColor: this.state.buttonBackgroundColor,
                  borderBottomWidth: this.state.borderBottomWidth,
                }
              ]}
              onPress={this.onClick}
            >
              <Text> {this.props.text} </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  answerButton: {
    borderWidth: 0,
    borderRadius: 5,
    padding: 3,
    
  },
});

export default Answer;
