import { StyleSheet } from 'react-native';
import {
  columbiaBlue,
  lightPeriwinkle,
  lightSteelBlue,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../../../assets/dimensions';
import { EnCodeSans } from '../../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  inputContainer: {
    borderWidth: calcWidth(1),
    borderColor: columbiaBlue,
    borderRadius: calcHeight(16),
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: calcWidth(200),
    width: "50%",
    marginTop: calcHeight(10)
  },
  youtubeIcon: {
    width: calcWidth(25),
    height: calcHeight(12),
    fill: lightSteelBlue,
    marginHorizontal: calcWidth(10),
  },
  input: {
    marginRight: calcWidth(10),
    paddingVertical: calcHeight(7),
    borderWidth: 0
  },
  playerContainer: {
    width: '100%',
    minHeight: calcHeight(220)
  },
  contentContainer: {
    flex: 1,
    marginVertical: calcHeight(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcWidth(24),
    borderRadius: calcHeight(15),
    marginVertical: calcHeight(12),
    justifyContent: 'center'
  },
  buttonIcon: {
    height: calcHeight(16),
    width: calcWidth(16),
    marginRight: calcWidth(7),
    fill: primaryBlue,
  },
  buttonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlue,
    // marginVertical: calcHeight(8),
  },
  uploadedFileContainer: {
    width: '100%',
    flex: 1,
    minHeight: calcHeight(220),
  },
  title: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: lightPeriwinkle,
    textAlign: "center"
  },
});

export default styles;
