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

interface IProp {
  onPress: (kullaniciAdi: string, sifre: string) => void;
  style?: any;
}
class MoodleLogin extends Component<IProp> {
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
      <View style={[{ padding: 10 }, this.props.style]}>
        <View>
          <Text style={[styles.text, { marginBottom: 5 }]}>
            Kullanıcı adı:{" "}
          </Text>
          <TextInput
            style={{
              height: 50,
              width: 250,
              borderColor: "gray",
              borderRadius: 10,
              borderWidth: 1,
              color: "black"
            }}
            placeholder="Kullanıcı adı"
            placeholderTextColor="gray"
            onChangeText={kullaniciAdi => this.setState({ kullaniciAdi })}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={[styles.text, { marginBottom: 5 }]}>Şifre: </Text>
          <TextInput
            secureTextEntry={true}
            style={{
              height: 50,
              width: 250,
              borderColor: "gray",
              borderRadius: 10,
              borderWidth: 1,
              color: "black"
            }}
            placeholderTextColor="gray"
            placeholder="Şifre"
            onChangeText={sifre => this.setState({ sifre })}
          />
        </View>

        <View>
          <TouchableHighlight
            onPress={() => {
              this.props.onPress(this.state.kullaniciAdi, this.state.sifre);
            }}
            style={{
              height: 40,
              width: 250,
              borderRadius: 10,
              marginTop: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(15, 108, 177)"
            }}
          >
            <Text style={{ color: "white" }}>GİRİŞ</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          onPress={() => {
            Alert.alert(
              "Giriş yapmak için",
              'Kullanıcı adınız sonunda "@" işareti olmadan mail kullanıcı adı(adınız.soyadınız), şifreniz mail şifrenizdir.'
            );
          }}
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "rgb(15, 108, 177)" }}>
            Nasıl giriş yaparım?
          </Text>
        </TouchableHighlight>
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
    color: "black"
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MoodleLogin;
