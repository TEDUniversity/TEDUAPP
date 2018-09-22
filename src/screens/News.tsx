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
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Platform,
  RefreshControl
} from "react-native";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import DetailNews from "../components/DetailNews";
import HorizontalList from "../components/HorizontalList";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import Image from "react-native-scalable-image";
import { storeData, retrieveData, getDataAll } from "../util/helpers";
import * as types from "../store/types";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

export const Spinner = ({ size }) => (
  <View>
    <ActivityIndicator size={size || "large"} />
  </View>
);

const MIN_HEIGHT = (Header as any).HEIGHT - 20;
//const MAX_HEIGHT = 120;

interface IProp {
  showAlert: any;
  navigation: any;
}
interface ReduxProps {
  rss?: string[];
  updateRss?: (rss: string[]) => any;
}

let deviceWidth = Dimensions.get("screen").width;

class News extends Component<IProp & ReduxProps> {
  static navigationOptions = {
    title: "News",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false,
    header: null
  };
  _isMounted: boolean;

  constructor(props) {
    super(props);
    //this.renderDataDuyurular = this.renderDataDuyurular.bind(this);
    //this.renderDataEtkinlikler = this.renderDataEtkinlikler.bind(this);
    //this.renderDataHaberler = this.renderDataHaberler.bind(this);
  }
  state = {
    data: [],
    dataEtkinlikler: [],
    dataHaberler: [],
    dataDuyurular: [],
    loading: true,
    MAX_HEIGHT: 0,
    scrollHeight: Dimensions.get("window").height,
    networkError: false,
    showAlert: this.props.showAlert,
    horizontalMarginTop: 20,
    refreshing: false
  };

