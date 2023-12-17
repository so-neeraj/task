import React from 'react';
import { View, Text } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { Card, ProgressBar } from 'react-native-paper';

const FlatListData = ({ progress, radius, strokeWidth, color }) => {
  return (
    <View style={{}}>
      <ProgressCircle
        style={{ height: radius * 2, width: radius * 2}}
        progress={progress}
        progressColor={color}
        strokeWidth={strokeWidth}
        backgroundColor="#e0e0e0" // Background color
       >
      <Text style={{ fontWeight:'bold', fontSize:12, textAlign:'center',textAlignVertical:'center', marginTop:20}}>{Math.round(progress * 100)}</Text>
      </ProgressCircle>
    </View>
  );
};

export default FlatListData;
