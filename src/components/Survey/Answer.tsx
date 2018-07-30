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
  }

class Answer extends Component<IProp> {
  state = {
    buttonBackgroundColor: "",
    clicked: false,
    borderBottomWidth: 0.5
    
  };

  render() {
      //console.log(this.props.text);
    return (
        <TouchableOpacity
              style={[
                styles.answerButton,
                { backgroundColor: this.state.buttonBackgroundColor,
                  borderBottomWidth: this.state.borderBottomWidth,
                }
              ]}
              onPress={() => {
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
                  console.log(this.state.clicked);
                }
              }}
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
