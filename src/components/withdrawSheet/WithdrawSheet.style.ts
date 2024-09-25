import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { primaryBlue } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: Platform.OS == 'ios' ? calcHeight(270) : calcHeight(500),
    paddingBottom: Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
    marginTop: calcWidth(10),
    paddingHorizontal: calcHeight(10),
  },
  containerStyle: {
    paddingBottom: Platform.OS === 'ios' ? calcHeight(15) : calcHeight(50),
    justifyContent: 'space-between'
  },
  modalContent: {
    alignItems: "center"
  },
  labelStyle: {
    ...EnCodeSans({
      size: "body",
      weight: "regular"
    }),
    marginTop: calcHeight(10)
  },
  title: {
    color: primaryBlue,
    ...EnCodeSans({
      size: "form-field",
      weight: "bold",
    }),
    alignItems: "center",
    marginVertical: calcHeight(15)
  },
  emptyView: {
    width: calcWidth(15)
  },
  applyButton: {
    backgroundColor: primaryBlue,
    paddingVertical: calcHeight(12),
    marginTop: calcHeight(30),
    marginBottom: calcHeight(80),
    width: "80%"
  },
  commentInput: {
    borderRadius: calcHeight(50),
    height: calcHeight(50),
    width: "80%"
  },
});

export default styles;
