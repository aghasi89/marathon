import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  formFieldGrey,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingHorizontal: calcWidth(20),
    paddingBottom: calcHeight(15),
  },
  headerWithImageContainer: {
    height: calcHeight(300),
    width: '100%',
  },
  title: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'body',
    }),
    color: formFieldGrey,
    marginLeft: calcWidth(10),
    marginBottom: calcHeight(5),
  },
  numberInputContainer: {
    width: calcWidth(85),
  },
  dropDownContainer: {
    width: calcWidth(200),
  },
  save: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'form-field',
    }),
    color: formFieldGrey,
    marginRight: calcWidth(15),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: calcHeight(50),
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: calcHeight(18),
  },
  recipeName: {
    marginVertical: calcHeight(20),
  },
  plusIcon: {
    marginRight: calcWidth(10),
  },
  selectedTags: {
    width: '100%',
    marginTop: calcHeight(30),
  },
  typeHere: {
    marginVertical: calcHeight(20),
  },
});
export default styles;
