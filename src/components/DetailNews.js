import React, { Component } from "react";
import { Text, View, Image, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import HTML from "react-native-render-html";

class DetailNews extends Component {
  //   alert(JSON.stringify(props.data));

  renderBody = () => {
    const { containerStyle, subContainerStyle, text, BackGround } = styles;
    if (this.props.imgsrc === "sarı") {
      return (
        <ImageBackground source={require("../../img/newsBox/sarı.png")} style={BackGround}>
          <View style={subContainerStyle}> 
            <Text style={text}> {this.props.data.title} </Text>
          </View>
         </ImageBackground>
      );
    } else if (this.props.imgsrc === "mavi") {
      return (
        <ImageBackground source={require("../../img/newsBox/mavi.png")} style={BackGround}>
          <View style={subContainerStyle}> 
            <Text style={text}> {this.props.data.title} </Text>
          </View>
         </ImageBackground>
      );
    } else if (this.props.imgsrc === "kırmızı") {
      return (
        <ImageBackground source={require("../../img/newsBox/kırmızı.png")} style={BackGround}>
          <View style={subContainerStyle}> 
            <Text style={text}> {this.props.data.title} </Text>
          </View>
         </ImageBackground>
      );
    }
  };

  render() {
    console.log(this.props.imgsrc);
    const { containerStyle, subContainerStyle, text, BackGround } = styles;
    return (
      <View style={containerStyle}>
          <TouchableOpacity
           style={styles.button}
           onPress={() => { console.log("Pressed"); }}
          >
          {this.renderBody()}
         </TouchableOpacity>
      </View>
    );
  }

}

const styles = {
  containerStyle: {
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flex: 1,
    
  },
  subContainerStyle: {
    height: 90,
    flexWrap: "wrap",
    justifyContent: 'center',

    },
  ImageStyle: {
    height: 300,
    width: 300,
    flex: 1
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: "white",
    fontSize: 12,
    

  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 0,
    height: 150,
    width: 150,
  },
  BackGround: {
    flex: 1,
    height: 150,
    width: 150,
    alignItems: 'center',
    
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
