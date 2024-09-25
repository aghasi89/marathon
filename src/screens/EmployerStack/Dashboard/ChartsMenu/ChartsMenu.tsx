import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TabNavigationHeader from '../../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import Icons from '../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import {EmployerNavigationParamList} from '../..';
import ProgressTab from './ProgressTab/ProgressTab';
import GoalsTab from './GoalsTab/GoalsTab';
import styles from './ChartsMenu.style';
import hook from './ChartMenu-hook';
import SharingTab from './SharingTab/SharingTab';


type Props = NativeStackScreenProps<EmployerNavigationParamList, 'ChartsMenu'>;

const ChartsMenu: React.FC = () => {
  const navigaton = useNavigation<Props['navigation']>();
  const {
    leftIconPress,
    selectedTabIndex,
    onHeaderTabChange,
    tabs
} = hook(navigaton);

const renderItem =(index)=>{
switch (index) {
    case 0:
return  <ProgressTab/>
    case 1:
return  <GoalsTab/>
    case 2:
return  <SharingTab/>
  default:
        break;
}
}
    
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={leftIconPress}>
          <Icons.ArrowIcon fill={primaryBlack} />
        </TouchableOpacity>
        <TabNavigationHeader
            data={tabs}
            index={selectedTabIndex}
            setIndex={onHeaderTabChange}
        />
      </View>
      <View style={styles.contentContainer}>
       {renderItem(selectedTabIndex)}
      </View>
    </View>
  );
};
export default ChartsMenu;
