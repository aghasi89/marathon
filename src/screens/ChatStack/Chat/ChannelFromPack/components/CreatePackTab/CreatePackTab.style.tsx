import { StyleSheet } from 'react-native';
import { calcHeight } from '../../../../../../assets/dimensions';
import {
  primaryBlue,
  wildBlueYonder,
} from '../../../../../../assets/styles/colors.styles';

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: calcHeight(1),
    borderBottomColor: wildBlueYonder,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: calcHeight(5),
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: primaryBlue,
  },
  tabText: {
    fontSize: calcHeight(15),
    fontWeight: 'bold',
    color: wildBlueYonder,
  },
  activeTabText: {
    color: primaryBlue,
  },
});

export default styles;
