import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icons from '../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import TabBadges from '../../../../components/TabBadges/TabBadges';
import Search from '../../../../components/search/Search';
import MultiSelectSelectedChips from '../../../../components/multiSelect/MultiSelectSelectedChips';
import PaymentCard from '../../../../components/paymentCard/PaymentCard';
import styles from './MarathonDetail.style';
import MarathonDetailHook from './MarathonDetail-hook';

type Props = {navigation: any};
const Payments: React.FC<Props> = ({navigation}) => {
  const {
    badgesPayment,
    indexTab,
    setIndexTab,
    isFocus,
    onFocus,
    onBlur,
    searchText,
    navigateFilter,
    filterText,
    selectedFilterListMarathon,
    deleteItem,
    paymentList,
    totalPayment,
  } = MarathonDetailHook(navigation);
  return (
    <View style={styles.container}>
      {!isFocus ? (
        <View style={styles.badgesNotification}>
          <View style={styles.badges}>
            <TabBadges
              data={badgesPayment}
              index={indexTab}
              setIndex={setIndexTab}
            />
            <Text style={styles.text}>{totalPayment} $</Text>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.iconStyle} onPress={onFocus}>
              <Icons.SearchIcon fill={primaryBlack} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle} onPress={navigateFilter}>
              <Icons.Filter fill={primaryBlack} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.searchBar}>
          <TouchableOpacity style={styles.arrowButton} onPress={onBlur}>
            <Icons.ArrowIcon fill={primaryBlack} />
          </TouchableOpacity>
          <Search
            open={isFocus}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={filterText}
            inputValue={searchText}
          />
          <TouchableOpacity style={styles.arrowButton} onPress={navigateFilter}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        </View>
      )}
      {selectedFilterListMarathon.length > 0 && (
        <View style={styles.filterList}>
          <MultiSelectSelectedChips
            list={selectedFilterListMarathon}
            onDelete={deleteItem}
          />
        </View>
      )}
      {/* {marathonsDetail.payments?.map((user, index) => { */}
      {paymentList?.map((user, index) => {
        return (
          <View key={index} style={styles.infoCard}>
            <PaymentCard
              name={user.name}
              title={user.title}
              imageUrl={user.imageUrl}
              date={user.date}
              price={user.price}
              onPress={() => {}}
            />
          </View>
        );
      })}
    </View>
  );
};
export default Payments;
