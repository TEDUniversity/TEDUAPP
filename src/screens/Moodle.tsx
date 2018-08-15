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
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";
import Image from "react-native-scalable-image";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/Entypo";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import DetailNews from "../components/DetailNews";
import MoodleLogin from "../components/Moodle/MoodleLogin";
import { API_LINK } from "../util/types";
import MoodleDersListesi from "../components/Moodle/MoodleDersListesi";
import * as types from "../store/types";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const MIN_HEIGHT = (Header as any).height;

interface IProp {
  navigation: any;
}
interface ReduxProps {
  User: types.User;
  isMoodleLoggedIn: boolean;
  updateUser: (user: types.User) => any;
  updateIsMoodleLoggedIn: (isLoggedIn: boolean) => any;
}
class Moodle extends Component<IProp & ReduxProps> {
  static navigationOptions = {
    headerTitle: (
      <Image
        resizeMode="contain"
        width={Dimensions.get("window").width}
        style={{ marginTop: 40 }}
        source={require("../../img/header/anatepe2.png")}
      />
    ),
    title: "Council",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
  };
  state = {
    selectedTab: "",
    MAX_HEIGHT: 0,
    scrollHeight: 0,
    loggedin: false,
    token: "",
    dersler: []
  };

  componentWillMount() {
    //const parseString = require("xml2js").parseString;

    const winHeight = Dimensions.get("window").height;
    console.log("winHeight" + winHeight);
    this.getDersler();

    //set header height
    if (winHeight < 736) {
      console.log("device height less than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.175 }); //17.5%
    } else if (winHeight >= 736) {
      console.log("device height greater than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //18%
    }

    //set scroll height
    if (winHeight < 736) {
      //console.log("device height less than 736");
      this.setState({ scrollHeight: winHeight * 0.755 }); //75.5%
    } else if (winHeight >= 736) {
      //console.log("device height greater than 736");
      this.setState({ scrollHeight: winHeight * 0.76 }); //76%
    }
  }
  

  getDersler = () => {
    let url = "https://moodle.tedu.edu.tr/webservice/rest/server.php";
    var http = new XMLHttpRequest();
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var params =
      "moodlewsrestformat=json&wsfunction=core_enrol_get_users_courses&wstoken=" +
      this.props.User.token +
      "&userid=" +
      this.props.User.userid;

    http.onreadystatechange = () => {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        let dersArr = [];
        for (let index = 0; index < JSON.parse(http.response).length; index++) {
          dersArr.push(JSON.parse(http.response)[index]);
        }
        this.setState({ dersler: dersArr });
      }
    };

    http.send(params);
  };

  getUserInfo = () => {
    var http = new XMLHttpRequest();
    var url = "https://moodle.tedu.edu.tr/webservice/rest/server.php";
    var params =
      "wstoken=" +
      this.state.token +
      "&moodlewsrestformat=json&wsfunction=core_webservice_get_site_info";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = () => {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        let u: types.User = {
          userid: JSON.parse(http.responseText).userid,
          token: this.state.token,
          userName: JSON.parse(http.responseText).username,
          firstName: JSON.parse(http.responseText).firstname,
          lastName: JSON.parse(http.responseText).lastname,
          userpictureurl: JSON.parse(http.responseText).userpictureurl
        };
        this.props.updateUser(u);
        this.props.updateIsMoodleLoggedIn(true);
        this.getDersler();
      }
    };
    http.send(params);
  };

  login = (user, pass) => {
    var http = new XMLHttpRequest();
    var url = "https://moodle.tedu.edu.tr/login/token.php";
    var params =
      "username=" + user + "&password=" + pass + "&service=moodle_mobile_app";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = () => {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        if (!JSON.parse(http.responseText).token) {
          alert("Kullanıcı adı veya şifre yanlış!");
        } else {
          this.setState({ token: JSON.parse(http.responseText).token });
          this.getUserInfo();
        }
      }
    };
    http.send(params);
  };

  renderHeader = () => {
    let icon = <View />;
    if (this.props.isMoodleLoggedIn) {
      icon = (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Emin Misin?",
              "Çıkış yapmak istediğine emin misin?.",
              [
                {
                  text: "Evet",
                  onPress: () => this.props.updateIsMoodleLoggedIn(false)
                },
                {
                  text: "Hayır",
                  onPress: () => {}
                }
              ],
              { cancelable: false }
            );
            return <View />;
          }}
        >
          <Icon name="log-out" size={25} style={{ color: "rgb(1, 14, 41)" }} />
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          marginTop: this.state.MAX_HEIGHT - 35
        }}
      >
        {icon}
      </View>
    );
  };

  render() {
    let moodlePage;
    if (!this.props.isMoodleLoggedIn) {
      moodlePage = <MoodleLogin onPress={this.login} />;
    } else {
      moodlePage = (
        <MoodleDersListesi
          dersler={this.state.dersler}
          navigation={this.props.navigation}
        />
      );
    }
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
        scrollEnabled={false}
        renderForeground={this.renderHeader}
      >
        <View height={this.state.scrollHeight}>
          <ImageBackground
            source={require("../../img/background/BACKGROUND.png")}
            style={styles.mainBackGround}
          >
            <View style={styles.container}>{moodlePage}</View>
          </ImageBackground>
        </View>
      </HeaderImageScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center"
  },
  answers: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    padding: 5,
    margin: 5
  },
  answerButton: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 3
  },
  question: {
    marginLeft: "5%"
  },
  text: {
    fontWeight: "bold"
  },

  tabNav: {
    //marginLeft: -100,
    width: "100%",
    flex: 1,
    height: 25,
    backgroundColor: "#373738",
    alignItems: "center"
  },
  tabNavTitle: {},
  mainBackGround: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
  }
});

const mapStateToProps = (state: types.GlobalState) => {
  return {
    User: state.User,
    isMoodleLoggedIn: state.isMoodleLoggedIn
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateUser: (user: types.User) => {
    dispatch(actions.updateUser(user));
  },
  updateIsMoodleLoggedIn: (moodleLoggedIn: boolean) => {
    dispatch(actions.updateMoodleLoggedIn(moodleLoggedIn));
  }
});

export default connect<{}, {}, ReduxProps>(
  mapStateToProps,
  mapDispatchToProps
)(Moodle);
