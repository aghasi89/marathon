import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../../../../assets/dimensions';
import { primaryBlue, primaryWhite } from '../../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: calcWidth(320),
    height: calcHeight(350),
    resizeMode: 'contain',
    position: "absolute"
  },
  title: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    textAlign: "center",
    marginBottom: calcHeight(10)
  },
  outLineButton: {
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(8),
    maxHeight: calcHeight(50),
    marginRight: calcWidth(10),
    marginTop: calcHeight(10)
  },
  defaultButton: {
    backgroundColor: primaryBlue,
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(8),
    maxHeight: calcHeight(50),
    marginRight: calcWidth(10),
    marginTop: calcHeight(10)
  },
  musclesListContainer: {
    flex: 1,
    marginTop: calcHeight(350),
    marginHorizontal: calcHeight(16),
  },
  center: {
    alignItems: "center"
  },
  outLineButtonText: {
    color: primaryBlue
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: 'wrap'
  }
});
export default styles;
