import React from "react";
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions
} from "react-native";

interface IProp {
  title: string;
  Data: () => JSX.Element[];
  style?: any;
}

let deviceWidth = Dimensions.get("window").width;

class HorizontalList extends React.Component<IProp> {
  render() {
    const {
      warningText,
      textStyle,
      subContainerStyle,
      containerStyle,
      warningView
    } = styles;
    let news;
    if (this.props.Data().length === 0) {
      news = (
        <View style={warningView}>
          <Text style={warningText}>Will be here soon... </Text>
        </View>
      );
    } else {
      news = this.props.Data();
    }
    return (
      <View style={[containerStyle, this.props.style]}>
        <Text style={textStyle}> {this.props.title} </Text>
        <ScrollView
          horizontal={true}
          decelerationRate={0}
          snapToInterval={245} //your element width
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 35
          }}
        >
          {news}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    //borderWidth: 1,
    //borderRadius: 2,
    //borderColor: "#ddd",
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 2,
    elevation: 100,
    marginLeft: 12,
    marginRight: 5
    //marginTop: 20 commented out to adjusted from news.js with prop. If required it can uncommented.
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
  textStyle: {
    marginLeft: 15,
    fontSize: deviceWidth / 20.833333333,
    fontWeight: "bold"
  },
  warningText: {
    marginLeft: 20,
    marginTop: 10,
    fontStyle: "italic",
    //fontSize: 18,

    fontWeight: "bold"
  },
  warningView: {
    height: 130,
    width: 150,
    justifyContent: "center",
    alignContent: "center"
  }
});

export default HorizontalList;
