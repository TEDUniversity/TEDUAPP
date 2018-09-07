import React, { Component } from "react";
import {
              Text,
              View,
              Image,
              Dimensions,
              TouchableOpacity,
              ImageBackground,
              StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


interface IProps {
              imgsrc: string;
              navigation?: any;
              data: any;
}

class CouncilNewsContent extends Component<IProps> {
              //   alert(JSON.stringify(props.data));
              static navigationOptions = ({ navigation }) => ({
                            headerTitle: (
                                          <Text style={styles.headerTitle}> {navigation.state.params.title} </Text>
                            ),
                            headerStyle: { marginTop: 0, backgroundColor: "#144d8c", height: 35 },
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


              componentWillMount() {
                            console.log(this.props.navigation.state.params.data);
              }
              render() {

                            return <View >
                                          <Text> {this.props.navigation.state.params.content} </Text>
                                          <Text> {this.props.navigation.state.params.author} </Text>
                                          <Text> {this.props.navigation.state.params.date} </Text>
                                          <Text> News content </Text>
                            </View>;
              }
}

const styles = StyleSheet.create({
              headerTitle: {
                            fontWeight: "bold"
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
                            fontSize: 15,
                            fontWeight: "400"
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
