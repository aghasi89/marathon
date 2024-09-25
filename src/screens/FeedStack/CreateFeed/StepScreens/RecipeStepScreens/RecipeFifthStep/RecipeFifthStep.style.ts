import {StyleSheet} from 'react-native';
import {
  lightPeriwinkle,
  primaryBlack,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer:{
    backgroundColor: primaryWhite,
    paddingBottom:calcHeight(50)
  },
  likesBarContainer: {
    borderBottomWidth: calcHeight(1),
    borderBottomColor: lightPeriwinkle,
  },
  titleContainer: {
    paddingHorizontal: calcWidth(20),
    marginVertical: calcHeight(17),
  },
  titleText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlack,
  },
  descriptionContainer: {
    paddingHorizontal: calcWidth(20),
  },
  descriptionText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  chipsContainer: {
    paddingVertical: calcWidth(16),
    justifyContent: 'center',
  },
  ingredientsContainer: {
    marginVertical: calcHeight(24),
    paddingHorizontal: calcWidth(16),
  },
  preparationContainer: {
    paddingHorizontal: calcWidth(16),
  },
  closeIconContainer: {
    position: 'absolute',
    right: 20,
    top: 40,
    alignItems: 'flex-end',
    justifyContent:'flex-end',
    height: calcHeight(30),
    width: calcWidth(30),
    zIndex: 1,
  },
  closeIcon: {
    height: calcHeight(20),
    width: calcWidth(20),
  },
});

export default styles;
