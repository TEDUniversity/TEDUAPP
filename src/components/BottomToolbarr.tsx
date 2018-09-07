/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomToolbar from "react-native-bottom-toolbar"; //=???????
import { Image } from "react-native";
import BottomNavigation, {
  FullTab
} from "react-native-material-bottom-navigation";

const moodleIcon = <Image source={require("./img/moodle/m3.png")} />;

const menuIcon = <Image source={require("./img/menu/me3.png")} />;
const calendarIcon = <Image source={require("./img/calendar/t3.png")} />;
const newsIcon = <Image source={require("./img/news/n3.png")} />;
//const councilIcon = <Image source={require("./img/calendar/t1.png")} />;

const councilIcon = <Icon name="user-friend" color="red" size={30} />;

interface Prop {
  navigation: any;
}
class bottomToolbar extends Component<Prop> {
  render() {
    return (
      <BottomToolbar
        style={styles.bottom}
        BottomToolbarProps={{ color: "#000000" }}
      >
        <BottomToolbar.Action
          title="News"
          IconElement={newsIcon}
          onPress={() => this.props.navigation.navigate("NewsRoute")}
        />
        <BottomToolbar.Action
          title="Moodle"
          IconElement={moodleIcon}
          onPress={() => this.props.navigation.navigate("MoodleRoute")}
        />
        <BottomToolbar.Action
          title="Calendar"
          IconElement={calendarIcon}
          onPress={() => this.props.navigation.navigate("CalendarRoute")}
        />
        <BottomToolbar.Action
          title="Menu"
          IconElement={menuIcon}
          onPress={() => this.props.navigation.navigate("MenuRoute")}
        />
        <BottomToolbar.Action
          title="Council"
          IconElement={councilIcon}
          onPress={() => this.props.navigation.navigate("CouncilRoute")}
        />
      </BottomToolbar>
    );
  }
}

const styles = {
  bottom: {
    bottom: 0
  }
};

export default bottomToolbar;
