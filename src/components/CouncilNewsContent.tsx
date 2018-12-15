import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
import Image from 'react-native-scalable-image';


export const Spinner = ({ size }) => (
  <View>
    <ActivityIndicator size={size || "large"} />
  </View>
);

interface IProps {
  imgsrc: string;
  navigation?: any;
  data: any;
}

let deviceWidth = Dimensions.get("window").width;

class CouncilNewsContent extends Component<IProps> {
  //   alert(JSON.stringify(props.data));
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={styles.headerTitle}> {Platform.OS === "ios" ? "News" : ""} </Text>
    ),
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

  state = {
    hasImage: false,
  }

  componentWillMount() {
    if (this.props.navigation.state.params.image != "") {
      this.setState({ hasImage: true })
    }


    //console.log(this.props.navigation.state.params);
    //var storage = firebase.storage();
    //var storageRef = storage.ref("TedüOpening.jpeg");
    //var storageRef = storage.refFromURL('gs://teduapp-210c9.appspot.com/TedüOpening.jpeg');
    //var url = "/council/TedüOpening.jpeg";
    console.log(this.props.navigation.state.params.image)

    //var storageRef = storage.ref();
    //console.log(storageRef.fullPath)
    //console.log(storageRef.name)
    //var imageName = this.props.navigation.state.params.image
    //var starsRef = storageRef.child(imageName);

    //storageRef.getDownloadURL().then(function(url) {
    //  console.log(url)
    //}).catch(function(error) {
    // Handle any errors
    //console.log(error)
    //});
  }

  renderLinks = () => {
    let array = [];
    Object.keys(this.props.navigation.state.params.links).forEach(child => {
      array.push(this.props.navigation.state.params.links[child])
    })

    return (array.map((item, id) => {
      console.log(item)
      if (item.valid) {
        return (
          <TouchableOpacity key={id}
            style={{ flex: 1 }}
            onPress={() => {
              this.props.navigation.navigate("WebviewRouter", {
                url: item.url,
                title: "News",
                backButton: "News",
                backRoute: "CouncilContentRouter"
              });
            }}
          >
            <Text style={[styles.text, { color: "rgb(0, 120, 201)" }]} >{item.text}</Text>
          </TouchableOpacity>
        )
      }
    }))
  }

  render() {
    let image;
    if (this.state.hasImage) {
      image = (
        <View style={{ width: Dimensions.get("window").width }} >
          <Image
            width={Dimensions.get('window').width} // height will be calculated automatically
            source={{ uri: this.props.navigation.state.params.image }}
            onError={(error) => {
              console.log(error)
              console.log("error")

              Alert.alert(
                "Network error",
                "Check your network connection.",
                [
                  {
                    text: "OK",
                    onPress: () => {
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
      )
    } else {
      image = (
        <View />
      )
    }

    return <View style={{ flex: 1 }} >
      <ImageBackground
        source={require("../../img/background/BACKGROUND.png")}
        style={styles.mainBackGround}
      >
        <ScrollView>

          {image}

          <Text style={styles.text} >
            {this.props.navigation.state.params.content}
          </Text>
          {this.renderLinks()}
        </ScrollView>
        <View style={{ marginBottom: 7, marginTop: 5 }} >
          <View style={{ alignItems: "flex-end", marginRight: 13 }} >
            <Text style={{}}> {this.props.navigation.state.params.author} </Text>
          </View>
          <View style={{ alignItems: "flex-end", marginRight: 13, marginTop: 2 }} >
            <Text style={{}}> {this.props.navigation.state.params.date} </Text>
          </View>
        </View>

      </ImageBackground>
    </View>;
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "bold",
    fontSize: deviceWidth / 22,
  },
  text: {
    margin: 10,
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 20
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
  },
  mainBackGround: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
    // width: null,
    // height: null
  }
});
/*
<TouchableOpacity
         style={styles.button}
         onPress={() => { console.log("Pressed"); }}
        >
         <Text> {props.data.title} </Text>
       </TouchableOpacity>
*/

export default CouncilNewsContent;
