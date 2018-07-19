import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import HTML from "react-native-render-html";

const Detail = props => {
  const { containerStyle, subContainerStyle, ImageStyle, titleStyle } = styles;
  //   alert(JSON.stringify(props.data));
  return (
    <View style={containerStyle}>
      <View style={subContainerStyle}>
        <Text stye={titleStyle}> {props.data.title} </Text>
      </View>

      <View style={subContainerStyle}>
        {/* <Image style={ImageStyle} source={{ uri: props.data.image }} /> */}
        <Text> {props.data.links[0].url} </Text>
      </View>

      <View style={subContainerStyle}>
        <Text> {props.data.published} </Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  subContainerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  },
  ImageStyle: {
    height: 300,
    width: 300,
    flex: 1
  },
  titleStyle: {
    fontSize: 18
  }
};

export default Detail;
