import { StyleSheet } from 'react-native';
import {
  columbiaBlue,
  lightPeriwinkle,
  lightPeriwinkles,
  lightSteelBlue,
  platinum,
  primaryBlack,
  primaryBlue,
  primaryWhite,
  red,
  wildBlueYonder,
} from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: calcHeight(1),
    borderRadius: calcHeight(20),
    borderStyle: 'dashed',
    overflow: 'hidden',
    // maxHeight: calcHeight(400),
    // minHeight: calcHeight(220),
    width: "100%"

  },
  borderColor: {
    borderColor: platinum,
  },
  borderColorInvalid: {
    borderColor: red,
  },
  title: {
    //marginTop: calcHeight(30),
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: lightPeriwinkle,
    textAlign: "center"
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: primaryBlack,
    borderRadius: calcHeight(16),
  },
  inputContainer: {
    borderWidth: calcWidth(1),
    borderColor: columbiaBlue,
    borderRadius: calcHeight(16),
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: calcWidth(200),
    // marginBottom: calcHeight(30),
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
    width: "100%",
    borderWidth: 0
  },
  playerContainer: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  uploadedFileContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoPlayerCloseIconTouch: {
    height: calcHeight(50),
    width: calcWidth(50),
    position: 'absolute',
    zIndex: 1,
    top: calcHeight(22),
    right: calcWidth(-5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconTouch: {
    height: calcHeight(50),
    width: calcWidth(50),
    position: 'absolute',
    zIndex: 1,
    top: calcHeight(0),
    right: calcWidth(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    height: calcHeight(18),
    width: calcWidth(24),
    fill: wildBlueYonder,
  },
  listUploadButtonContainer:{
    borderRadius: calcWidth(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:calcWidth(1),
    borderStyle:'dashed',
    borderColor:lightPeriwinkles
  },
  listPlusIconContainer:{
    height:calcHeight(50),
    width:calcWidth(50),
    borderWidth:calcWidth(3),
    borderRadius:calcHeight(25),
    borderColor:primaryBlue,
    justifyContent:"center",
    alignItems:'center'
  },
  plusIcon:{
    height:calcHeight(25),
    width:calcWidth(25),
    fill:primaryBlue
  }
});

export default styles;
