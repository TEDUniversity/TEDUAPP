import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import {
  StackNavigator,
  createMaterialTopTabNavigator,
  HeaderBackButton
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Moodle from "../../screens/Moodle";
import * as types from "../../store/types";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Spinner } from "../../screens/News";

interface IProp {
  navigation: any;
}
interface ReduxProps {
  user: types.User;
}

class Grades extends Component<IProp & ReduxProps> {
  state = {
    isLoading: true,
    jsonToBeParsed: {}
  };

  componentDidMount() {
    this.getCourseContent();
  }

  getCourseContent = () => {
    var http = new XMLHttpRequest();
    var url =
      "https://moodle.tedu.edu.tr/webservice/rest/server.php?" +
      "wstoken=" +
      this.props.user.token +
      "&moodlewsrestformat=json&wsfunction=core_course_get_contents" +
      "&courseid=" +
      this.props.navigation.state.params.courseId;
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = () => {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        this.setState({
          jsonToBeParsed: JSON.parse(http.response)[0],
          isLoading: false
        });
      }
    };
    http.send();
  };

  renderElement = (elements: any) => {
    return elements.map(
      (data, Id) =>
        data["visible"] === 1 ? (
          <View>
            <Image
              style={{ alignSelf: "center", width: 20, height: 20 }}
              source={{ uri: data["modicon"] }}
            />
            <Text
              style={{
                margin: 5,
                marginBottom: 0,
                fontSize: 10,
                color: "black"
              }}
            >
              {data["name"]}
            </Text>
            <Text style={{ fontSize: 15, margin: 5 }}>{data["summary"]}</Text>
          </View>
        ) : (
          <View key={Id} />
        )
    );
  };

  renderSection = () => {
    return this.state.jsonToBeParsed["modules"].map(
      (data, Id) =>
        data["visible"] === 1 ? (
          <View key={Id} style={styles.subContainer}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text>{data["name"]}</Text>
              {/* {this.renderElement(data["modules"])} */}
            </View>
          </View>
        ) : (
          <View key={Id} />
        )
    );
  };
  render() {
    if (this.state.isLoading) {
      return <Spinner size={"large"} />;
    } else {
      return (
        <ImageBackground
          source={require("../../../img/background/BACKGROUND.png")}
          style={styles.mainBackGround}
        >
          <ScrollView style={styles.container}>
            {this.renderSection()}
          </ScrollView>
        </ImageBackground>
      );
    }
  }

  static navigationOptions = {
    title: "Detay",
    headerStyle: { marginTop: 0, backgroundColor: "#fff" },
    headerLeft: null,
    gesturesEnabled: false
  };
}

const styles = StyleSheet.create({
  mainBackGround: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
  },
  container: {
    flex: 1
  },
  text: {
    fontWeight: "bold"
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width - 10,
    // height: Dimensions.get("window").height / 6,
    margin: 5
  }
});

const mapStateToProps = (state: types.GlobalState) => {
  return {
    user: state.User
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect<{}, {}, ReduxProps>(
  mapStateToProps,
  mapDispatchToProps
)(Grades);
