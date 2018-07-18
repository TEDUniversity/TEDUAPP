/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

class News extends Component {
    static navigationOptions = {
        title: "News",
        headerStyle: { marginTop: 0, backgroundColor: "#fff" },
        headerLeft: null,
        gesturesEnabled: false,
      };
  
    render() {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.text}>
                    This is News.
                </Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
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

  export default News;
