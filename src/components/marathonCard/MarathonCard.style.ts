import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  backgroudLightGrey,
  formFieldGrey,
  green,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 25, type: 'default'}),
    width: '100%',
    backgroundColor: primaryWhite,
    marginBottom: calcHeight(11),
  },
  titleText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  greyTitleText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: formFieldGrey,
  },
  titleText1: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(7),
  },
  image: {
    width: calcWidth(97),
    borderTopRightRadius: calcHeight(25),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: calcWidth(18),
    paddingTop: calcHeight(2),
  },
  textStyle: {
    color: formFieldGrey,
  },

  bottomSheet: {
    borderTopWidth: 1,
    borderColor: backgroudLightGrey,
    flexDirection: 'row',
    paddingVertical: calcHeight(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: calcHeight(8),
  },
  marginPrice: {
    marginLeft: calcWidth(21),
  },
  infoTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: calcHeight(10),
  },
  marginTime: {
    marginLeft: calcWidth(24),
  },
  marginTag: {
    marginHorizontal: calcWidth(11),
  },
  titleMargin: {
    marginTop: calcHeight(20),
  },
  content: {
    flex: 1,
  },
});
export default styles;
