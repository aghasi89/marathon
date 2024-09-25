import { StyleSheet } from 'react-native';
import { lightPeriwinkles, primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  body: {
    flex: 1,
  },
  emptyBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  createButton: {
    width: calcWidth(60),
    height: calcWidth(60),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(100),
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
  emptyView: {
    paddingHorizontal: calcWidth(17),
    marginBottom: calcHeight(40)
  },
  emptyText: {
    color: lightPeriwinkles,
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    fontStyle: "normal",
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shhetContainer: {
    flex: 1,
    width: "90%",
  },
  sheetButtons: {
    flexDirection: "row",
    alignItems: "center"
  },
  sheetButtonText: {
    marginLeft: calcWidth(20)
  },
  emptyToasterView: {
    marginTop: calcHeight(20)
  },
});
export default styles;