import { AsyncStorage } from "react-native";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key).catch(error =>
      console.log(error)
    );
    if (value !== null) {
      // We have data!!
      //console.log(value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};
