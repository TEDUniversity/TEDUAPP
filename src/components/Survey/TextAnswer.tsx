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
              TextInput
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
}

interface ReduxProps {
              surveys?: types.Survey[];
              updateSurveys?: (surveys: types.Survey[]) => any;
}

class TextAnswer extends Component<IProp & ReduxProps> {


              constructor(props: IProp) {
                            super(props);

              }

              state = {
                            buttonBackgroundColor: "",
                            borderBottomWidth: 0.5,
                            textAnswer: ""

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

              onWrite = () => {

                            this.props.getAnswer(this.state.textAnswer);

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

                                          <TextInput
                                                        style={{height: 100}}
                                                        editable={true}
                                                        maxLength={280}
                                                        multiline={true}
                                                        numberOfLines={4}
                                                        onChangeText={(text) => {this.setState({textAnswer: text }, this.onWrite )}}
                                                        placeholder={"Type here..."}
                                          />
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
)(TextAnswer);
