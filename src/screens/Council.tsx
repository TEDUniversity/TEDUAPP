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
  Alert,
  Platform,
  RefreshControl
} from "react-native";
import Image from "react-native-scalable-image";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import MoodleLogin from "../components/Moodle/MoodleLogin";
import DetailNews from "../components/DetailNews";
import CouncilNews from "../components/CouncilNews";
import CouncilVotings from "../components/CouncilVotings";
import * as types from "../store/types";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

// import { ADDRGETNETWORKPARAMS } from "dns";

const MIN_HEIGHT = (Header as any).HEIGHT - 20;

interface IProp {
  navigation: any;
}

let deviceWidth = Dimensions.get("window").width;

interface ReduxProps {
  User: types.User;
  isMoodleLoggedIn: boolean;
  updateUser: (user: types.User) => any;
  updateIsMoodleLoggedIn: (isLoggedIn: boolean) => any;
  updateCouncilNews: (news: any[]) => any;
}

class Council extends Component<IProp & ReduxProps> {
  //not used.
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
  //
  state = {
    loading: false,
    selectedTab: "News",
    MAX_HEIGHT: 0,
    dataDuyurular: [],
    dataHaberler: [],
    dataEtkinlikler: [],
    token: "",
    scrollHeight: Dimensions.get("window").height,
    reloadNumber: 0
  };

