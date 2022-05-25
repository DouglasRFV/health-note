import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from "./src/pages/Login";
import NewUser from "./src/pages/NewUser";
import Home from "./src/pages/Home";
import Chart from "./src/pages/Chart";
import Afericao from "./src/pages/Afericao";
import MinhasAfericoes from "./src/pages/MinhasAfericoes";
import ChartPaciente from "./src/pages/ChartPaciente";
import AfericoesPaciente from "./src/pages/AfericoesPaciente";

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
            drawerLabel: 'Gráfico de Aferições',
            drawerItemStyle: { display: 'none' },
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
        <Drawer.Screen
          name="Minhas Aferições"
          component={MinhasAfericoes}
          options={{
            headerTintColor: "#33ACFF",
            headerTitle: "Minhas Aferições",
            drawerLabel: 'Minhas Aferições'
          }}
        />
        <Drawer.Screen
          name="ChartPaciente"
          component={ChartPaciente}
          options={{
            drawerItemStyle: { display: 'none' },
            headerTintColor: "#33ACFF",
            headerTitle: "Gráficos do Paciente",
            drawerLabel: 'Gráficos do Paciente'
          }}
        />
        <Drawer.Screen
          name="AfericoesPaciente"
          component={AfericoesPaciente}
          options={{
            drawerItemStyle: { display: 'none' },
            headerTintColor: "#33ACFF",
            headerTitle: "Aferições do Paciente",
            drawerLabel: 'Aferições do Paciente'
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
