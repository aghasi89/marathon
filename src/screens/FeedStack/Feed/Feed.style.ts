import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlack, primaryBlue, primaryGrey, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingBottom: calcHeight(60)
  },
  tabBar: {
    marginHorizontal: calcWidth(16)
  },
  headerEmptyView: {
    height: calcHeight(65)
  },
  tabBarIcon: {
    height: calcHeight(20),
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
    height: calcHeight(12),
    width: calcWidth(12),
    fill: primaryBlack,
  },
  createPublicationCard: {
    marginVertical: calcHeight(24)
  },
  emptyView: {
    paddingVertical: calcHeight(12)
  },
  header: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  listContainer: {
    paddingHorizontal: calcWidth(8),
    paddingBottom: calcHeight(30)
  },
  reportHeader: {
    textAlign: "center",
    color: primaryBlue,
    ...EnCodeSans({
      size: "form-field",
      weight: "bold"
    }),
  },
  reportQuestion: {
    color: primaryGrey,
    ...EnCodeSans({
      size: "body",
      weight: "bold"
    }),
    marginBottom: calcHeight(10)
  },
  reportItem: {
    paddingVertical: calcHeight(5),
  },
  reportItemText: {
    color: primaryBlack,
    ...EnCodeSans({
      size: "body",
      weight: "semibold"
    }),
  },
  wrapper: {
    paddingVertical: calcHeight(20),
    paddingHorizontal: calcWidth(15)
  },
  applyButton: {
    backgroundColor: primaryBlue,
    borderRadius: 8,
    borderWidth: calcHeight(2),
    borderColor: primaryBlue,
    paddingVertical: calcHeight(5)
  },
  reportInput: {
    marginBottom: calcHeight(10)
  }

});
export default styles;
