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
  Platform,
  ScrollView
} from "react-native";
import Image from "react-native-scalable-image";
import HeaderImageScrollView from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import Icon from "react-native-vector-icons/Entypo";

interface IProp {
  navigation: any;
}

let deviceWidth = Dimensions.get("window").width;
const MIN_HEIGHT = (Header as any).height;

class Menu extends Component<IProp> {
  static navigationOptions = {
    title: "Menü",
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

    if (winHeight <= 568) {
      //5s height
      this.setState({ MAX_HEIGHT: winHeight * 0.196 }); //75.5%
    } else if (winHeight > 568 && winHeight < 736) {
      console.log("device height less than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.196 }); //20%
    } else if (winHeight >= 736) {
      console.log("device height greater than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.194 }); //20%
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
    let winHeight = Dimensions.get("window").height;
    let headerMarginTop = 0; //header margin for iphone X
    if (winHeight >= 812) {
      headerMarginTop = 32;
    } else {
      headerMarginTop = Platform.OS === "ios" ? 9 : 0;
    }
    return (
      <HeaderImageScrollView
        maxHeight={this.state.MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <View
            style={{
              backgroundColor: "rgb(15, 108, 177)",
              height: Platform.OS === "ios" ? 50 : this.state.MAX_HEIGHT
            }}
          >
            <Image
              resizeMode="stretch"
              width={Dimensions.get("window").width}
              style={[StyleSheet.absoluteFill, { marginTop: headerMarginTop }]}
              source={require("../../img/header/anatepe2.png")}
            />
          </View>
        )}
        overlayColor="#006AB3"
        maxOverlayOpacity={1}
        bounces={false}
        contentOffset={{ x: 0, y: 0 }}
        scrollViewBackgroundColor="rgba(52, 52, 52, 0.40)"
        scrollEnabled={false}
      //renderForeground={this.renderHeader}
      >
        <View style={styles.container} height={this.state.scrollHeight}>
          <ImageBackground
            source={require("../../img/background/BACKGROUND.png")}
            style={styles.mainBackGround}
          >
            <ScrollView
              contentContainerStyle={{ flex: 1, justifyContent: "flex-start" }}
            >
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url:
                      "https://my.tedu.edu.tr/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=001&sap-language=TR",
                    title: "TEDU Portal",
                    backButton: "Menü"
                  });
                }}
              >
                <View
                  style={[
                    styles.subBackground,
                    { backgroundColor: "rgb(194,170,36)" }
                  ]}
                >
                  <Text style={styles.menuText}>MyTEDU Portal</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url: "https://issuu.com/tedukultursanat/docs",
                    title: "Karafanzin",
                    backButton: "Menü"
                  });
                }}
              >
                <View
                  style={[
                    styles.subBackground,
                    { backgroundColor: "rgb(158,183,57)" }
                  ]}
                >
                  <Text style={styles.menuText}>Karafanzin</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url: "https://www.tedu.edu.tr/tr/main/akademik-takvim",
                    title: "Academic Calendar",
                    backButton: "Menü"
                  });
                }}
              >
                <View
                  style={[
                    styles.subBackground,
                    { backgroundColor: "rgb(35,49,126)" }
                  ]}
                >
                  <Text style={styles.menuText}>Akademik Takvim</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url: "http://www.radiotedu.com",
                    title: "Listen radio tedu",
                    backButton: "Menü"
                  });
                }}
              >
                <View
                  style={[
                    styles.subBackground,
                    { backgroundColor: "rgb(24,154,208)" }
                  ]}
                >
                  <Text style={styles.menuText}>RadioTEDÜ</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  console.log("credits");
                  this.props.navigation.navigate("CreditsRouter", {
                    url: "http://www.radiotedu.com",
                    title: "Credits",
                    backButton: "Menü"
                  });
                }}
              >
                <View
                  style={[
                    styles.subBackground,
                    { backgroundColor: "rgb(146,24,27)" }
                  ]}
                >
                  <Text style={styles.menuText}>Credits</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </ImageBackground>
        </View>
      </HeaderImageScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    //alignItems: "center",
    marginTop: 0
  },
  menuText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: deviceWidth / 26.5
  },
  mainBackGround: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
  },
  subBackground: {
    width: deviceWidth,
    alignItems: "center",
    justifyContent: "center",
    height: deviceWidth / 6.25
  },
  subContainer: {
    marginTop: deviceWidth / 18.75,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Menu;

//HOW TO PASS PARAMETERS WITH REACT NATIVE NAVIGATION:
//this.props.navigation.navigate("WebviewRouter", { url: "https://www.tedu.edu.tr/sites/default/files/content_files/2017-2018_akademik_takvim-senato_05.07.2018_0.pdf" });
//ACCESS PAREMETERS IN TARGET PAGE LIKE THAT:
//this.props.navigation.state.params.url

/*
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
                  <Text style={styles.menuText}>Fitness Center Programme</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => {
                  this.props.navigation.navigate("WebviewRouter", {
                    url: "https://www.tedu.edu.tr/tr/main/akademik-takvim",
                    title: "Cafeteria programme",
                    backButton: "Menu"
                  });
                }}
              >
                <ImageBackground
                  source={require("../../img/subMenu/menu2.jpg")}
                  style={styles.subBackground}
                >
                  <Text style={styles.menuText}>Cafeteria Programme</Text>
                </ImageBackground>
              </TouchableOpacity>
*/
