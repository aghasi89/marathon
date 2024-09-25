import { StyleSheet } from 'react-native';
import { primaryBlack, primaryWhite } from '../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0
  },
  tapBarContainer: {
    marginTop: calcHeight(16)
  },
  tabBar: {
    marginHorizontal: calcWidth(16)
  },
  tabBarIcon: {
    height: calcHeight(22),
    width: calcWidth(22)
  },
  cardStyle: {
    marginBottom: calcHeight(24)
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionSheetIcon: {
    height: calcHeight(21),
    width: calcWidth(21),
    fill: primaryBlack,
  },
  listContainer: {
    paddingTop: calcHeight(16),
    backgroundColor: primaryWhite
  },
  emptyResultText: {
    textAlign: "center",
    marginTop: calcHeight(20)
  }
});
export default styles;
