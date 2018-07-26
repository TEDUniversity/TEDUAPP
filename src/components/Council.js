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

const MIN_HEIGHT = Header.height ;

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
  state={ selectedTab: "", MAX_HEIGHT: 0, scrollHeight: 500 }


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
        this.setState({ MAX_HEIGHT: winHeight * 0.175 }); //17.5%
    } else if (winHeight >= 736) {
        console.log("device height greater than 736");
        this.setState({ MAX_HEIGHT: winHeight * 0.18 }); //18%
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
            scrollEnabled={false}
            
        >
        <View height={this.state.scrollHeight}>
        <ImageBackground source={require("../../img/background/BACKGROUND.png")} style={styles.mainBackGround}>
        
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <View style={styles.question}>
                    <Text style={styles.text}>
                        Where do you want to go for the party?
                    </Text>
                    </View>
                    <View style={styles.answers} >
                    <TouchableOpacity style={[styles.answerButton, { backgroundColor: this.state.buttonBackgroundColor1 }]} onPress={() => { this.setState({ buttonBackgroundColor1: "rgb(22,103,163)", clicked1: true }); if (this.state.clicked1) { this.setState({ buttonBackgroundColor1: "transparent", clicked1: false }); console.log(this.state.buttonBackgroundColor1); } }}>
                        <Text> 6:45</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.answerButton, { backgroundColor: this.state.buttonBackgroundColor2 }]} onPress={() => { this.setState({ buttonBackgroundColor2: "rgb(22,103,163)", clicked2: true }); if (this.state.clicked2) { this.setState({ buttonBackgroundColor2: "transparent", clicked2: false }); console.log(this.state.buttonBackgroundColor2); } }}>
                        <Text> Bomonti</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.answerButton, { backgroundColor: this.state.buttonBackgroundColor3 }]} onPress={() => { this.setState({ buttonBackgroundColor3: "rgb(22,103,163)", clicked3: true }); if (this.state.clicked3) { this.setState({ buttonBackgroundColor3: "transparent", clicked3: false }); console.log(this.state.buttonBackgroundColor3); } }}>
                        <Text> Lux the mix</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
        </View>
        <TabNavigator tabBarStyle={styles.tabNav} >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'News'}
                    title="News"
                    //renderIcon={() => <Image source={require("./img/moodle/m3.png")} />}
                    //badgeText="+1"
                    onPress={() => this.setState({ selectedTab: 'News' })}
                    titleStyle={styles.tabNavTitle}
                >
                    <Text> tab1 </Text>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Votings'}
                    title="Votings"
                    //renderIcon={() => <Image source={require("./img/menu/me3.png")} />}
                    onPress={() => this.setState({ selectedTab: 'Votings' })}
                    titleStyle={styles.tabNavTitle}
                >
                    <Text> tab2 </Text>
                </TabNavigator.Item>
        </TabNavigator>
        </HeaderImageScrollView>
        
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
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
        width: "100%",
        flex: 1,
        height: 25,
        backgroundColor: "#373738",
        alignItems: "center",
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
