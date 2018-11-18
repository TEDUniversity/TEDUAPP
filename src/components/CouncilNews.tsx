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
  ActivityIndicator,
  NetInfo
} from "react-native";
import firebase from "firebase";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { storeData, retrieveData } from "../util/helpers";
import HorizontalList from "../components/HorizontalList";
import DetailCouncilNews from "../components/DetailCouncilNews";
import * as types from "../store/types";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

export const Spinner = ({ size }) => (
  <View>
    <ActivityIndicator size={size || "large"} />
  </View>
);
interface ReduxProps {
  councilNews: any[];
  updateCouncilNews: (news: any[]) => any;
}
interface IProps {
  navigation: any;
}

let deviceWidth = Dimensions.get("screen").width

class CouncilNews extends Component<IProps & ReduxProps> {
  state = {
    dataEtkinlikler: [],
    dataHaberler: [],
    dataDuyurular: [],
    loading: true,
    horizontalMarginTop: 20,
    scrollHeight: Dimensions.get("window").height
  };

  componentWillMount() {
    //this.whenLoaded(this.props.councilNews);

    this.readCouncilNewsData();
  }

  readCouncilNewsData = () => {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      console.log(
        "Initial, type: " +
          connectionInfo.type +
          ", effectiveType: " +
          connectionInfo.effectiveType
      );
    });

    let news = [];
    firebase
      .database()
      .ref("/councilNews")
      .on("value", response => {
        response.forEach(child => {
          news.push(child.val());
          this.props.updateCouncilNews(news);
          this.whenLoaded();

          //console.log(news)
        });
        news = [];
        //this.setState({ data: news }, () => {
        //this.whenLoaded();
        //console.log(this.state.data);
        //});
      });
    this.whenLoaded();
    news = [];

    /* firebase
     .database()
     .ref("/councilNews")
     .on("value", response => {
       //console.log("response "+JSON.stringify(response.val()));
       response.forEach(child => {
         news.push(child.val());
       })

       storeData("CouncilNews", JSON.stringify(news)).then(() => {
         //it is casted to string because it is stored as string in local storage. After getting is parse it as json.
         
       });


     });
     retrieveData("CouncilNews").then((response) => {
       this.setState({ data: response }, () => {
         this.whenLoaded();
         //console.log(this.state.data);
       });
     })*/
  };

  whenLoaded = () => {
    let duyuru = [],
      haber = [],
      etkinlik = [];
    this.props.councilNews.map(item => {
      if (item.valid) {
        if (item.type.includes("duyuru")) {
          duyuru.push(item);
        } else if (item.type.includes("etkinlik")) {
          etkinlik.push(item);
        } else if (item.type.includes("haber")) {
          haber.push(item);
        }
      }
    });

    let emptyData = false;
    //required for adjusting body height according to horizontallists. if one array is empty that means one horizontal list is absent
    if (duyuru.length === 0 || haber.length === 0 || etkinlik.length === 0) {
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
        this.setState({ scrollHeight: winHeight * 1.15 }); //75.5%
      } else if (winHeight > 568 && winHeight < 736) {
        if (winHeight === 692) {
          //samsung s8
          //console.log("HERE21")
          this.setState({ scrollHeight: winHeight * 0.95 });
        } else if (winHeight === 640) {
          //samsung s7 && samsung s6
          //console.log("HERE22")
          this.setState({ scrollHeight: winHeight * 0.99 });
        } else if (winHeight === 667) {
          //iPhone 6
          //console.log("HERE23")
          this.setState({ scrollHeight: winHeight * 0.97 });
        }
      } else if (winHeight >= 736 && winHeight < 812) {
        //console.log("device height greater than 736");
        this.setState({
          scrollHeight: winHeight * 0.94,
          horizontalMarginTop: 30
        }); //76%
      }
      if (winHeight >= 812) {
        this.setState({
          scrollHeight: winHeight * 0.85,
          horizontalMarginTop: 30
        }); //76%
      }
    } else if (emptyData) {
      //adjust body height according to different device heights with one of the horizontal list is empty
      if (winHeight <= 568) {
        //5s height
        this.setState({ scrollHeight: winHeight * 0.9 }); //75.5%
      } else if (winHeight > 568 && winHeight < 736) {
        //console.log("device height less than 736");
        this.setState({ scrollHeight: winHeight * 0.7435 }); //75.5%
      } else if (winHeight >= 736 && winHeight < 812) {
        //console.log("device height greater than 736");
        this.setState({
          scrollHeight: winHeight * 0.7533,
          horizontalMarginTop: 30
        }); //76%
      }
      if (winHeight >= 812) {
        this.setState({
          scrollHeight: winHeight * 0.68,
          horizontalMarginTop: 30
        }); //76%
      }
    }

    this.setState({
      dataDuyurular: duyuru,
      dataHaberler: haber,
      dataEtkinlikler: etkinlik,
      loading: false
    });
  };

  renderDataDuyurular = () => {
    return this.state.dataDuyurular.map((item, Id) => (
      <DetailCouncilNews
        navigation={this.props.navigation}
        key={Id}
        data={item}
        imgsrc={"sarı"}
      />
    ));
  };
  renderDataEtkinlikler = () => {
    return this.state.dataEtkinlikler.map((item, Id) => (
      <DetailCouncilNews
        navigation={this.props.navigation}
        key={Id}
        data={item}
        imgsrc={"mavi"}
      />
    ));
  };
  renderDataHaberler = () => {
    return this.state.dataHaberler.map((item, Id) => (
      <DetailCouncilNews
        navigation={this.props.navigation}
        key={Id}
        data={item}
        imgsrc={"kırmızı"}
      />
    ));
  };

  renderLists = () => {
    
  }
  render() {
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (
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
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "1%"
  },
  mainBackGround: {
    width: "100%",
    flex: 1
  }
});

const mapStateToProps = (state: types.GlobalState) => {
  return {
    councilNews: state.CouncilNews
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateCouncilNews: (news: any[]) => {
    dispatch(actions.updateCouncilNews(news));
  }
});

export default connect<{}, {}, ReduxProps>(
  mapStateToProps,
  mapDispatchToProps
)(CouncilNews);
