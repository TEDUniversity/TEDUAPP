import { AsyncStorage } from "react-native";
import * as types from "../store/types";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { store } from "../store";

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

export function getData(key: string): any {
  retrieveData(key).then(response => {
    return response;
  });
}

export async function getDataAll() {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, stores) => {
        let key = stores[i][0];
        let value = stores[i][1];

        if (key === "teduRSS") {
          store.dispatch(actions.updateRss(value));
          //   return value;
        }
        // add your data to redux store
      });
    });
  });
}
