import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  primaryBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';

export const style = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: calcWidth(20),
    paddingVertical: calcWidth(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: calcHeight(25),
  },
  tabText: {
    fontSize: calcHeight(18),
    alignItems: 'center',
    textAlign: 'center',
    color: primaryWhite,
    marginLeft: calcWidth(5),
  },
  tabText2: {
    fontSize: calcHeight(18),
    alignItems: 'center',
    textAlign: 'center',
    color: primaryBlue,
    marginLeft: calcWidth(5),
  },
  packageTab: {
    paddingHorizontal: calcWidth(10),
    borderRadius: calcHeight(25),
    backgroundColor: primaryBlue,
    paddingVertical: calcHeight(10),
    width: '50%',
  },
  liveTab: {
    paddingHorizontal: calcWidth(10),
    borderRadius: calcHeight(25),
    paddingVertical: calcHeight(10),
    backgroundColor: '#E5F0FF',
    width: '50%',
  },
  tabBarIcon: {
    width: calcWidth(15),
    height: calcHeight(15),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    maxWidth: calcWidth(125),
  },
  switchSelectedText: {
    color: primaryBlue,
  },
});

export default style;
