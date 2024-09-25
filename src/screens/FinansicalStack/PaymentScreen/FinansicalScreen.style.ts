import { Platform, StyleSheet } from 'react-native';
import { primaryBlue, primaryGrey, primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    marginLeft: calcWidth(17)
  },
  button: {
    backgroundColor: primaryBlue,
    marginHorizontal: calcWidth(50),
    paddingVertical: calcHeight(12),
    marginBottom: calcHeight(20)
  },
  filterText: {
    color: primaryGrey,
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    marginRight: calcWidth(30),
    marginLeft: calcWidth(10)
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: calcWidth(16)
  },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: calcHeight(10),
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(13),
    borderColor: primaryGrey,
    borderRadius: calcWidth(10),
    borderWidth: 1
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  emptyView: {
    width: calcWidth(15)
  },
  applyButton: {
    backgroundColor: primaryBlue,
    paddingVertical: calcHeight(12),
    marginTop: calcHeight(16),
  },
  datePickerContainer: {
    flexGrow: 1
  },
  emptyText: {
    textAlign: "center"
  },
  emptyContainer: {
    marginVertical: calcHeight(50)
  },
  contentStyle: {
    marginBottom: Platform.OS === "ios" ? calcHeight(150) : 0
  },
  commentInput: {
    borderRadius: calcHeight(50),
    height: calcHeight(50),
    width: "80%"
  },
  modalContent: {
    alignItems: "center"
  },
  labelStyle: {
    ...EnCodeSans({
      size: "body",
      weight: "regular"
    }),
  },
  plusIcon: {
    height: calcHeight(20),
    width: calcHeight(20),
    fill: primaryBlue
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
  title: {
    color: primaryBlue,
    ...EnCodeSans({
      size: "form-field",
      weight: "bold",
    }),
    alignItems: "center",
    marginBottom: calcHeight(15)
  }
});
export default styles;
