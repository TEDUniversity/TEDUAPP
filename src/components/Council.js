/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import Image from 'react-native-scalable-image';
import TabNavigator from 'react-native-tab-navigator';
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Header } from 'react-navigation';
import DetailNews from "./DetailNews";
import CouncilNews from "./CouncilNews";
import CouncilVotings from "./CouncilVotings";

const MIN_HEIGHT = Header.height;

class Council extends Component {
    static navigationOptions = {
        headerTitle: (
            <Image resizeMode="contain" width={Dimensions.get('window').width} style={{ marginTop: 40 }} source={require("../../img/header/anatepe2.png")} />
        ),
        title: "Council",
        headerStyle: { marginTop: 0, backgroundColor: "#fff" },
        headerLeft: null,
        gesturesEnabled: false,
      };
  state={ selectedTab: "News", MAX_HEIGHT: 0, scrollHeight: 500 }


  renderDataDuyurular = () => {
    return this.state.dataDuyurular.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} imgsrc={"sarı"} />
    ));
  }
  renderDataEtkinlikler = () => {   
    return this.state.dataHaberler.map((responseData, Id) => (
      <DetailNews key={Id} data={responseData} imgsrc={"kırmızı"} />
    ));
  }
  renderDataHaberler = () => {
    return this.state.dataEtkinlikler.map((responseData, Id) => (
        <DetailNews key={Id} data={responseData} imgsrc={"mavi"} />
    ));
  }

  componentWillMount() {
    //const parseString = require("xml2js").parseString;

    const winHeight = Dimensions.get('window').height;
    console.log("winHeight" + winHeight);

    if (winHeight < 736) {
        console.log("device height less than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.215 }); //17.5%
    } else if (winHeight >= 736) {
        console.log("device height greater than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //18%
    }
  }


  renderBody = () => {
      if (this.state.selectedTab === "News") {
        return <CouncilNews />;
      } else if (this.state.selectedTab === "Votings") {
        return <CouncilVotings />;
      }
  }

    render() {
    return (
        
        <HeaderImageScrollView
        maxHeight={this.state.MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => <Image
            resizeMode="stretch"
            width={Dimensions.get("window").width}
            style={StyleSheet.absoluteFill}
            style={{ }}
            source={require("../../img/header/anatepe2.png")}
                               />}
            overlayColor="#144d8c"
            maxOverlayOpacity={1}
            bounces={false}
            scrollViewBackgroundColor="rgb(53,53,55)"
            fadeOutForeground={true}
            renderForeground={() => { return ( 

            <TabNavigator tabBarStyle={styles.tabNav} sceneStyle={{ height: 0 }} tabBarShadowStyle={{ backgroundColor: "transparent" }} >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'News'}
                    title="News"
                    //renderIcon={() => <Image source={require("./img/moodle/m3.png")} />}
                    //badgeText="+1"
                    onPress={() => {this.setState({ selectedTab: 'News' }); console.log(this.state.selectedTab); }}
                    titleStyle={styles.tabNavTitle}
                >
                    <Text> tab1 </Text>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Votings'}
                    title="Votings"
                    //renderIcon={() => <Image source={require("./img/menu/me3.png")} />}
                    onPress={() => { this.setState({ selectedTab: 'Votings' }); console.log(this.state.selectedTab); }}
                    titleStyle={styles.tabNavTitle}
                >
                <Text> tab2 </Text>
                </TabNavigator.Item>
            </TabNavigator>

            ); }}
            
        >
        <View height={700}>
        <ImageBackground source={require("../../img/background/BACKGROUND.png")} style={styles.mainBackGround}>
        <View style={styles.container}>
                {this.renderBody()}
        </View>
        </ImageBackground>
        </View>
        
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
        padding: 3,

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
        height: 25,
        backgroundColor: "rgb(53,53,55)",
        alignItems: "center",
        //#373738
    },
    tabNavTitle: {
        
    },
    mainBackGround: {
        flex: 1, 
        alignSelf: 'stretch', 
        resizeMode: 'cover', 
        width: null, 
        height: null 
      }
  });

  export default Council;
