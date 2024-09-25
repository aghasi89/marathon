import { StyleSheet } from 'react-native';
import { primaryBlack, primaryWhite, lightPeriwinkle } from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite
  },
  imageStyle: {
    width: '100%',
    height: calcHeight(400),
  },
  likesBarContainer: {
    borderBottomWidth: calcHeight(1),
    borderBottomColor: lightPeriwinkle
  },
  titleContainer: {
    paddingHorizontal: calcWidth(20),
    marginVertical: calcHeight(17)
  },
  titleText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold'
    }),
    color: primaryBlack
  },
  liveAndPackageInfoContainer: {
    marginHorizontal: calcWidth(16),
  },
  buttonsGroupContainer: {
    marginVertical: calcHeight(24)
  },
  hashtagsContainer: {
    paddingHorizontal: calcWidth(12),
  },
  descriptionContainer: {
    paddingTop: calcHeight(8),
    paddingHorizontal: calcWidth(20)
  },
  descriptionText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular'
    }),
    color: primaryBlack
  },
  inputContainer: {
    paddingHorizontal: calcWidth(10)
  },
  inputStyle: {
    marginVertical: calcHeight(22),
    borderWidth: calcWidth(1),
    borderRadius: calcWidth(50),
    borderColor: lightPeriwinkle
  },
  commentItemContainer: {
    paddingHorizontal: calcWidth(16)
  },
  threeDots: {
    padding: calcWidth(16)
  }
});
export default styles;
