/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import Image from 'react-native-scalable-image';


class News extends Component {
    static navigationOptions = {
        
      };
    
      state = { data: [], loading: true };


      /*    
      xml parse etmek için bulduğum linkler aşağıda 
      https://www.npmjs.com/package/xmldom
      https://github.com/Leonidas-from-XIV/node-xml2js
      https://stackoverflow.com/questions/29805704/react-native-fetch-xml-data
      */

    //chrome dan js debug yaparak görebilirsin console log ları
    componentWillMount() {
        //internetten bulduğum kod burda ama çalışmıyor
        //const parseString = require('xml2js').parseString;
        //const xml = "<root>Hello xml2js!</root>"
        /*axios
          .get("https://www.tedu.edu.tr/rss.xml")
          .then(response => {
            parseString(response, (err, result) => {
                console.log(result);
                });
          });*/
        
        //Yunusmarkette kullandığımız kod aşağıda
        //browser da  linki açarak response u görebilirsin
        /*axios
          .get("https://www.tedu.edu.tr/rss.xml")
          .then(response => {
            this.whenLoaded(response);
          })
          .catch(error => {
            console.log(error);
          });*/
      }

    whenLoaded(response) {
        this.setState({ data: response.data });
        this.setState({ loading: false });
        console.log(this.state.data);
      }

    sendNavOps = props => {
        this.props.navOp.setParams({
            headerTitle: (
                <Image resizeMode="contain" width={Dimensions.get('window').width} style={{ marginTop: 40 }} source={require("./img/header/anatepe2.png")} />
            ),
            title: "Council",
            headerStyle: { marginTop: 0, backgroundColor: "#fff" },
            headerLeft: null,
            gesturesEnabled: false,
        });
    }

    render() {
    this.sendNavOps();
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.text}>
                    This is News.
                </Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    text: {
        fontWeight: "bold"
    },
    subContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center" 
    }
  });

  export default News;
