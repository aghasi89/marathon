import React,{useCallback} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TabNavigationHeader from '../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import MultiSelectSelectedChips from '../../../components/multiSelect/MultiSelectSelectedChips';
import {primaryBlack, primaryBlue} from '../../../assets/styles/colors.styles';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import TabBadges from '../../../components/TabBadges/TabBadges';
import Icons from '../../../assets/icons/svg/index';
import { NavigationParamList } from '..';
import Group from './Group/Group';
import indexHook from './index-hook';
import styles from './index.style';

type Props = NativeStackScreenProps<NavigationParamList, 'Marathons'>;

const Marathons: React.FC = () => {
  const navigation=useNavigation<Props['navigation']>()
  const {
    isFocus,
    setIsfocus,
    searchText,
    indexTab,
    setIndexTab,
    index,
    setIndex,
    filterText,
    navigateFilter,
    deleteItem,
    selectedFilterListMarathons,
    badges,
    leftIconPress
  } = indexHook(navigation);
  const chiprGroupItems = [
    {
      title: 'Individual',
      icon: <Icons.UserIcon fill={primaryBlack} />,
      selectedIcon: <Icons.UserIcon fill={primaryBlue} />,
    },
    {
      title: 'Group',
      icon: <Icons.UserIcon fill={primaryBlack} />,
      selectedIcon: <Icons.UserIcon fill={primaryBlue} />,
    },
  ];
  const renderComponent = useCallback(() => {
    switch (index) {
      case 0:
        return <Text></Text>;
      case 1:
        return <Group searchText={searchText}/>;
      default:
    }
  },[searchText,index])
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Marathons'}
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity onPress={navigateFilter}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={leftIconPress}
      />
      <TabNavigationHeader
       data={chiprGroupItems}
       index={index}
       setIndex={setIndex}
       />
      {selectedFilterListMarathons.length > 0 ? (
        <View style={styles.filterList}>
          <MultiSelectSelectedChips
            list={selectedFilterListMarathons}
            onDelete={deleteItem}
          />
        </View>
      ) : (
        <TabBadges data={badges} index={indexTab} setIndex={setIndexTab} />
      )}
      {renderComponent()}
    </View>
  );
};
export default Marathons;
