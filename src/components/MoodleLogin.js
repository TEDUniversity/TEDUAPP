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
  TextInput,
  Button,
  TouchableHighlight,
  Alert
} from "react-native";

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
            borderWidth: 1,
            color: "white"
          }}
          placeholder="Kullanıcı adı!"
          placeholderTextColor="gray"
          onChangeText={kullaniciAdi => this.setState({ kullaniciAdi })}
        />
        <Text style={styles.text}>Şifre: </Text>
        <TextInput
          secureTextEntry={true}
          style={{
            height: 50,
            width: 250,
            borderColor: "gray",
            borderWidth: 1,
            color: "white"
          }}
          placeholderTextColor="gray"
          placeholder="Şifre"
          onChangeText={sifre => this.setState({ sifre })}
        />
        <View>
          <TouchableHighlight
            style={{
              height: 40,
              width: 250,
              borderRadius: 10,
              marginTop: 20
            }}
          >
            <Button onPress={this.props.onPress} title="GİRİŞ" />
          </TouchableHighlight>
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
    fontWeight: "bold",
    color: "white"
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MoodleLogin;
