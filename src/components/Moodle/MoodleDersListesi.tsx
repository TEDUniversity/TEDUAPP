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
  TouchableOpacity
} from "react-native";

interface IProps {
  dersler: any;
  navigation: any;
}
class MoodleDersListesi extends Component<IProps> {
  state = {
    dersler: []
  };
  renderAClass = () => {
    return this.props.dersler.map(
      (responseData, Id) =>
        responseData["visible"] === 1 ? (
          <TouchableOpacity
            key={Id}
            onPress={() => {
              this.props.navigation.navigate("DersDetayRouter");
            }}
          >
            <View style={styles.subContainer}>
              <Text
                style={{
                  margin: 5,
                  marginBottom: 0,
                  fontSize: 20,
                  color: "black"
                }}
              >
                {responseData["fullname"]}
              </Text>
              <Text style={{ fontSize: 15, margin: 5 }}>
                {responseData["summary"]}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View key={Id} />
        )
    );
  };

  componentDidMount() {}
  componentWillReceiveProps(next: IProps) {}
  render() {
    return (
      <ScrollView style={styles.container}>{this.renderAClass()}</ScrollView>
    );
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
    backgroundColor: "white",
    width: Dimensions.get("window").width - 10,
    // height: Dimensions.get("window").height / 6,
    margin: 5
  }
});

export default MoodleDersListesi;
