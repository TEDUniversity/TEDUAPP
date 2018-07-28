import React, { Component } from "react";
import { ImageBackground, Linking, TouchableOpacity,
 Text, View, StyleSheet, ActivityIndicator, WebView } from "react-native";
import Image from "react-native-scalable-image";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Header } from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";

const Spinner = ({ size }) => (
    <ActivityIndicator size={size || "large"} />
  );




class Webview extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
          <Text style={styles.headerTitle}> {navigation.state.params.title} </Text>
        ),
        title: "Webview",
        headerStyle: { marginTop: 0, backgroundColor: "#144d8c", height: 35 },
        headerLeft: (
            <TouchableOpacity style={styles.headerLeftContainer} onPress={() => { navigation.navigate("MainRouter"); }} >
                <Icon name="ios-arrow-back" size={30} />
                <Text style={styles.headerLeftText}> Menu </Text>
            </TouchableOpacity>
        )

    });
    
    
    /*componentDidMount() {
        this.props.navigation.popToTop();
    }*/

    render() {
        console.log(this.props.navigation.state.params.url);
        return (
            <WebView
                source={{ uri: this.props.navigation.state.params.url }}
                style={{ marginTop: 0 }}
                renderLoading={() => { return (<Spinner size={"large"} />); }}
            />
        );
    }
    
  }

  export default Webview;
  
  const styles = StyleSheet.create({
    headerTitle: {
        fontWeight: "bold",
      
    },
    headerLeftContainer: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center", 
        marginLeft: 3,
      
    },
    headerLeftText: {
        alignItems: "center", 
        justifyContent: "center", 
        fontSize: 15, 
        fontWeight: "400",
        
    },
  });

//IMPORTANT NOTE: WebView would render when it was the only component returned, but not when nested in another View component. Only for methods
