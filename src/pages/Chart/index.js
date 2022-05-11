import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg';

export default function Chart({ navigation }) {

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const contentInset = { top: 20, bottom: 20 }

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

  return (
    <View style={{ height: 200, flexDirection: 'row' }}>
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{
          fill: 'blue',
          fontSize: 10,
        }}
        numberOfTicks={10}
        formatLabel={(value) => `${value}ºC`}
      />
      <LineChart
        style={{ flex: 1, marginLeft: 16 }}
        data={data}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={contentInset}
      >
        <Grid />
      </LineChart>
    </View>
  )
}