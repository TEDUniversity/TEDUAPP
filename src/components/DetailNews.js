import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import HTML from "react-native-render-html";

const DetailNews = props => {
  const { containerStyle, subContainerStyle, ImageStyle, titleStyle } = styles;
  //   alert(JSON.stringify(props.data));
  return (
    <View style={containerStyle}>
        <TouchableOpacity
         style={styles.button}
         onPress={() => { console.log("Pressed"); }}
        >
         <Text> {props.data.title} </Text>
       </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flex: 1
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
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
};
/*
<TouchableOpacity
         style={styles.button}
         onPress={() => { console.log("Pressed"); }}
        >
         <Text> {props.data.title} </Text>
       </TouchableOpacity>
*/


export default DetailNews;
