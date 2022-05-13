import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/pages/Login";
import NewUser from "./src/pages/NewUser";
import Chart from "./src/pages/Chart";
import Afericao from "./src/pages/Afericao";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Chart"
          component={Chart}
          options={{
            headerTintColor: "#33ACFF",
          }}
        />
        <Stack.Screen
          name="Afericao"
          component={Afericao}
          options={{
            headerTintColor: "#33ACFF",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
