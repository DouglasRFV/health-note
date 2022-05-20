import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import styles from './style';
import { LineChart } from "react-native-chart-kit";

export default function Chart({ navigation, route, dados, dias, sufix, decimalPlaces }) {

  const [ dadosChart, setDadosChart] = useState([]);

  useEffect(() => {
  }, []);

  return (
    <View>
      <LineChart
        data={{
          labels: dias,
          datasets: [
            {
              data: dados
            }
          ]
        }}
        width={Dimensions.get("window").width - 10} // from react-native
        height={220}
        withOuterLines={false}
        yAxisSuffix={sufix}
        yAxisInterval={0.8} // optional, defaults to 1
        yLabelsOffset={-2}
        chartConfig={{
          backgroundColor: "#2562BF",
          backgroundGradientFrom: "#2B72DF",
          backgroundGradientTo: "#5D9BFA",
          decimalPlaces: decimalPlaces, // optional, defaults to 2dp
          color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10
          },
          propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: "#5D9BFA"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}