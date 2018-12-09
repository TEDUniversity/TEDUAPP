import React, { Component } from "react";
import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  WebView,
  Alert
} from "react-native";
import Image from "react-native-scalable-image";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const Spinner = ({ size }) => <ActivityIndicator size={size || "large"} />;

const Imagee = (Source, Width, Style) => (
  <Image
    style={Style}
    width={Width} // height will be calculated automatically
    source={Source}
  />
);

interface IProp {
  navigation: any;
}

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

class Credits extends React.Component<IProp> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={styles.headerTitle}> {navigation.state.params.title} </Text>
    ),
    title: "Webview",
    headerStyle: {
      marginTop: 0,
      backgroundColor: "#144d8c",
      height: deviceWidth / 10.7
    },
    headerLeft: (
      <TouchableOpacity
        style={styles.headerLeftContainer}
        onPress={() => {
          navigation.navigate("MainRouter", { showAlert: false });
        }}
      >
        <Icon name="ios-arrow-back" size={30} />
        <Text style={styles.headerLeftText}>
          {navigation.state.params.backButton}
        </Text>
      </TouchableOpacity>
    )
  });

  render() {
    console.log(this.props.navigation.state.params.url);
    return (
      <View style={styles.container} height={deviceHeight}>
        <ImageBackground
          source={require("../../img/background/BACKGROUND.png")}
          style={styles.mainBackGround}
        >
          <Image
            style={styles.teduIcon}
            width={deviceWidth / 3.75} // height will be calculated automatically
            source={require("../../img/teduappicon/Icon-App-60x60.png")}
          />
          <Text style={styles.text}> (+90 312) 585 00 00 </Text>
          <View style={styles.socialContainer}>
            <Image
              onPress={() => {
                this.props.navigation.navigate("WebviewRouter", {
                  url: "https://www.facebook.com/TEDUniversity",
                  backButton: "Menu",
                  backRoute: "CreditsRouter"
                });
              }}
              style={styles.socialIcon}
              width={deviceWidth / 12.5} // height will be calculated automatically
              source={require("../../img/social/facebook.png")}
            />
            <Image
              onPress={() => {
                this.props.navigation.navigate("WebviewRouter", {
                  url: "https://www.instagram.com/universityted/",
                  title: "TEDU Instagram",
                  backButton: "Menu",
                  backRoute: "CreditsRouter"
                });
              }}
              style={styles.socialIcon}
              width={deviceWidth / 12.5} // height will be calculated automatically
              source={require("../../img/social/instagram.png")}
            />
            <Image
              onPress={() => {
                this.props.navigation.navigate("WebviewRouter", {
                  url:
                    "https://tr.linkedin.com/edu/ted-%C3%BCniversitesi-23068",
                  title: "TEDU Linkedin",
                  backButton: "Menu",
                  backRoute: "CreditsRouter"
                });
              }}
              style={styles.socialIcon}
              width={deviceWidth / 12.5} // height will be calculated automatically
              source={require("../../img/social/linkedin.png")}
            />
            <Image
              onPress={() => {
                this.props.navigation.navigate("WebviewRouter", {
                  url: "https://twitter.com/TED_Uni",
                  title: "TEDU Twitter",
                  backButton: "Menu",
                  backRoute: "CreditsRouter"
                });
              }}
              style={styles.socialIcon}
              width={deviceWidth / 12.5} // height will be calculated automatically
              source={require("../../img/social/twitter.png")}
            />
            <Image
              onPress={() => {
                this.props.navigation.navigate("WebviewRouter", {
                  url: "https://www.youtube.com/user/TEDUChannel",
                  title: "TEDU Youtube",
                  backButton: "Menu",
                  backRoute: "CreditsRouter"
                });
              }}
              style={styles.socialIcon}
              width={deviceWidth / 12.5} // height will be calculated automatically
              source={require("../../img/social/youtube.png")}
            />
          </View>
          <Text style={styles.text}> info@tedu.edu.tr </Text>

          <View style={styles.developerContainer}>
            <View style={styles.developerSubContainer}>
              <Text style={styles.developerName}>
                Arda Tümay / IOS Developer
              </Text>
              <Text style={styles.developerMail}>arda.tumay@tedu.edu.tr </Text>
            </View>
            <View
              style={[
                styles.developerSubContainer,
                { marginTop: deviceWidth / 18.75 }
              ]}
            >
              <Text style={styles.developerName}>
                Hayri Durmaz / Android Developer
              </Text>
              <Text style={styles.developerMail}>
                hayri.durmaz@tedu.edu.tr{" "}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Credits;

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "bold",
    fontSize: deviceWidth / 22
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: deviceWidth / 125
  },
  headerLeftText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: deviceWidth / 26.45,
    fontWeight: "400"
  },
  container: {
    marginTop: -deviceWidth / 3.75,
    flex: 1
  },
  socialIcon: {
    margin: deviceWidth / 75
  },
  teduIcon: {
    marginTop: deviceWidth / 12.5
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: deviceWidth / 75
  },
  text: {
    fontSize: deviceWidth / 25,
    fontWeight: "400",
    marginTop: deviceWidth / 65
  },
  developerMail: {
    marginTop: deviceWidth / 75,
    color: "rgb(24, 79, 138)"
  },
  developerName: {
    fontSize: 14,
    fontWeight: "500"
  },
  developerContainer: {
    marginTop: deviceWidth / 2.5
  },
  developerSubContainer: {
    alignItems: "center"
  },
  mainBackGround: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flex: 1
  }
});
