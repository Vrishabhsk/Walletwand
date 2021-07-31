//imports
import "react-native-gesture-handler";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider as PaperProvider } from "react-native-paper";
//Conext
import { StateProvider } from "./store/index";
//Navigation btw screens
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//Screens
import Welcome from "./screens/Welcome";
import Dashboard from "./screens/Dashboard";
import Analysis from "./screens/Analysis";

const Stack = createStackNavigator();

export default function App() {
  return (
    <StateProvider>
      <NativeBaseProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Analysis" component={Analysis} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </StateProvider>
  );
}
