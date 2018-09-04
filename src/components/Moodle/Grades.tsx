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
var DomParser = require("react-native-html-parser").DOMParser;

class Grades extends Component<IProp & ReduxProps> {
  state = {
    isLoading: true,
    jsonToBeParsed: ""
  };

  componentDidMount() {
    this.getCourseGrades();
  }

  getCourseGrades = () => {
    var http = new XMLHttpRequest();
    var url =
      "https://moodle.tedu.edu.tr/webservice/rest/server.php?" +
      "wstoken=" +
      this.props.user.token +
      "&moodlewsrestformat=json&wsfunction=gradereport_user_get_grades_table" +
      "&courseid=" +
      this.props.navigation.state.params.courseId +
      "&userid=" +
      this.props.user.userid;
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

  renderSection = () => {
    return this.state.jsonToBeParsed["tables"][0]["tabledata"].map(
      (data, Id) => {
        let str;
        if (data["itemname"]) {
          str = data["itemname"]["content"];
        } else {
          return;
        }
        str = strip(str);

        let percentage = "",
          grade = "";
        if (data["percentage"] !== undefined && data["grade"] !== undefined) {
          str = "\t\t" + str + ":";
          percentage = data["percentage"]["content"] + "";
          grade = data["grade"]["content"];
        }

        return (
          <View>
            <View key={Id} style={styles.subContainer}>
              <View style={styles.textContainer} >
                <Text style={styles.txt}>
                  {str}
                </Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.txt} > {percentage} </Text>
              </View>


              <View style={styles.textContainer}>
                <Text style={styles.txt}>{grade}</Text>
              </View>

            </View>
            <View
              style={{
                backgroundColor: "black",
                height: 1,
                width: Dimensions.get("window").width 
              }}
            />
          </View>
        );
      }
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
  textContainer: {
    //flex:1,
    //textAlign: 'center',
    //flexWrap: 'wrap'

  },
  subContainer: {
    flex: 1,
    width: Dimensions.get("window").width - 10,
    // height: Dimensions.get("window").height / 6,
    margin: 5,
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
    textAlign: "right",
    alignSelf: "stretch"
  },
  txt: {
    color: "black",
    textAlign: "justify",

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
