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
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";

interface IProps {
  dersler: any;
  navigation: any;
}

let deviceWidth = Dimensions.get("window").width;

class MoodleDersListesi extends Component<IProps> {
  state = {
    dersler: []
  };
  renderAClass = () => {
    return this.props.dersler.map(
      (responseData, Id) =>
        responseData["visible"] === 1 ? (
          <TouchableOpacity
            style={styles.button}
            key={Id}
            onPress={() => {
              this.props.navigation.navigate("DersDetayRouter", {
                courseId: responseData["id"],
                navigationOptions: {
                  title: "Detay"
                }
              });
            }}
          >
            <View style={styles.subContainer}>
              <Text
                style={{
                  margin: deviceWidth / 75,
                  marginBottom: 0,
                  fontSize: deviceWidth / 18.75,
                  color: "black"
                }}
              >
                {responseData["fullname"]}
              </Text>
              <Text
                style={{ fontSize: deviceWidth / 25, margin: deviceWidth / 75 }}
              >
                {responseData["summary"]}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View key={Id}>
            <TouchableOpacity
              style={styles.button}
              key={Id}
              onPress={() => {
                Alert.alert(
                  "Warning",
                  "You do not have permission to see this class"
                );
              }}
            >
              <View style={styles.subContainer}>
                <Text
                  style={{
                    margin: deviceWidth / 75,
                    marginBottom: 0,
                    fontSize: deviceWidth / 18.75,
                    color: "black"
                  }}
                >
                  {responseData["fullname"]}
                </Text>
                <Text
                  style={{
                    fontSize: deviceWidth / 25,
                    margin: deviceWidth / 75
                  }}
                >
                  {"Not visible class"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
    );
  };

  componentDidMount() {}
  componentWillReceiveProps(next: IProps) {}
  render() {
    if (this.props.dersler.length !== 0) {
      return (
        <ScrollView style={styles.container}>{this.renderAClass()}</ScrollView>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            You do not have any classes on Moodle
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006AB3",
    width: Dimensions.get("window").width - 10,
    // height: Dimensions.get("window").height / 6,
    margin: 5
  },
  button: {
    height: deviceWidth / 5.76
    //height: deviceWidth/2.5,
    //width: deviceWidth/2.5,
  }
});

export default MoodleDersListesi;
