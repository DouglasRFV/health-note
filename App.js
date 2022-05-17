import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from "./src/pages/Login";
import NewUser from "./src/pages/NewUser";
import Home from "./src/pages/Home";
import Chart from "./src/pages/Chart";
import Afericao from "./src/pages/Afericao";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' },
            swipeEnabled: false
          }}
        />
        <Drawer.Screen
          name="NewUser"
          component={NewUser}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' },
            swipeEnabled: false
          }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerTintColor: "#33ACFF",
            headerTitle: 'Home',
            drawerLabel: 'Home'
          }}
        />
        <Drawer.Screen
          name="Chart"
          component={Chart}
          options={{
            headerTintColor: "#33ACFF",
            headerTitle: 'Gráfico de Aferições',
            drawerLabel: 'Gráfico de Aferições'
          }}
        />
        <Drawer.Screen
          name="Afericao"
          component={Afericao}
          options={{
            headerTintColor: "#33ACFF",
            headerTitle: "Anotar Aferição",
            drawerLabel: 'Anotar Aferição'
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
