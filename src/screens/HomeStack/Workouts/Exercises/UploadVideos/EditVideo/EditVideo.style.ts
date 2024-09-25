import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  formFieldGrey,
  lightGrayBorder,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  title: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'body',
    }),
    color: formFieldGrey,
    marginLeft: calcWidth(10),
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
    alignItems: 'center',
    marginHorizontal: calcWidth(25),
  },
  text: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'little',
    }),
    color: formFieldGrey,
    textAlign: 'center',
    marginBottom: calcHeight(8),
  },
  exerciseName: {
    marginTop: calcHeight(25),
    marginBottom: calcHeight(18),
  },
  icon: {
    marginHorizontal: calcWidth(10),
  },
  header: {
    flexDirection: 'row',
  },
  containerImage: {
    width: '100%',
    height: calcHeight(396),
    flexDirection: 'row',
    resizeMode: 'contain',
  },
  duration: {
    marginVertical: calcHeight(23),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: calcWidth(25),
  },
});
export default styles;
