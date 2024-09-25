import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {calcHeight} from '../../../../../../assets/dimensions';
import Icons from '../../../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../../components/headers/mainHeader/MainHeader';
import EditSheet from '../../../../../../components/editSheet/EditSheet';
import styles from './YouTubeVideo.style';

const YouTubeVideo: React.FC<any> = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);
  const leftIconPress = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <MainHeader
        title={'YouTube Video'}
        search={false}
        leftIcon={true}
        leftIconPress={leftIconPress}
        leftComponent={
          <Text
            onPress={() => {
              setIsOpen(true);
            }}
            style={styles.save}>
            Save
          </Text>
        }
      />
      <View style={styles.insertLink}>
        <TouchableOpacity>
          <Text style={styles.title}>Insert Link or Video ID</Text>
        </TouchableOpacity>
      </View>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={[
          {
            title: 'Discard changes',
            onSelect: () => {
              setIsOpen(false);
            },
            Icon: <Icons.Close fill={primaryBlack} />,
          },
          {
            title: 'Save changes',
            onSelect: () => {
              setIsOpen(false);
            },
            Icon: <Icons.CheckIcon fill={primaryBlack} />,
          },
        ]}
      />
    </View>
  );
};
export default YouTubeVideo;
