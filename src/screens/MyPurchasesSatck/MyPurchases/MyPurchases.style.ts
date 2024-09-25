import { StyleSheet } from 'react-native';
import { aliceBlue, primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  body: {
    flex: 1,
  },
  tabBarIcon: {
    height: calcHeight(20),
    width: calcWidth(22)
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBar: {
    marginHorizontal: calcWidth(16),
  },
  createButton: {
    width: calcWidth(60),
    height: calcWidth(60),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(24),
    borderWidth: calcHeight(2.5),
    borderColor: primaryBlue,
    borderRadius: calcHeight(60),
    backgroundColor: primaryWhite
  },
  plusIcon: {
    height: calcHeight(20),
    width: calcHeight(20),
    fill: primaryBlue
  },
  searchInputContainer: {
    marginHorizontal: calcWidth(16),
    backgroundColor: aliceBlue,
    borderWidth: 0,
    minHeight: calcHeight(45),
    marginVertical: calcHeight(10)
  },
  searchInput: {
    paddingLeft: calcWidth(10),
  },
  cardItemContainer: {
    marginLeft: calcWidth(16),
    marginVertical: calcWidth(16),
    borderRadius: calcWidth(16)
  },
  contentContainerStyle: {
    paddingBottom: calcHeight(20)
  }
});
export default styles;