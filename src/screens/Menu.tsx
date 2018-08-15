/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  ImageBackground,
  Linking,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  WebView,
  Button
} from "react-native";
import Image from "react-native-scalable-image";
import HeaderImageScrollView from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import Icon from "react-native-vector-icons/Entypo";

const MIN_HEIGHT = (Header as any).height;

interface IProp {
  navigation: any;
}
class Menu extends Component<IProp> {
  static navigationOptions = {
    title: "Menu",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false,
    style: {
      color: "#000000"
    },
    header: null
  };

  state = { MAX_HEIGHT: 0, scrollHeight: 0, click1: false };

  componentWillMount() {
    const winHeight = Dimensions.get("window").height;
    console.log("winHeight" + winHeight);

    if (winHeight < 736) {
      console.log("device height less than 736");
      this.setState({ scrollHeight: winHeight * 0.755 }); //75.5%
    } else if (winHeight >= 736) {
      console.log("device height greater than 736");
      this.setState({ scrollHeight: winHeight * 0.76 }); //76%
    }

    if (winHeight < 736) {
      console.log("device height less than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.175 }); //20%
    } else if (winHeight >= 736) {
      console.log("device height greater than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //20%
    }
  }

  //this is only a prototype for webview component. Not used.
  renderWebView1 = () => {
    if (this.state.click1) {
      return (
        <WebView
          source={{
            uri:
              "https://www.tedu.edu.tr/sites/default/files/content_files/2017-2018_akademik_takvim-senato_05.07.2018_0.pdf"
          }}
          style={{ marginTop: 20 }}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => {
            this.setState({ click1: true });
          }}
        >
          <ImageBackground
            source={require("../../img/subMenu/menu1.jpg")}
            style={{ width: Dimensions.get("window").width, height: 60 }}
          >
            <Text style={styles.menuText}>Fitness center programme</Text>
          </ImageBackground>
        </TouchableOpacity>
      );
    }
  };

  renderHeader = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        marginTop: this.state.MAX_HEIGHT - 35
      }}
    >
      <TouchableOpacity
        onPress={() => {
          console.log("pressed Header");
        }}
      >
        <Icon name="login" size={25} style={{ color: "rgb(1, 14, 41)" }} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("pressed Header");
        }}
      >
        <Icon
          name="dots-three-vertical"
          size={25}
          style={{ color: "rgb(1, 14, 41)" }}
        />
      </TouchableOpacity>
    </View>
  );
  render() {
    //Linking.openURL(`https://www.tedu.edu.tr/tr`)

    return (
      <HeaderImageScrollView
        maxHeight={this.state.MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image
            resizeMode="stretch"
            width={Dimensions.get("window").width}
            style={StyleSheet.absoluteFill}
            source={require("../../img/header/anatepe2.png")}
          />
        )}
        overlayColor="#144d8c"
        maxOverlayOpacity={1}
        bounces={false}
        contentOffset={{ x: 0, y: 0 }}
        scrollViewBackgroundColor="rgba(52, 52, 52, 0.40)"
        scrollEnabled={false}
        renderForeground={this.renderHeader}
      >
        <ImageBackground
          source={require("../../img/background/BACKGROUND.png")}
          style={{ width: Dimensions.get("window").width }}
        >
          <View style={styles.container} height={this.state.scrollHeight}>
            <ImageBackground
              source={require("../../img/background/BACKGROUND.png")}
              style={styles.mainBackGround}
            >
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url:
                      "https://www.tedu.edu.tr/sites/default/files/content_files/2017-2018_akademik_takvim-senato_05.07.2018_0.pdf",
                    title: "Fitness center programme",
                    backButton: "Menu"
                  });
                }}
              >
                <ImageBackground
                  source={require("../../img/subMenu/menu1.jpg")}
                  style={styles.subBackground}
                >
                  <Text style={styles.menuText}>Fitness center programme</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url:
                      "https://www.tedu.edu.tr/tr/main/akademik-takvim",
                    title: "Cafeteria programme",
                    backButton: "Menu"
                  });
                }}
              >
                <ImageBackground
                  source={require("../../img/subMenu/menu2.jpg")}
                  style={styles.subBackground}
                >
                  <Text style={styles.menuText}>Cafeteria programme</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url:
                      "https://my.tedu.edu.tr/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=001&sap-language=TR",
                    title: "TEDU Portal",
                    backButton: "Menu"
                  });
                }}
              >
                <ImageBackground
                  source={require("../../img/subMenu/menu3.jpg")}
                  style={styles.subBackground}
                >
                  <Text style={styles.menuText}>TEDU Portal</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url:
                      "https://issuu.com/tedukultursanat/docs",
                    title: "Karafanzin",
                    backButton: "Menu"
                  });
                }}
              >
                <ImageBackground
                  source={require("../../img/subMenu/menu4.jpg")}
                  style={styles.subBackground}
                >
                  <Text style={styles.menuText}>Karafanzin</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url:
                      "https://www.tedu.edu.tr/tr/main/akademik-takvim",
                    title: "Academic Calendar",
                    backButton: "Menu"
                  });
                }}
              >
                <ImageBackground
                  source={require("../../img/subMenu/menu6.png")}
                  style={styles.subBackground}
                >
                  <Text style={styles.menuText}>Academic calender</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url:
                      "http://www.radiotedu.com",
                    title: "Listen radio tedu",
                    backButton: "Menu"
                  });
                }}
              >
                <ImageBackground
                  source={require("../../img/subMenu/menu7.png")}
                  style={styles.subBackground}
                >
                  <Text style={styles.menuText}>Listen radio tedu</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </ImageBackground>
      </HeaderImageScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  menuText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center"
  },
  mainBackGround: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
  },
  subBackground: {
    width: Dimensions.get("window").width,
    height: 60
  },
  subContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Menu;

//HOW TO PASS PARAMETERS WITH REACT NATIVE NAVIGATION:
//this.props.navigation.navigate("WebviewRouter", { url: "https://www.tedu.edu.tr/sites/default/files/content_files/2017-2018_akademik_takvim-senato_05.07.2018_0.pdf" });
//ACCESS PAREMETERS IN TARGET PAGE LIKE THAT:
//this.props.navigation.state.params.url
