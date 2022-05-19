import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg';
import styles from './style';

export default function Chart({ navigation, route, dadosUsuario, dadosAfericoes }) {

  const [chartGlicemia, setChartGlicemia] = useState([]);

  const contentInset = { top: 20, bottom: 20 };

  // console.log('DADOS USUARIO', dadosUsuario);
  // console.log('DADOS AFERICOES', dadosAfericoes);

  const Label = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <Text
          key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill='black'
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={22}
        >
          {data.value}%
        </Text>
      )
    })
  }

  const loadDataCharts = () => {
    const dataCharts = [];
    dadosAfericoes.forEach(element => {
      // console.log('ELEMENT =>', element.glicemia);
      dataCharts.push(parseInt(element.glicemia));
    });
    setChartGlicemia(dataCharts);
    console.log('CHART =>', chartGlicemia);
  }

  useEffect(() => {
    loadDataCharts();
  }, []);

  return (
    // <View style={{ height: 200, flexDirection: 'row' }}>
    <View style={styles.chart}>
      <YAxis
        data={chartGlicemia}
        contentInset={contentInset}
        svg={{
          fill: '#090D18',
          fontSize: 10,
          fontWeight: 'bold'
        }}
        numberOfTicks={10}
        formatLabel={(value) => `${value}`}
      />
      <LineChart
        style={{ flex: 1, marginLeft: 16 }}
        data={chartGlicemia}
        svg={{ stroke: '#4F7A9C' }}
        contentInset={contentInset}
      >
        <Grid />
      </LineChart>
      <XAxis
        // style={{ marginHorizontal: -10 }}
        data={chartGlicemia}
        formatLabel={(value, index) => index}
        contentInset={contentInset}
        svg={{
          fill: '#090D18',
          fontSize: 10,
          fontWeight: 'bold'
        }}
      />
    </View>
  )
}