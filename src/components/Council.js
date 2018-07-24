/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Image from 'react-native-scalable-image';
import HTML from "react-native-render-html";


class Council extends Component {
    static navigationOptions = {
        headerTitle: (
            <Image resizeMode="contain" width={Dimensions.get('window').width} style={{ marginTop: 40 }} source={require("./img/header/anatepe2.png")} />
        ),
        title: "Council",
        headerStyle: { marginTop: 0, backgroundColor: "#fff" },
        headerLeft: null,
        gesturesEnabled: false,
      };
  
    render() {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.text}>
                    This is Council.
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

  export default Council;
