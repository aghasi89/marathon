import {StyleSheet} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  titleContainer: {
    marginTop: calcHeight(140),
    alignItems: 'center',
    paddingHorizontal:calcWidth(28)
  },
  titleText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
    color: primaryBlack,
    textAlign:'center'
  },
  buttonsGeneralContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: calcHeight(64),
  },
  buttonAndTitleContainer: {
    alignItems:'center'
  },
  buttonContainer: {
    marginBottom:calcHeight(16),
    marginHorizontal: calcWidth(14),
    backgroundColor:primaryWhite,
    shadowColor: primaryBlue,
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0,
    shadowRadius: 8.30,
    elevation: 13,
    borderRadius: calcHeight(10),
  },
  singleVideoButton: {
    paddingBottom: calcHeight(18),
    paddingTop: calcHeight(13),
    paddingHorizontal: calcWidth(12),
  },
  manyVideosButton: {
    paddingTop: calcHeight(12),
    paddingLeft: calcWidth(12),
    paddingBottom: calcHeight(13),
    paddingRight: calcWidth(24),
  },
  buttonTitleConatiner:{
    width:calcWidth(120),
    alignItems:'center'
  },
  buttonTitle: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'bold',
    }),
    color: primaryBlack,
    textAlign:'center'
  },
});
export default styles;