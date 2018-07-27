/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

class MoodleLogin extends Component {
  static navigationOptions = {
    title: "Calendar",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
  };
  state = {
    kullaniciAdi: "",
    sifre: ""
  };
  render() {
    return (
      <View style={{ padding: 10 }}>
        <Text style={styles.text}>Kullanıcı adı: </Text>
        <TextInput
          style={{
            height: 50,
            width: 250,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder="Kullanıcı adı!"
          onChangeText={kullaniciAdi => this.setState({ kullaniciAdi })}
        />
        <Text style={styles.text}>Şifre: </Text>
        <TextInput
          secureTextEntry={true}
          style={{
            height: 50,
            width: 250,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder="Şifre"
          onChangeText={sifre => this.setState({ sifre })}
        />
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

export default MoodleLogin;
