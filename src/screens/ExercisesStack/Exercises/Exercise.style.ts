import { StyleSheet } from 'react-native';
import { aliceBlue, primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingBottom: calcHeight(120)
  },
  createButton: {
    width: calcWidth(60),
    height: calcWidth(60),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(24),
    borderWidth: calcHeight(1.5),
    borderColor: primaryBlue,
    borderRadius: calcHeight(60),
    backgroundColor: primaryWhite
  },
  exerciseItemContainer: {
    marginVertical: calcHeight(8)
  },
  cardItemContainer: {
    marginHorizontal: calcWidth(8),
    marginVertical: calcWidth(16),
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
  },
  searchInput: {
    paddingLeft: calcWidth(10),
  },
  threeDots: {
    padding: calcWidth(16)
  },
  scrollContainer: {
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(60),
    flex: 1
  },
  row: {
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  emptyText: {
    textAlign: "center",
    width: "100%",
    marginTop: calcHeight(30)
  }
});
export default styles;
