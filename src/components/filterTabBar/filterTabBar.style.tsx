import {StyleSheet} from 'react-native';
import {
  chatBarBack,
  chatBarTextBlack,
  primaryWhite,
  strokeGray,
} from '../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: primaryWhite,
    marginVertical: calcHeight(16)
  },
  categories: {
    alignSelf: 'flex-start',
    backgroundColor: chatBarBack,
    borderRadius: 8,
    marginHorizontal: calcWidth(17),
    padding: 2
  },
  tab: {
    paddingHorizontal: calcWidth(20),
    paddingVertical: calcHeight(8),
  },
  activeTab: {
    backgroundColor: primaryWhite,
    borderWidth: 0.5,
    borderColor: primaryWhite,
    borderRadius: 6,
  },
  stroke: {
    backgroundColor: strokeGray,
    width: calcWidth(0.65),
    marginVertical: calcHeight(7),
    marginHorizontal: calcWidth(2),
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: chatBarTextBlack,
  },
});
