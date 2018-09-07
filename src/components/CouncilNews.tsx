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
  ActivityIndicator
} from "react-native";
import firebase from "firebase";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { storeData, retrieveData } from "../util/helpers";
import HorizontalList from "../components/HorizontalList";
import DetailCouncilNews from "../components/DetailCouncilNews";


export const Spinner = ({ size }) => (
  <View>
    <ActivityIndicator size={size || "large"} />
  </View>
);

interface IProps {
  navigation: any;
}
class CouncilNews extends Component<IProps> {

  state = {
    data: [],
    dataEtkinlikler: [],
    dataHaberler: [],
    dataDuyurular: [],
    loading: true,
  }

  componentWillMount() {
    this.readCouncilNewsData();
  }

  
  readCouncilNewsData = () => {
    let news = [];
    firebase
      .database()
      .ref("/councilNews")
      .on("value", response => {
        //console.log("response "+JSON.stringify(response.val()));
        response.forEach(child => {
          news.push(child.val());
        })

        this.setState({ data: news }, () => {
          this.whenLoaded();
          //console.log(this.state.data);
        });
      });



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




  }

  whenLoaded = () => {
    let duyuru = [], haber = [], etkinlik = [];
    this.state.data.map(item => {
      if (item.type.includes("duyuru")) {
        duyuru.push(item);
      } else if (item.type.includes("etkinlik")) {
        etkinlik.push(item)
      } else if (item.type.includes("haber")) {
        haber.push(item)
      }
      this.setState({
        dataDuyurular: duyuru,
        dataHaberler: haber,
        dataEtkinlikler: etkinlik,
        loading: false
      }, () => {

      });
    });
  }


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
    return this.state.dataHaberler.map((item, Id) => (
      <DetailCouncilNews
        navigation={this.props.navigation}
        key={Id}
        data={item}
        imgsrc={"kırmızı"}
      />
    ));
  };
  renderDataHaberler = () => {
    return this.state.dataEtkinlikler.map((item, Id) => (
      <DetailCouncilNews
        navigation={this.props.navigation}
        key={Id}
        data={item}
        imgsrc={"mavi"}
      />
    ));
  };
  render() {

    //console.log("scrollHeigth: " + this.state.scrollHeight);
    if (this.state.loading) {
      return <Spinner size={"large"} />;
    } else {
      return (

        <View style={{ marginBottom: 50 }}  >
          <HorizontalList
            Data={this.renderDataDuyurular}
            title={"Duyurular"}
          />
          <HorizontalList
            Data={this.renderDataEtkinlikler}
            title={"Etkinlikler"}
          />
          <HorizontalList
            Data={this.renderDataHaberler}
            title={"Haberler"}
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

export default CouncilNews;
