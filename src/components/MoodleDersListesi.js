/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

class MoodleDersListesi extends Component {
  state = {
    dersler: []
  };
  renderAClass = () => {
    this.state.dersler.map((responseData, Id) => (
      <View>
        <Text>{responseData}</Text>
      </View>
    ));
  };

  getDersler = () => {
    let url =
      "https://moodle.tedu.edu.tr/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_enrol_get_users_courses&wstoken=" +
      this.props.token +
      "&userid=" +
      this.props.uid;
    var http = new XMLHttpRequest();
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        alert(this.responseText);
      }
    };
    http.send(params);
  };

  componentDidMount() {
    this.getDersler();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.text} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MoodleDersListesi;
