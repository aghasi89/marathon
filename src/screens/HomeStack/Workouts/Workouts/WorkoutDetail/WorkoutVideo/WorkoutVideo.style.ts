import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: calcWidth(10),
    marginTop: calcHeight(20),
  },
  headerWithImageContainer: {
    height: calcHeight(350),
    width: '100%',
  },
  title: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'form-field',
    }),
    color: primaryBlack,
  },
  chipsgroup: {
    height: calcHeight(60),
    marginVertical: calcHeight(15),
  },
  bottomStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: calcHeight(120),
    paddingTop: calcHeight(43),
  },
  bottomText: {
    color: '#589CFE',
    marginVertical: calcHeight(5),
  },
  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
  bottomBar: {
    position: 'absolute',
    width: '100%',
    bottom: calcHeight(2),
  },
  iconStyle: {
    paddingHorizontal: calcWidth(15),
  },
});
export default styles;
