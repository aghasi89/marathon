import {StyleSheet} from 'react-native';
import {
  primaryWhite,
  primaryBlack,
  backgroundGrey,
  inputBorder,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 30, type: 'default'}),
    height: 85,
    backgroundColor: primaryWhite,
    width: '100%',
    flexDirection: 'row',
    paddingRight: 5,
    paddingLeft: 13,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  closeButton: {
    height: 65,
    width: 40,
    alignItems: 'center',
    paddingTop: 12,
  },
  imageContainer: {
    width: 55,
    height: 55,
    backgroundColor: backgroundGrey,
    marginTop: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginTop: 10,
    width: '70%',
  },
  fileNameText: {
    ...EnCodeSans({size: 'body', weight: 'medium'}),
    color: primaryBlack,
    maxWidth: 300,
  },
  fileTypeText: {
    ...EnCodeSans({size: 'little', weight: 'medium'}),
    color: inputBorder,
    marginTop: 5,
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 30,
  },
});
export default styles;
