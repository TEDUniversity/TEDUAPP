/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { YellowBox } from "react-native";
import { createStackNavigator } from "react-navigation";
import News from "./src/components/News";
import Moodle from "./src/components/Moodle";
import Menu from "./src/components/Menu";
import Council from "./src/components/Council";
import Calendar from "./src/components/Calendar";
import BottomNavigation, {
  FullTab
} from "react-native-material-bottom-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

export default class App extends Component {
  tabs = [
    {
      key: "games",
      icon: "gamepad-variant",
      label: "Games",
      barColor: "#388E3C",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "movies-tv",
      icon: "movie",
      label: "Movies & TV",
      barColor: "#B71C1C",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "music",
      icon: "music-note",
      label: "Music",
      barColor: "#E64A19",
      pressColor: "rgba(255, 255, 255, 0.16)"
    }
  ];

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name="code" />
  );

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  pageChange = () => {
    return <Menu />;
  };
  // Components
  renderFooterView() {
    return (
      <BottomNavigation
        activeTab={this.state.activeTab}
        rippleColor="white"
        activeLabelColor="white"
        shifting={false}
        style={{
          height: 56,
          elevation: 8,
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0
        }}
        onTabChange={this.handleTabChange}
      >
        <Tab
          barBackgroundColor="white"
          icon={
            <Image
              source={assets.Setting.home}
              color="white"
              name="Home"
              style={{ width: 20, height: 20 }}
            />
          }
        />
        <Tab
          barBackgroundColor="white"
          icon={
            <Image
              source={assets.Setting.groupFilled}
              color="white"
              name="Group"
              style={{ width: 20, height: 20 }}
            />
          }
        />
        <Tab
          barBackgroundColor="white"
          icon={
            <Image
              source={assets.Setting.requestLook}
              color="white"
              name="Group"
              style={{ width: 20, height: 20 }}
            />
          }
        />
        <Tab
          barBackgroundColor="white"
          icon={
            <Image
              source={assets.Setting.profile}
              color="white"
              name="Group"
              style={{ width: 20, height: 20 }}
            />
          }
        />
        <Tab
          barBackgroundColor="white"
          icon={
            <Image
              source={assets.Setting.setting}
              color="white"
              name="Group"
              style={{ width: 20, height: 20 }}
            />
          }
        />
      </BottomNavigation>
    );
  }
  renderTabs() {
    switch (this.state.activeTab) {
      case 0:
        return <Menu />;
        break;
      case 1:
        return <Moodle />;
        break;
      case 2:
        return <Calendar />;
        break;
      case 3:
        return <News />;
        break;
      case 4:
        return <Council />;
        break;
    }
  }
  // Handlers
  handleTabChange(newTabIndex, oldTabIndex) {
    this.setState({ activeTab: newTabIndex });
    if (newTabIndex === oldTabIndex) {
      null;
    }
    if (this.state.activeTab === 0) {
      this.setState({ selectedTab: "tab1" });
    } else if (this.state.activeTab === 1) {
      this.setState({ selectedTab: "tab2" });
    } else if (this.state.activeTab === 2) {
      this.setState({ selectedTab: "tab3" });
    } else if (this.state.activeTab == 3) {
      this.setState({ selectedTab: "tab4" });
    } else {
      this.setState({ selectedTab: "tab5" });
    }
  }

  render() {
    const { state, navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.renderTabs()}
        {this.renderFooterView()}
      </View>
    );
  }
}
