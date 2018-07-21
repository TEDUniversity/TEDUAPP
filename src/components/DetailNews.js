import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import HTML from "react-native-render-html";

const DetailNews = props => {
  const { containerStyle, subContainerStyle, ImageStyle, titleStyle } = styles;
  //   alert(JSON.stringify(props.data));
  return (
        <TouchableOpacity
         style={styles.button}
         onPress={() => { console.log("Pressed"); }}
        >
         <Text style={styles.text}> {props.data.title} </Text>
       </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    
  
  },
  
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: (Dimensions.get("window").width / 2) - 10,
    padding: 5,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,    
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    
  }
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
