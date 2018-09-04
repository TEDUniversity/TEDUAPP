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
import firebase from "firebase";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { storeData, retrieveData } from "../util/helpers";

interface IProps {
  navigation: any;
}
class CouncilNews extends Component<IProps> {

  componentWillMount() {
    this.readCouncilNewsData();
  }


  readCouncilNewsData = () => {
    firebase
      .database()
      .ref("/councilNews")
      .on("value", response => {
        console.log(response.val());

         //store the data returned from firebase in asyncstorage
        //storeData("CouncilVotings", JSON.stringify(response.val())).then(() => {
          //it is casted to string because it is stored as string in local storage. After getting is parse it as json.
          //retrieveData("CouncilVotings").then((res:string) => {  this.updateSurvey(JSON.parse(res))})          
        //});
        
        //this.updateSurvey(voting)
        //console.log(this.props.surveys);
      });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text> news </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "1%"
  }
});

export default CouncilNews;
