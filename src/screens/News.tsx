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
  AsyncStorage
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
  rss?: any;
}

class News extends Component<IProp & ReduxProps> {
  static navigationOptions = {
    title: "News",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false,
    header: null
  };

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
    scrollHeight: 0,
    networkError: false,
    showAlert: this.props.showAlert,
    horizontalMarginTop: 20
  };

  //not used. for editind navigation parameters.
  setNavParams = props => {
    props.navigation.setParams({
      showAlert: false
    });
  };

  componentWillMount() {
    //AsyncStorage.setItem("user", JSON.stringify(this.state.user), () => { AsyncStorage.getItem("user", (err, result) => { console.log(result); }); }); DENEME

    //AsyncStorage.getItem("user", (err, result) => { console.log(result); }); DENEME

    const winHeight = Dimensions.get("window").height;
    console.log("winHeight" + winHeight);
    
    //adjust header height according to different device sizes
    if (winHeight < 736) {
      //console.log("device height less than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.183 }); //17.5%
    } else if (winHeight >= 736) {
      //console.log("device height greater than 736");
      this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //18%
    }

    fetch("https://www.tedu.edu.tr/rss.xml")
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

    retrieveData("teduRSS")
      .then(RSS => rssParser.parse(RSS))
      .catch(error => console.log(error))
      .then(result => {
        // alert(result.items);
        this.whenLoaded(result.items);
        //console.log(result.items);
      })
      .catch(error => console.log(error));

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

  whenLoaded = response => {
    this.setState({ data: response });
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
    //one way of traversing an array
    this.state.data.map(item => {
      if (item["links"][0].url.includes("gundem/duyurular")) {
        this.setState({ dataDuyurular: this.state.dataDuyurular.concat(item) });
      } else if (item["links"][0].url.includes("gundem/etkinlikler")) {
        this.setState({
          dataEtkinlikler: this.state.dataEtkinlikler.concat(item)
        });
      } else if (item["links"][0].url.includes("gundem/haberler")) {
        this.setState({ dataHaberler: this.state.dataHaberler.concat(item) });
      }
      //console.log(item.links[0].url);
    });
    //console.log("duyuru"+this.state.dataDuyurular.length);
    //console.log("etkinlik"+this.state.dataEtkinlikler.length);
    //console.log("haber"+this.state.dataHaberler.length);
    let emptyData = false;
    //required for adjusting body height according to horizontallists. if one array is empty that means one horizontal list is absent
    if (this.state.dataDuyurular.length === 0 || this.state.dataHaberler.length === 0 || this.state.dataEtkinlikler.length === 0) {
      emptyData = true;
    }

    //the code below is run within the whenLoaded method rather than the componentWillMount
    //because body height depends on the content rendered within the body
    //which means that body height must be defined after all content data is loading which is here
    const winHeight = Dimensions.get("window").height;
    if (!emptyData) {
      //adjust body height according to different device heights with none of the horizontal list is empty
      if (winHeight < 736) {
        //console.log("device height less than 736");
        this.setState({ scrollHeight: winHeight * 0.97 }); //75.5%
      } else if (winHeight >= 736) {
        //console.log("device height greater than 736");
        this.setState({ scrollHeight: winHeight * 0.94, horizontalMarginTop: 30 }); //76%
      }
    } else if (emptyData) {
      //adjust body height according to different device heights with one of the horizontal list is empty
      if (winHeight < 736) {
        //console.log("device height less than 736");
        this.setState({ scrollHeight: winHeight * 0.7435 }); //75.5%
      } else if (winHeight >= 736) {
        //console.log("device height greater than 736");
        this.setState({ scrollHeight: winHeight * 0.7533, horizontalMarginTop: 30 }); //76%
      }
    }
    //console.log("scrollheight" + this.state.scrollHeight)
    this.setState({ loading: false });
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
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
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
          overlayColor="#006AB3"
          maxOverlayOpacity={1}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View height={this.state.scrollHeight}>
            <ImageBackground
              source={require("../../img/background/BACKGROUND.png")}
              style={styles.mainBackGround}
            >
              <View style={{ marginBottom: 50 }}>
                <HorizontalList
                  Data={this.renderDataDuyurular}
                  title={"Duyurular"}
                  style={{ marginTop: this.state.horizontalMarginTop }}
                />
                <HorizontalList
                  Data={this.renderDataEtkinlikler}
                  title={"Etkinlikler"}
                  style={{ marginTop: this.state.horizontalMarginTop }}
                />
                <HorizontalList
                  Data={this.renderDataHaberler}
                  title={"Haberler"}
                  style={{ marginTop: this.state.horizontalMarginTop }}
                />
              </View>
            </ImageBackground>
          </View>
        </HeaderImageScrollView>
      );
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

const mapDispatchToProps = (dispatch: Dispatch) => ({});

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
