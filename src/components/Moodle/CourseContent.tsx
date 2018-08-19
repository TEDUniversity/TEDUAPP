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
import { strip } from "../../util/helpers";

interface IProp {
  navigation: any;
}
interface ReduxProps {
  user: types.User;
}

class Detay extends Component<IProp & ReduxProps> {
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
          jsonToBeParsed: JSON.parse(http.response),
          isLoading: false
        });
      }
    };
    http.send();
  };

  renderElement = (elements: any) => {
    return elements.map((data, Id) => {
      let description = "";
      if (data["description"]) {
        description = strip(data["description"]);
      }
      if (data["visible"] === 1) {
        return (
          <View key={Id} style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={{ width: 20, height: 20, margin: 5 }}
              source={{ uri: data["modicon"] }}
            />
            <View style={{ flex: 1, flexDirection: "column" }}>
              <TouchableOpacity
                onPress={() => {
                  if (data["url"]) {
                    this.props.navigation.navigate("WebviewRouter", {
                      url: data["url"],
                      title: data["name"]
                    });
                  }
                }}
              >
                <Text
                  style={{
                    margin: 5,
                    marginBottom: 0,
                    fontSize: 13,
                    color: "black"
                  }}
                >
                  {data["name"]}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 10,
                  color: "black"
                }}
              >
                {description}
              </Text>
            </View>
            {/* <Text style={{ fontSize: 15, margin: 5 }}>{data["summary"]}</Text> */}
          </View>
        );
      } else {
        return <View key={Id} />;
      }
    });
  };

  renderSection = (toBeMapped: any) => {
    return toBeMapped.map(
      (data, Id) =>
        data["visible"] === 1 ? (
          <View key={Id} style={styles.subContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Text>{data["name"]}</Text>
              {this.renderElement(data["modules"])}
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
            {this.renderSection(this.state.jsonToBeParsed)}
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
)(Detay);