  renderDataDuyurular = () => {
    return this.state.dataDuyurular.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} imgsrc={"sarı"} />
    ));
  };
  renderDataEtkinlikler = () => {
    return this.state.dataHaberler.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} imgsrc={"kırmızı"} />
    ));
  };
  renderDataHaberler = () => {
    return this.state.dataEtkinlikler.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} imgsrc={"mavi"} />
    ));
  };

  _onRefresh = () => {
    this.setState({ loading: true });
    this.setState({ reloadNumber: this.state.reloadNumber + 1 }, () => {
      this.setState({ loading: false });
    });
    // setTimeout(() => {
    //   this.setState({ loading: false });
    // }, 500);
  };

  componentWillMount() {
    //const parseString = require("xml2js").parseString;

    /*let news = [];
    firebase
      .database()
      .ref("/councilNews")
      .on("value", response => {
        response.forEach(child => {
          news.push(child.val());
        })
        this.props.updateCouncilNews(news)
      });
*/
    const winHeight = Dimensions.get("window").height;
    console.log("winHeight" + winHeight);

    //set the header height
    if (winHeight <= 568) {
      //5s height
      this.setState({ MAX_HEIGHT: winHeight * 0.234 }); //75.5%
    } else if (winHeight > 568 && winHeight < 736) {
      //console.log("device height less than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.233 }); //17.5%
    } else if (winHeight >= 736) {
      //console.log("device height greater than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.23 }); //18%
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

  renderBody = () => {
    if (this.state.selectedTab === "News") {
      return (
        <CouncilNews
          key={this.state.reloadNumber}
          navigation={this.props.navigation}
        />
      );
    } else if (this.state.selectedTab === "Votings") {
      return (
        <CouncilVotings
          key={this.state.reloadNumber}
          navigation={this.props.navigation}
        />
      );
    }
  };

  renderHeader = () => {
    let icon = <View />;
    if (this.props.isMoodleLoggedIn) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Are you sure?",
                "Are you sure to log out?",
                [
                  {
                    text: "No",
                    onPress: () => { }
                  },
                  {
                    text: "Yes",
                    onPress: () => this.props.updateIsMoodleLoggedIn(false)
                  }
                ],
                { cancelable: false }
              );
              return <View />;
            }}
          >
            <Icon
              name="log-out"
              size={25}
              style={{ color: "rgb(1, 14, 41)" }}
            />
          </TouchableOpacity>

          <TabNavigator
            tabBarStyle={styles.tabNav}
            sceneStyle={{ height: 0 }}
            tabBarShadowStyle={{ backgroundColor: "transparent" }}
          >
            <TabNavigator.Item
              selected={this.state.selectedTab === "News"}
              title="Council News"
              //renderIcon={() => <Image source={require("./img/moodle/m3.png")} />}
              //badgeText="+1"
              onPress={() => {
                this.setState({ selectedTab: "News" });
                //console.log(this.state.selectedTab);
              }}
              titleStyle={styles.tabNavTitle}
            >
              <Text> </Text>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === "Votings"}
              title="Surveys"
              //renderIcon={() => <Image source={require("./img/menu/me3.png")} />}
              onPress={() => {
                this.setState({ selectedTab: "Votings" });
                //console.log(this.state.selectedTab);
              }}
              titleStyle={styles.tabNavTitle}
            >
              <Text> </Text>
            </TabNavigator.Item>
          </TabNavigator>
        </View>
      );
    }
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
        //this.getDersler();
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
          Alert.alert("Error", "Username or password is incorrect!");
        } else {
          this.setState({ token: JSON.parse(http.responseText).token });
          this.getUserInfo();
        }
      }
    };
    http.send(params);
  };

  render() {
    let winHeight = Dimensions.get("window").height;
    let headerMarginTop = 0; //header margin for iphone X
    if (winHeight >= 812) {
      headerMarginTop = 37;
    } else {
      headerMarginTop = Platform.OS === "ios" ? 9 : 0;
    }
    let moodlePage;
    if (!this.props.isMoodleLoggedIn) {
      moodlePage = (
        <View
          height={this.state.scrollHeight}
          width={Dimensions.get("window").width}
        >
          <ImageBackground
            source={require("../../img/background/BACKGROUND.png")}
            style={styles.mainBackGround}
          >
            <View style={styles.MoodleContainer}>
              <MoodleLogin onPress={this.login} />
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      moodlePage = (
        <View>
          <ImageBackground
            source={require("../../img/background/BACKGROUND.png")}
            style={styles.mainBackGround}
          >
            {this.renderBody()}
          </ImageBackground>
        </View>
      );
    }
    return (
      <HeaderImageScrollView
        refreshControl={
          Platform.select({
            android: (<RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
            />)
          })
        }
        maxHeight={this.state.MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <View
            style={{
              backgroundColor: "rgb(15, 108, 177)",
              height: Platform.OS === "ios" ? 50 : 140
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
        bounces={true}
        showsVerticalScrollIndicator={false}
        scrollViewBackgroundColor="rgb(231,231,232)"
        fadeOutForeground={true}
        renderForeground={() => {
          if (this.props.isMoodleLoggedIn) {
            return (
              <TabNavigator
                tabBarStyle={styles.tabNav}
                sceneStyle={{ height: 0 }}
                tabBarShadowStyle={{ backgroundColor: "transparent" }}
              >
                <TabNavigator.Item
                  selected={this.state.selectedTab === "News"}
                  title="Council News"
                  //renderIcon={() => <Image source={require("./img/moodle/m3.png")} />}
                  //badgeText="+1"
                  onPress={() => {
                    this.setState({ selectedTab: "News" });
                    //console.log(this.state.selectedTab);
                  }}
                  titleStyle={styles.tabNavTitle}
                >
                  <Text> </Text>
                </TabNavigator.Item>
                <TabNavigator.Item
                  selected={this.state.selectedTab === "Votings"}
                  title="Surveys"
                  //renderIcon={() => <Image source={require("./img/menu/me3.png")} />}
                  onPress={() => {
                    this.setState({ selectedTab: "Votings" });
                    //console.log(this.state.selectedTab);
                  }}
                  titleStyle={styles.tabNavTitle}
                >
                  <Text> </Text>
                </TabNavigator.Item>
              </TabNavigator>
            );
          }
        }}
      >
        {moodlePage}
      </HeaderImageScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "1%"
  },
  MoodleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  questionContainer: {
    //justifyContent: "center"
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
    //flex: 1,
    //justifyContent: "flex-start",
    width: "100%",
    height: deviceWidth / 15,
    backgroundColor: "rgb(41,48,109)",
    alignItems: "center"
    //#373738
  },
  tabNavTitle: {
    fontSize: 11,
    fontWeight: "600"
  },
  mainBackGround: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
    // width: null,
    // height: null
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
  },
  updateCouncilNews: (news: any[]) => {
    dispatch(actions.updateCouncilNews(news));
  }
});

export default connect<{}, {}, ReduxProps>(
  mapStateToProps,
  mapDispatchToProps
)(Council);
