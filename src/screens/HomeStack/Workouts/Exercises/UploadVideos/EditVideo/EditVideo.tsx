import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {calcHeight} from '../../../../../../assets/dimensions';
import Icons from '../../../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
} from '../../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../../components/headers/mainHeader/MainHeader';
import EditSheet from '../../../../../../components/editSheet/EditSheet';
import NumberInput from '../../../../../../components/numberInput/NumberInput';
import {execiseVideoSelector} from '../../../../../../store/selectors/execise-selector';
import styles from './EditVideo.style';

const EditVideo: React.FC<any> = ({navigation}) => {
  const exerciseVideo = useSelector(execiseVideoSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [valueNumber, setValueNumber] = useState<string>('');
  const leftIconPress = () => navigation.goBack();
  const editSheet = [
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
  ];
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Edit Video'}
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
      <View style={styles.rowContainer}>
        <View style={styles.exerciseName}>
          <Text style={styles.title}>{exerciseVideo.title}</Text>
        </View>
        <View style={styles.header}>
          <TouchableOpacity style={styles.icon} onPress={() => {}}>
            <Icons.Info />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => {}}>
            <Icons.DeleteBlackIcon fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        source={{uri: exerciseVideo.videoUrl}}
        style={styles.containerImage}
      />
      <View style={styles.duration}>
        <Text style={styles.text}>Set Start</Text>
        <NumberInput
          value={valueNumber}
          onChangeValue={(val: string) => {
            setValueNumber(val);
          }}
        />
        <NumberInput
          value={valueNumber}
          onChangeValue={(val: string) => {
            setValueNumber(val);
          }}
        />
        <Text style={styles.text}>Set End</Text>
      </View>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={editSheet}
      />
    </View>
  );
};
export default EditVideo;
