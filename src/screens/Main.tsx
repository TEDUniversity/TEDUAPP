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
import TabNavigator from "react-native-tab-navigator";

interface IProp {
  navigation: any;
}
class Main extends Component<IProp> {
  static navigationOptions = {
    headerTitle: (
      <Image
        resizeMode="contain"
        width={Dimensions.get("window").width}
        style={StyleSheet.absoluteFill}
        // style={{ marginTop: 40 }}
        source={require("../../img/header/anatepe2.png")}
      />
    ),
    title: "Main",
    headerStyle: { marginTop: 0, backgroundColor: "#fff", height: 80 },
    headerLeft: null,
    gesturesEnabled: false,
    header: null
  };

  state = { activeTab: "NewsRouter", menuWidth: 0 };

  componentWillMount() {
    //const parseString = require("xml2js").parseString;

    const winWidth = Dimensions.get("window").width;
    //console.log("winWidth" + winWidth);
    //navigation toolbar içindeki elemanların yeri için etkisiz bir işlem
    //sadece tüm toolbarın genişliğini etkiliyor
    if (winWidth < 414) {
      //console.log("device width less than 414");
      this.setState({ menuWidth: winWidth * 1 }); //75.5%
    } else if (winWidth >= 414) {
      //console.log("device width greater than 414");
      this.setState({ menuWidth: winWidth * 1 }); //76%
    }
  }
  // iphone7 width = 375, iphone7 plus width = 414
  tabs = [
    {
      key: "NewsRouter",
      icon: "dashboard",
      label: "Haberler",
      barColor: "#006AB3",
      pressColor: "rgba(232, 36, 55, 0.16)"
    },
    {
      key: "MenuRouter",
      icon: "menu",
      label: "Menü",
      barColor: "#006AB3",
      pressColor: "rgba(232, 36, 55, 0.16)"
    },

    {
      key: "MoodleRouter",
      icon: "school",
      label: "Moodle",
      barColor: "#006AB3",
      pressColor: "rgba(232, 36, 55, 0.16)"
    },
    {
      key: "CouncilRouter",
      icon: "people",
      label: "Öğrenci Konseyi",
      barColor: "#006AB3",
      pressColor: "rgba(232, 36, 55, 0.16)"
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
      case "NewsRouter":
        return (
          <News
            showAlert={this.props.navigation.state.params.showAlert}
            navigation={this.props.navigation}
          />
        );
        break;
      case "MenuRouter":
        return <Menu navigation={this.props.navigation} />;
        break;
      case "CalendarRouter":
        return <Calendar navigation={this.props.navigation} />;
        break;
      case "MoodleRouter":
        return <Moodle navigation={this.props.navigation} />;
        break;
      case "CouncilRouter":
        return <Council navigation={this.props.navigation} />;
        break;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.subContainer}>{this.showTab()}</View>
        </View>
        <BottomNavigation
          //activeTab={this.state.activeTab}
          onTabPress={newTab => {
            this.setState({ activeTab: newTab.key });
            //this.props.navigation.navigate(newTab.key); usage of react native navigation
          }}
          renderTab={this.renderTab as any}
          tabs={this.tabs}
          style={{
            width: this.state.menuWidth,
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //justifyContent: "space-between"
    //alignItems: "center"
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    flex: 1,
    justifyContent: "center"
  },
  tabNav: {
    //marginLeft: -100,
    //flex: 1,
    //justifyContent: "flex-start",
    width: "100%",
    height: 25,
    backgroundColor: "#373738",
    alignItems: "center"
  }
});

export default Main;
