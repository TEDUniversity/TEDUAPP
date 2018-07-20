import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import News from "./News";
import Moodle from "./Moodle";
import Menu from "./Menu";
import Council from "./Council";
import Calendar from "./Calendar";
import { createStackNavigator, StackNavigator } from "react-navigation";
import BottomNavigation, {
  FullTab
} from "react-native-material-bottom-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import Image from "react-native-scalable-image";

class Main extends Component {
    /*static navigationOptions = ({ navigation }) => {
        const { state } = navigation;

        if (state.params !== undefined) {
            return { 
                headerTitle: state.params.websiteURL
            };
        }  
    };*/
  static navigationOptions = {
    title: ""
      
  };

  
  state = { activeTab: "NewsRouter" };

  tabs = [
    {
      key: "NewsRouter",
      icon: "dashboard",
      label: "Dashboard",
      barColor: "#388E3C",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "MenuRouter",
      icon: "movie",
      label: "Movies & TV",
      barColor: "#B71C1C",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "CalendarRouter",
      icon: "music-note",
      label: "Music",
      barColor: "#E64A19",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "MoodleRouter",
      icon: "music-note",
      label: "Music",
      barColor: "#A93B13",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "CouncilRouter",
      icon: "music-note",
      label: "Music",
      barColor: "#E46D55",
      pressColor: "rgba(255, 255, 255, 0.16)"
    }
  ];
  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  );
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );
  showTab() {
    switch (this.state.activeTab) {
      case 'NewsRouter':
          return <News navigation={this.props.navigation} />;
          break;
      case 'MenuRouter':
          return <Menu navigation={this.navigationOptions} />;
          break;
      case 'CalendarRouter':
          return <Calendar navigation={this.navigationOptions} />;
          break;
      case 'MoodleRouter':
          return <Moodle navigation={this.navigationOptions} />;
          break;
      case 'CouncilRouter':
          return <Council navigation={this.navigationOptions} />;
          break;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.subContainer}>{this.showTab()}</View>
        </View>
        <Text> {this.state.activeTab}</Text>
        <BottomNavigation
          //activeTab={this.state.activeTab}
          onTabPress={newTab => {
            this.setState({ activeTab: newTab.key });
            //this.props.navigation.navigate(newTab.key);
          }}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Main;

/*
headerTitle: (
      <Image
        resizeMode="contain"
        width={Dimensions.get("window").width}
        style={StyleSheet.absoluteFill}
        style={{ marginTop: 40 }}
        
        source={require("./img/header/anatepe2.png")}
      />
    ),
    title: "Main",
    headerStyle: { backgroundColor: "#fff", height: 80 },
    headerLeft: null,
    gesturesEnabled: false
*/