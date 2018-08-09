/** @format */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";


<Provider store={store}>
      <View>
        <RootStack />
      </View>
      </Provider>


AppRegistry.registerComponent(appName, () => App);
