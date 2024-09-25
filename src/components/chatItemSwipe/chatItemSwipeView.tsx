import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SwipeableRow from 'react-native-swipeable-row';

const ChatItemSwipeView = ({ channel }) => {
  const handleDelete = () => {
    // Delete logic for the channel
    console.log("Deleting channel:", channel);
  };

  return (
    <SwipeableRow
      leftButtons={[
        <TouchableOpacity onPress={handleDelete}>
          <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Delete</Text>
          </View>
        </TouchableOpacity>
      ]}
    >
      {/* Your channel preview content goes here */}
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', paddingLeft: 20 }}>
        <Text>{channel.name}</Text>
      </View>
    </SwipeableRow>
  );
};

export default ChatItemSwipeView;
