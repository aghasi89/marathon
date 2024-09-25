import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SegmentedHeader from '../../../../components/headers/segmentedHeader/SegmentedHeader';
import styles from './ProgramDates.style';
import Auto from './Auto';
import Manual from './Manual';

const ProgramDates: React.FC<any> = ({navigation}) => {
  const [index, setIndex] = useState<number>(0);
  const renderComponent = () => {
    switch (index) {
      case 0:
        return <Auto navigation={navigation} />;
      case 1:
        return <Manual navigation={navigation} />;
      default:
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.segmentedHeaderContainer}>
        <View>
          <SegmentedHeader
            selectedIndex={index}
            lebalList={['Auto', 'Manual']}
            onChange={(item: any) => {
              setIndex(item);
            }}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.title}>Clear All</Text>
        </TouchableOpacity>
      </View>
      {renderComponent()}
    </View>
  );
};
export default ProgramDates;
