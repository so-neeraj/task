import React from 'react';
import { View, Text } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { Card, ProgressBar } from 'react-native-paper';

const RoundProgressBar = ({ progress, radius, strokeWidth, color }) => {

const data = [
    {
      id: '1',
      text: 'Poor!',
      subject: 'Commerce',
      progress: 0.34,
    },
    {
      id: '2',
      text: 'Good!',
      subject: 'Science',
      progress: 0.60,
    },
    {
      id: '3',
      text: 'Excellent!',
      subject: 'Commerce',
      progress: 0.95,
    },
  ];

    const getColorBasedOnPercentage = (percentage) => {
    if (percentage < 0.40) {
      return '#FF575C'; // or any color you want for less than 40%
    } else if (percentage < 0.80) {
      return '#009DFF'; // or any color you want for 40% to 80%
    } else {
      return '#20A120'; // or any color you want for 80% and above
    }
  };

  
  return (
    <View style={{}}>
    <Card style={{ margin: 18 }}>
      <Card.Content>
      <View style={{flexDirection:'row'}}>
      <ProgressCircle
        style={{ height: radius * 2, width: radius * 2,}}
        progress={progress}
        //progressColor={color}
        progressColor={getColorBasedOnPercentage(data.progress)}
        strokeWidth={strokeWidth}
        backgroundColor="#e0e0e0" // Background color
      >
      <Text style={{ fontWeight:'bold', fontSize:20, textAlign:'center',textAlignVertical:'center',marginTop:35}}>{Math.round(progress * 100)}%</Text>
      </ProgressCircle>
      <View style={{marginTop:10}}>
      <Text numberOfLines={2} style={{marginLeft:20, fontSize:18, fontWeight:'bold',}}>Average Scorecard Excellent!</Text>
       <Text style={{marginLeft:20,  marginTop:20, fontSize:18, fontWeight:'normal',}}>24 of 80 students passed!</Text>
      </View>
      </View>
      </Card.Content>
    </Card>
    </View>
  );
};

export default RoundProgressBar;
