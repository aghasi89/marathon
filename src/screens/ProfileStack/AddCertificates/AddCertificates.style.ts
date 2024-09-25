import { StyleSheet } from 'react-native';
import { primaryBlue, primaryWhite, workoutBlue } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingBottom: calcHeight(80)
  },
  body: {
    flex: 1,
    paddingHorizontal: calcWidth(16),
    justifyContent: "space-between",
  },
  addContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    borderWidth: 1,
    borderColor: primaryBlue,
    borderRadius: calcHeight(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcWidth(24),
    marginVertical: calcHeight(12),
    justifyContent: 'center',
    maxWidth: '65%',
    // minWidth: '65%'
  },
  addIcon: {
    height: calcHeight(12),
    width: calcWidth(12),
    marginRight: calcWidth(7),
    fill: primaryBlue,
  },
  addText: {
    color: primaryBlue,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "700"
  },
  saveContainer: {
    backgroundColor: primaryBlue,
    borderRadius: calcHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    color: workoutBlue,
    paddingVertical: calcHeight(10),
    fontSize: 17,
    fontWeight: "500"
  },
  sheetButtons: {
    flexDirection: "row",
    alignItems: "center"
  },
  sheetButtonText: {
    marginLeft: calcWidth(20)
  },
  emptyView: {
    marginTop: calcHeight(20)
  },
  shhetContainer: {
    flex: 1,
    width: "90%"
  },
  loading: {
    flex: 1,
    backgroundColor: "white"
  }
});
export default styles;