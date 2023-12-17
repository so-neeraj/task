import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import RoundProgressBar from './components/RoundProgressBar'; // Adjust the path based on your file structure
import FlatListData from './components/FlatListData';
import RNPickerSelect from 'react-native-picker-select';
import { Card, ProgressBar } from 'react-native-paper';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortType, setSortType] = useState('name'); // Default sort type
  const progressValue = 0.8;
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Jhon Doe',
      subject: 'Commerce',
      progress: 0.34,
      color: '#FF575C',
    },
    {
      id: '2',
      name: 'Aditi Sharma',
      subject: 'Science',
      progress: 0.2,
      color: '#009DFF',
    },
    {
      id: '3',
      name: 'Neeraj',
      subject: 'Commerce',
      progress: 0.3,
      color: '#20A120',
    },
    {
      id: '4',
      name: 'Aditya',
      subject: 'Science',
      progress: 0.4,
      color: '#FF575C',
    },
    {
      id: '5',
      name: 'Eklavya',
      subject: 'Commerce',
      progress: 0.5,
      color: '#009DFF',
    },
    {
      id: '6',
      name: 'Arjun',
      subject: 'Science',
      progress: 0.6,
      color: '#20A120',
    },
    {
      id: '7',
      name: 'Yudhisthir',
      subject: 'Commerce',
      progress: 0.7,
      color: '#FF575C',
    },
    {
      id: '8',
      name: 'Bhism',
      subject: 'Science',
      progress: 0.8,
      color: '#009DFF',
    },
    {
      id: '9',
      name: 'Nakul',
      subject: 'Commerce',
      progress: 0.9,
      color: '#20A120',
    },
    {
      id: '10',
      name: 'Krishna',
      subject: 'Science',
      progress: 1.0,
      color: '#009DFF',
    },
  ]);

  const sortList = (order) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortType === 'name') {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return order === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortType === 'progress') {
        return order === 'asc'
          ? a.progress - b.progress
          : b.progress - a.progress;
      } else if (sortType === 'progressDesc') {
        return order === 'desc'
          ? a.progress - b.progress
          : b.progress - a.progress;
      }
      return 0;
    });
    setData(sortedData);
  };

  const toggleModal = (item) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    // Get the current hour
    const currentHour = new Date().getHours();
    // Determine the greeting based on the time of the day
    let newGreeting = '';
    if (currentHour >= 0 && currentHour < 12) {
      newGreeting = 'Good Morning!';
    } else if (currentHour >= 12 && currentHour < 17) {
      newGreeting = 'Good Afternoon!';
    } else {
      newGreeting = 'Good Evening!';
    }
    // Update the state with the new greeting
    setGreeting(newGreeting);
  }, []);

  const getColorBasedOnPercentage = (percentage) => {
    if (percentage < 0.4) {
      return '#FF575C'; // or any color you want for less than 40%
    } else if (percentage < 0.8) {
      return '#009DFF'; // or any color you want for 40% to 80%
    } else {
      return '#20A120'; // or any color you want for 80% and above
    }
  };

  const getColorBasedOnSubject = (subject) => {
    if (subject == 'Science') {
      return '#FA661B'; // or any color you want for less than 40%
    } else if (subject == 'Commerce') {
      return '#FBB03B'; // or any color you want for 40% to 80%
    } else {
      return '#20A120'; // or any color you want for 80% and above
    }
  };

  const renderItem = ({ item }) => (
    <Card style={{ margin: 8 }} onPress={() => toggleModal(item)}>
      <TouchableOpacity onPress={() => toggleModal(item)}>
        <View style={styles.row}>
          <Text
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: getColorBasedOnSubject(item.subject),
              fontSize: 20,
              alignItems: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#fff',
              textAlignVertical: 'center',
              justifyContent: 'center',
              margin: 10,
            }}>
            {item.name.charAt(0)}
          </Text>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.name}</Text>
              <Text style={styles.time}>{item.subject}</Text>
            </View>
          </View>
          <FlatListData
            progress={item.progress}
            radius={30}
            strokeWidth={8}
            color={getColorBasedOnPercentage(item.progress)}
            //color={item.color}
            style={[styles.icon, { marginLeft: 10 }]}
          />
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 20,
          marginLeft: 20,
          fontWeight: 'bold',
        }}>
        {greeting}
      </Text>
      <RoundProgressBar
        progress={progressValue}
        radius={50} // Adjust the radius as needed
        strokeWidth={10} // Adjust the strokeWidth as needed
        color="#FA661B" // Progress color
      />

      <View style={{}}>
        <Text style={styles.itemText}>Sort By:</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            setSortType(value);
            sortList('asc'); // Default to ascending order when changing sort type
          }}
          items={[
            { label: 'Name', value: 'name' },
            { label: 'Percentage (Asc)', value: 'progress' },
            { label: 'Percentage (Desc)', value: 'progressDesc' },
          ]}
          value={sortType}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.container2}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
              <Image
                style={[styles.icon, { marginLeft: 15, width: 20, height: 20 }]}
                source={{
                  uri: 'https://img.icons8.com/small/14/000000/back.png',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{ marginLeft: 20, fontSize: 20, fontWeight: 'normal' }}>
              Scorecard
            </Text>
          </View>
          <Card style={{ margin: 14 }}>
            <Card.Content>
              <View>
                <View style={styles.itemContainer}>
                  <Text
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: '#000000',
                      fontSize: 20,
                      alignItems: 'center',
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      textAlignVertical: 'center',
                      justifyContent: 'center',
                    }}>
                    {selectedItem ? selectedItem.name.charAt(0) : ''}
                  </Text>
                  <View style={{ marginRight: 250, width: 370 }}>
                    <Text style={styles.itemText}>
                      {selectedItem ? selectedItem.name : ''}
                    </Text>
                    <Text style={styles.itemSub}>
                      {selectedItem ? selectedItem.subject : ''}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{ marginTop: 10, fontWeight: 'bold', marginLeft: 10 }}>
                  Score:{' '}
                  {Math.round(selectedItem ? selectedItem.progress * 100 : '')}%
                </Text>
                <ProgressBar
                  style={{ marginTop: 20, marginLeft: 10 }}
                  progress={selectedItem ? selectedItem.progress : ''}
                  color="#3498db"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text style={styles.itemText}>Result</Text>
                  <Text style={styles.itemSub}>Value</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#ececec',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    margin: 10,
  },
  container2: {
    flex: 1,
    padding: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  itemSub: {
    fontSize: 14,
    marginLeft: 20,
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: -130,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
    marginLeft: 16,
  },
  icon: {
    height: 28,
    width: 28,
  },
});

export default HomeScreen;
