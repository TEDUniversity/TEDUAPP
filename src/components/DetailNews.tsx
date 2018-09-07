import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from "react-native";

interface IProps {
  imgsrc: string;
  navigation?: any;
  data: any;
}

let deviceWidth = Dimensions.get('window').width;

class DetailNews extends Component<IProps> {
  //   alert(JSON.stringify(props.data));

  renderBody = () => {
    const { containerStyle, subContainerStyle, text, BackGround } = styles;
    if (this.props.imgsrc === "sarı") {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("WebviewRouter", {
              url: this.props.data.links[0].url,
              title: "News",
              backButton: "Home"
            });
            console.log(this.props.data.link);
          }}
        >
          <ImageBackground
            source={require("../../img/newsBox/sarı.png")}
            style={BackGround}
          >
            <View style={subContainerStyle}>
              <Text style={text}> {this.props.data.title} </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    } else if (this.props.imgsrc === "mavi") {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("WebviewRouter", {
              url: this.props.data.links[0].url,
              title: "News",
              backButton: "Home"
            });
            console.log(this.props.data.link);
          }}
        >
          <ImageBackground
            source={require("../../img/newsBox/mavi.png")}
            style={BackGround}
          >
            <View style={subContainerStyle}>
              <Text style={text}> {this.props.data.title} </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    } else if (this.props.imgsrc === "kırmızı") {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("WebviewRouter", {
              url: this.props.data.links[0].url,
              title: "News",
              backButton: "Home"
            });
            console.log(this.props.data.link);
          }}
        >
          <ImageBackground
            source={require("../../img/newsBox/kırmızı.png")}
            style={BackGround}
          >
            <View style={subContainerStyle}>
              <Text style={text}> {this.props.data.title} </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    }
  };

  render() {
    //console.log(this.props.data.links[0].url);
    const { containerStyle, subContainerStyle, text, BackGround } = styles;
    return <View style={containerStyle}>{this.renderBody()}</View>;
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flex: 1
  },
  subContainerStyle: {
    height: 90,
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5
  },
  ImageStyle: {
    height: 300,
    width: 300,
    flex: 1
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "black",
    fontSize: deviceWidth / 26.5,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 0,
    height: 150,
    width: 150,
    //height: deviceWidth/2.5,
    //width: deviceWidth/2.5,
  },
  BackGround: {
    flex: 1,
    height: 150,
    width: 150,
    alignItems: "center"
  }
});
/*
<TouchableOpacity
         style={styles.button}
         onPress={() => { console.log("Pressed"); }}
        >
         <Text> {props.data.title} </Text>
       </TouchableOpacity>
*/

export default DetailNews;
