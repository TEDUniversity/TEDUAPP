/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Image from 'react-native-scalable-image';
import TabNavigator from 'react-native-tab-navigator';
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Header } from 'react-navigation';
import Image from "react-native-scalable-image";

class Council extends Component {
    static navigationOptions = {
        headerTitle: (
            <Image resizeMode="contain" width={Dimensions.get('window').width} style={{ marginTop: 40 }} source={require("./img/header/anatepe2.png")} />
        ),
        title: "Council",
        headerStyle: { marginTop: 0, backgroundColor: "#fff" },
        headerLeft: null,
        gesturesEnabled: false,
      };
  state={ selectedTab: "" }
    render() {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.text}>
                    This is Council.
                </Text>
            </View>
            <TabNavigator tabBarStyle={styles.tabNav} >
  <TabNavigator.Item
    selected={this.state.selectedTab === 'home'}
    title="Home"
    renderIcon={() => <Image source={require("./img/moodle/m3.png")} />}
    renderSelectedIcon={() => <Image source={require("./img/moodle/m3.png")} />}
    badgeText="1"
    onPress={() => this.setState({ selectedTab: 'home' })}>
    <Text> tab1 </Text>
  </TabNavigator.Item>
  <TabNavigator.Item
    selected={this.state.selectedTab === 'profile'}
    title="Profile"
    renderIcon={() => <Image source={require("./img/menu/me3.png")} />}
    renderSelectedIcon={() => <Image source={require("./img/menu/me3.png")} />}
    onPress={() => this.setState({ selectedTab: 'profile' })}>
    <Text> tab2 </Text>
  </TabNavigator.Item>
</TabNavigator>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
    },
    text: {
        fontWeight: "bold"
    },
    subContainer: {
        flex: 1,
        justifyContent: "center" 
    },
    tabNav: {
        alignItems: "stretch",
        //marginLeft: -100,
        width: "100%",
        flex: 1,
        height: 30
    }
  });

  export default Council;
