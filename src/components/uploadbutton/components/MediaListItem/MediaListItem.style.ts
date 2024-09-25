import {StyleSheet} from 'react-native';
import {
    primaryBlue,
    primaryWhite,
    robinEggBlue,
    robinEggBlueWithOpacity,
    workoutBlue,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: calcWidth(3),
  },
  cameraButton: {
    backgroundColor: workoutBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'semibold',
    }),
    marginTop: calcHeight(3),
    color: primaryBlue,
  },
  videoDurationConatainer: {
    position: 'absolute',
    right: calcWidth(5),
    bottom: calcHeight(5),
    paddingHorizontal: calcWidth(5),
    paddingVertical: calcHeight(3),
    borderRadius: calcHeight(10),
    backgroundColor: robinEggBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoDurationText: {
    ...EnCodeSans({
      size: 'subLittle',
      weight: 'regular',
    }),
    color: primaryWhite,
  },
  numberContainer:{
    position:'absolute',
    backgroundColor:robinEggBlueWithOpacity,
    zIndex:2,
    alignItems:'center',
    justifyContent:'center',
 
  },
  numberText: {
    ...EnCodeSans({
        size: 'headline2',
        weight: 'bold',
      }),
    color: primaryWhite,
  },
});
export default styles;
