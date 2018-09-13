const WEBVIEW_REF = "WEBVIEW_REF";
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
  Platform,
  BackHandler
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

let deviceWidth = Dimensions.get("window").width;

const navTitle = Platform.OS === "ios" ? 200 : 100;

class Webview extends React.Component<IProp> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={styles.headerTitle}>
        {" "}
        {Platform.OS === "ios" ? navigation.state.params.title : " "}{" "}
      </Text>
    ),

    title: "Webview",
    headerStyle: {
      marginTop: 0,
      backgroundColor: "#144d8c",
      height: deviceWidth / 10.7
    },
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

  webView = {
    canGoBack: false,
    ref: null
  };

  loadError = () => {
    Alert.alert(
      "Ağ hatası",
      "Sayfayı görüntülemek için lütfen internet bağlantınızı kontrol ediniz.",
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

  onForward = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goForward();
      return true;
    }
    return false;
  };

  onAndroidBackPress() {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }
  componentWillMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress.bind(this)
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress.bind(this)
      );
    }
  }

  render() {
    console.log(this.props.navigation.state.params.url);
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={webView => {
            this.webView.ref = webView;
          }}
          source={{ uri: this.props.navigation.state.params.url }}
          style={{ marginTop: 0 }}
          startInLoadingState={true}
          renderLoading={() => {
            return <Spinner size={"large"} />;
          }}
          onError={err => {
            this.loadError();
          }}
          onNavigationStateChange={navState => {
            this.webView.canGoBack = navState.canGoBack;
          }}

          //onNavigationStateChange={this.onNavigationStateChange }
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 30,
            backgroundColor: "rgb(24, 79, 138)"
          }}
        >
          <TouchableOpacity
            //disabled={!this.webView.canGoBack}
            onPress={() => this.onAndroidBackPress()}
          >
            <Icon
              name="ios-arrow-back"
              size={deviceWidth / 12}
              style={{ color: "rgb(1, 14, 41)", marginLeft: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onForward()}>
            <Icon
              name="ios-arrow-forward"
              size={deviceWidth / 12}
              style={{ color: "rgb(1, 14, 41)", marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
/*
<TouchableOpacity>
            <Icon name="ios-arrow-forward" size={deviceWidth / 12} style={{ color: "rgb(1, 14, 41)", marginRight: 10 }} />
          </TouchableOpacity>
*/

export default Webview;

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "bold",
    fontSize: deviceWidth / 22
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
