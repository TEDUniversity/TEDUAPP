import React, { Component } from "react";
import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  WebView,
  Alert,
  Platform
} from "react-native";
import Image from "react-native-scalable-image";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import { Header } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const Spinner = ({ size }) => <ActivityIndicator size={size || "large"} />;

interface IProp {
  navigation: any;
}

let deviceWidth = Dimensions.get('window').width;


const navTitle = Platform.OS === 'ios' ? 200 : 100;


class Webview extends React.Component<IProp> {
  
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={styles.headerTitle}> { Platform.OS === 'ios' ? navigation.state.params.title : " " } </Text>
    ),
    
    title: "Webview",
    headerStyle: { marginTop: 0, backgroundColor: "#144d8c", height: deviceWidth / 10.7 },
    headerLeft: (
      <TouchableOpacity
        style={styles.headerLeftContainer}
        onPress={() => {
          navigation.navigate("MainRouter", { showAlert: false });
        }}
      >
        <Icon name="ios-arrow-back" size={30} />
        <Text style={styles.headerLeftText}>
          {navigation.state.params.backButton}
        </Text>
      </TouchableOpacity>
    )
  });

  loadError = () => {
    Alert.alert(
      "Network Error",
      "Please check network to view page.",
      [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("MainRouter")
        }
      ],
      { cancelable: false }
    );
    return <View />;
  };

  /*componentDidMount() {
        this.props.navigation.popToTop();
    }*/

  render() {
    console.log(this.props.navigation.state.params.url);
    return (
      <WebView
        source={{ uri: this.props.navigation.state.params.url }}
        style={{ marginTop: 0 }}
        startInLoadingState={true}
        renderLoading={() => {
          return <Spinner size={"large"} />;
        }}
        onError={(err) => { this.loadError() } }
        // onError
      />
    );
  }
}

export default Webview;

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "bold",
    fontSize: deviceWidth / 22,
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3
  },
  headerLeftText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: deviceWidth / 26.45,
    fontWeight: "400"
  }
});

//IMPORTANT NOTE: WebView would render when it was the only component returned, but not when nested in another View component. Only for methods
