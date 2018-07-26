import React from "react";
import { ScrollView, Text, View, ImageBackground } from "react-native";

const HorizontalList = props => (
    <View style={styles.containerStyle}>
        <Text style={styles.textStyle}> { props.title } </Text>
        <ScrollView 
        horizontal={true}
        decelerationRate={0}
        snapToInterval={245} //your element width
        snapToAlignment={"center"}
        contentInset={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 35,
          }}
        >
          {props.Data()}
        </ScrollView> 
    </View>
    );

    const styles = {
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
          marginRight: 5,
          marginTop: 20
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
          fontSize: 18,
          fontWeight: "bold",
        },
      };

export default HorizontalList;
