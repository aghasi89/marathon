import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  lightPeriwinkles,
  primaryBlue,
  primaryWhite,
  transparentBlack,
} from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:transparentBlack,
    paddingHorizontal:calcWidth(16)
  },
  contentContainer: {
    paddingVertical: calcHeight(24),
    paddingHorizontal: calcWidth(32),
    backgroundColor: primaryWhite,
    borderRadius:calcHeight(32)
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: calcHeight(16),
  },
  titleText: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'bold',
    }),
    color: primaryBlue,
  },
  descriptionContainer: {
    marginBottom: calcHeight(24),
  },
  descriptionText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'bold',
    }),
    color: lightPeriwinkles,
    textAlign:'center'
  },
  submitButtonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    marginVertical:calcHeight(11),
    color: primaryWhite,
  },
  closeButton: {
    borderWidth: 0,
    marginTop: calcHeight(16),
  },
  closeButtonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlue,
  },
});

export default styles;