  _onRefresh = () => {
    this._isMounted && this.setState({ loading: true });
    fetch("https://www.tedu.edu.tr/rss.xml")
      .then(response => response.text())
      .then(RSS => rssParser.parse(RSS))
      .catch(error => console.log(error))
      .then(result => {
        this.props.updateRss(result.items);
      })
      .then(() => {
        this._isMounted && this.setState({ loading: false, refreshing: false });
        this.whenLoaded();
      })
      .catch(error => {
        console.log(error);
        this._isMounted && this.setState({ networkError: true });
        console.log("net err" + this.state.networkError);
        console.log("alert err" + this.state.showAlert);
        this.whenLoaded();
        this._isMounted && this.setState({ loading: false, refreshing: false });
        if (this.state.networkError === true && this.state.showAlert === true) {
          Alert.alert(
            "Network error",
            "Check your network connection.",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.navigation.state.params.showAlert = false;
                  console.log(this.props.navigation.state.params.showAlert);
                  console.log(this.state.showAlert);
                }
              }
            ],
            { cancelable: false }
          );
        }
      })
      .then(() => {
        // this.whenLoaded();
      });
  };
  //not used. for editind navigation parameters.
  setNavParams = props => {
    props.navigation.setParams({
      showAlert: false
    });
  };
  componentDidMount() { }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentWillMount() {
    this._isMounted = true;

    //AsyncStorage.setItem("user", JSON.stringify(this.state.user), () => { AsyncStorage.getItem("user", (err, result) => { console.log(result); }); }); DENEME

    //AsyncStorage.getItem("user", (err, result) => { console.log(result); }); DENEME

    const winHeight = Dimensions.get("window").height;
    const winWidth = Dimensions.get("window").width;

    console.log("winHeight" + winHeight);
    console.log("winWidth" + winWidth);

    //adjust header height according to different device sizes
    if (winHeight <= 568) {
      //5s height
      this._isMounted && this.setState({ MAX_HEIGHT: winHeight * 0.196 }); //75.5%
    } else if (winHeight > 568 && winHeight < 736) {
      let deviceSpecificMultiplier = Platform.OS === "ios" ? 0.195 : 0.195;
      this._isMounted &&
        this.setState({ MAX_HEIGHT: winHeight * deviceSpecificMultiplier }); //17.5%
    } else if (winHeight >= 736) {
      this._isMounted && this.setState({ MAX_HEIGHT: winHeight * 0.194 }); //18%
    }

    //eski çalışmayan hali
    /**
     * 
     * fetch("https://www.tedu.edu.tr/rss.xml")
      .then(response => response.text())
      .then(responseData => {
        storeData("teduRSS", responseData);
        //console.log(responseData);
      })
      .catch(error => {
        console.log(error);
        this.setState({ networkError: true });
        console.log("net err" + this.state.networkError);
        console.log("alert err" + this.state.showAlert);
        if (this.state.networkError === true && this.state.showAlert === true) {
          Alert.alert(
            "Network Error",
            "Please check network for latest news.",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.navigation.state.params.showAlert = false;
                  console.log(this.props.navigation.state.params.showAlert);
                  console.log(this.state.showAlert);
                }
              }
            ],
            { cancelable: false }
          );
        }
      });
     */

    //console.log(this.props.rss)
    // this.whenLoaded(this.props.rss); // Uncommenting it does not wait fetch, however it causes news to be slow!
    this.whenLoaded();
    fetch("https://www.tedu.edu.tr/rss.xml")
      .then(response => response.text())
      .then(RSS => rssParser.parse(RSS))
      .catch(error => console.log(error))
      .then(result => {
        this._isMounted && this.setState({ loading: false });
        this.props.updateRss(result.items);
      })
      .then(() => {
        this.whenLoaded();
      })
      .catch(error => {
        console.log(error);
        this._isMounted && this.setState({ networkError: true });
        console.log("net err" + this.state.networkError);
        console.log("alert err" + this.state.showAlert);
        this.whenLoaded();
        if (this.state.networkError === true && this.state.showAlert === true) {
          Alert.alert(
            "Network error",
            "Check your network connection.",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.navigation.state.params.showAlert = false;
                  console.log(this.props.navigation.state.params.showAlert);
                  console.log(this.state.showAlert);
                }
              }
            ],
            { cancelable: false }
          );
        }
      })
      .then(() => {
        // this.whenLoaded();
      });
    //AsyncStorage.getItem("teduRSS", (err, result) => rssParser.parse(result))
    //.then(rss => {
    //this.whenLoaded(rss.items);
    //console.log(rss.items.length);
    //});
    /*this.retrieveData("teduRSS").then(result => { 
                                        if (result === undefined) {
                                          console.log("result undefined");
                                        } else { 
                                          console.log("not undefined");
                                        } 
                                        }).catch(error => console.log(error));*/
    //AsyncStorage.removeItem("teduRSS");

    /*retrieveData("teduRSS")
      .then(RSS => rssParser.parse(RSS))
      .catch(error => console.log(error))
      .then(result => {
        // alert(result.items);
        this.whenLoaded(result.items);
        //console.log(result.items);
      })
      .catch(error => console.log(error));*/

    // alert(this.props.rss);
    // retrieveData("isMoodleLoggedIn")
    //   .then(RSS => rssParser.parse(RSS))
    //   .catch(error => console.log(error))
    //   .then(result => {
    //     alert(result.items);
    //     this.whenLoaded(result.items);
    //     console.log(result.items);
    //   })
    //   .catch(error => console.log(error));

    // getDataAll()
    //   .then(RSS => {
    //     rssParser.parse(this.props.rss);
    //   })
    //   .catch(error => console.log(error))
    //   .then(result => {
    //     alert(result.items);
    //     this.whenLoaded(result.items);
    //     console.log(result.items);
    //   })
    //   .catch(error => console.log(error));
  }

  whenLoaded = () => {
    //console.log(response);
    let renderScreen = false;
    //other way of traversing an array
    /*const arrayLength = this.state.data.length;
    for (let i = 0; i < arrayLength; i++) {
        //console.log(this.state.data[i]);
        if (this.state.data[i].link.includes("gundem/duyurular")) {
            //this.setState({ dataDuyurular: this.state.dataDuyurular.concat(item) });
            console.log("1");
        } else if (this.state.data[i].link.includes("gundem/etkinlikler")) {
            //this.setState({ dataEtkinlikler: this.state.dataEtkinlikler.concat(item) });
            console.log("2");
        } else if (this.state.data[i].link.includes("gundem/haberler")) {
            //this.setState({ dataHaberler: this.state.dataHaberler.concat(item) });
            console.log("3");
        }
    }*/

    let duyuru = [],
      haber = [],
      etkinlik = [];

    //one way of traversing an array
    this.props.rss.map(item => {
      if (item["links"][0].url.includes("gundem/duyurular")) {
        duyuru.push(item);
        //this.setState({ dataDuyurular: this.state.dataDuyurular.concat(item) });
      } else if (item["links"][0].url.includes("gundem/etkinlikler")) {
        etkinlik.push(item);
      } else if (item["links"][0].url.includes("gundem/haberler")) {
        haber.push(item);
      }
      //console.log(item.links[0].url);
    });
    this._isMounted &&
      this.setState({
        dataHaberler: haber,
        dataEtkinlikler: etkinlik,
        dataDuyurular: duyuru
      });

    //console.log("duyuru"+this.state.dataDuyurular.length);
    //console.log("etkinlik"+this.state.dataEtkinlikler.length);
    //console.log("haber"+this.state.dataHaberler.length);

    let emptyData = false;
    //required for adjusting body height according to horizontallists. if one array is empty that means one horizontal list is absent
    if (
      this.state.dataDuyurular.length === 0 ||
      this.state.dataHaberler.length === 0 ||
      this.state.dataEtkinlikler.length === 0
    ) {
      emptyData = false;
    }

    //the code below is run within the whenLoaded method rather than the componentWillMount
    //because body height depends on the content rendered within the body
    //which means that body height must be defined after all content data is loading which is here
    const winHeight = Dimensions.get("window").height;

    if (!emptyData) {
      //adjust body height according to different device heights with none of the horizontal list is empty
      if (winHeight <= 568) {
        //5s height
        this._isMounted && this.setState({ scrollHeight: winHeight * 1.15 }); //75.5%
      } else if (winHeight > 568 && winHeight < 736) {
        //console.log("device height less than 736");

        if (winHeight === 692) {
          //samsung s8
          console.log("HERE21");
          this._isMounted && this.setState({ scrollHeight: winHeight * 0.92 });
        } else if (winHeight === 640) {
          //samsung s7
          console.log("HERE22");
          this._isMounted && this.setState({ scrollHeight: winHeight * 0.97 });
        } else if (winHeight === 667) {
          //iPhone 6
          console.log("HERE23");
          this._isMounted && this.setState({ scrollHeight: winHeight * 0.97 });
        }
      } else if (winHeight >= 736 && winHeight < 812) {
        //iPhone plus
        //console.log("device height greater than 736");
        this._isMounted &&
          this.setState({
            scrollHeight: winHeight * 0.94,
            horizontalMarginTop: 30
          }); //76%
      } else if (winHeight >= 812) {
        //iPhone X
        this._isMounted &&
          this.setState({
            scrollHeight: winHeight * 0.85,
            horizontalMarginTop: 30
          }); //76%
      }
    } else if (emptyData) {
      //adjust body height according to different device heights with one of the horizontal list is empty
      if (winHeight <= 568) {
        //5s height
        this._isMounted && this.setState({ scrollHeight: winHeight * 0.9 }); //75.5%
      } else if (winHeight > 568 && winHeight < 736) {
        //not plus phones
        //console.log("device height less than 736");
        if (winHeight === 692) {
          //samsung s8
          console.log("HERE21");
          this._isMounted && this.setState({ scrollHeight: winHeight * 0.97 });
        } else if (winHeight === 640) {
          //samsung s7
          console.log("HERE22");
          this._isMounted && this.setState({ scrollHeight: winHeight * 0.85 });
        } else if (winHeight === 667) {
          //iPhone 6
          console.log("HERE23");
          this._isMounted && this.setState({ scrollHeight: winHeight * 0.85 });
        }
      } else if (winHeight >= 736 && winHeight < 812) {
        //plus phones
        //console.log("device height greater than 736");
        this._isMounted &&
          this.setState({
            scrollHeight: winHeight * 0.74,
            horizontalMarginTop: 30
          }); //76%
      }
      if (winHeight >= 812) {
        //iphone X
        this._isMounted &&
          this.setState({
            scrollHeight: winHeight * 0.7153,
            horizontalMarginTop: 30
          }); //76%
      }
    }
    //console.log("scrollheight" + this.state.scrollHeight)
    //if (renderScreen)
    // this._isMounted && this.setState({ loading: false });

    //console.log(JSON.stringify(response));
    //console.log(this.state.data);
  };

  renderDataDuyurular = () => {
    return this.state.dataDuyurular.map((responseData, Id) => (
      <DetailNews
        navigation={this.props.navigation}
        key={Id}
        data={responseData}
        imgsrc={"sarı"}
      />
    ));
  };
  renderDataEtkinlikler = () => {
    return this.state.dataEtkinlikler.map((responseData, Id) => (
      <DetailNews
        navigation={this.props.navigation}
        key={Id}
        data={responseData}
        imgsrc={"mavi"}
      />
    ));
  };
  renderDataHaberler = () => {
    return this.state.dataHaberler.map((responseData, Id) => (
      <DetailNews
        navigation={this.props.navigation}
        key={Id}
        data={responseData}
        imgsrc={"kırmızı"}
      />
    ));
  };
  render() {
    //console.log("scrollHeigth: " + this.state.scrollHeight);
    let winHeight = Dimensions.get("window").height;
    let headerMarginTop = 0; //header image margin for iphone X
    if (winHeight >= 812) {
      headerMarginTop = 32;
    } else {
      //aditional 9 pixel margintop for header image to make clock visible
      headerMarginTop = Platform.OS === "ios" ? 9 : 0;
    }
    if (this.state.loading && Platform.OS === "ios") {
      return <Spinner size={"large"} />;
    } else {
      //   return <Spinner size={"large"} />;
      // } else {
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
                height: Platform.OS === "ios" ? 50 : 135
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
          showsVerticalScrollIndicator={false}
        >
          <View>
            <ImageBackground
              source={require("../../img/background/BACKGROUND.png")}
              style={styles.mainBackGround}
            >
              <View style={{ marginBottom: deviceWidth / 7.5 }}>
                <HorizontalList
                  Data={this.renderDataDuyurular}
                  title={"Announcements"}
                  style={{ marginTop: this.state.horizontalMarginTop }}
                />
                <HorizontalList
                  Data={this.renderDataEtkinlikler}
                  title={"Events"}
                  style={{ marginTop: this.state.horizontalMarginTop }}
                />
                <HorizontalList
                  Data={this.renderDataHaberler}
                  title={"News"}
                  style={{ marginTop: this.state.horizontalMarginTop }}
                />
              </View>
            </ImageBackground>
          </View>
        </HeaderImageScrollView>
      );
      // }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: "space-between",
    //alignItems: "center",
    //marginTop: 30,
    height: 500
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    width: Dimensions.get("window").width / 2
    //flexDirection: "row",
  },
  mainBackGround: {
    width: "100%",
    flex: 1
  }
});

const mapStateToProps = (state: types.GlobalState) => {
  return {
    rss: state.Rss
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateRss: (rss: string[]) => {
    dispatch(actions.updateRss(rss));
  }
});

export default connect<{}, {}, ReduxProps>(
  mapStateToProps,
  mapDispatchToProps
)(News);

//if you want to scroll only the content not the header, add scrollview that capsulate horizontallists

//height={this.state.scrollHeight} add it to view component for responsivnes

/*
<ImageBackground source={require("./img/background/BACKGROUND.png")} style={styles.mainBackGround}>

            <View style={styles.container}>
                <ScrollView 
                scrollEnabled={false}
                >
                    <HorizontalList Data={this.renderDataDuyurular} title={"Duyurular"} />
                    <HorizontalList Data={this.renderDataEtkinlikler} title={"Etkinlikler"} />
                    <HorizontalList Data={this.renderDataHaberler} title={"Haberler"} />
                </ScrollView>
            </View>
            </ImageBackground>
*/
