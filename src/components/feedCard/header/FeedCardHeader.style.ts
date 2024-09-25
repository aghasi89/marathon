import { StyleSheet } from 'react-native';
import {
  lightPeriwinkle,
  plaster,
  primaryBlack,
  primaryBlue,
} from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: calcWidth(16),
    alignItems: 'center',
    borderTopLeftRadius: calcHeight(15),
    borderTopRightRadius: calcHeight(15)
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: calcHeight(30),
    width: calcWidth(30),
    borderRadius: calcHeight(15),
    marginRight: calcWidth(10),
    marginVertical: calcHeight(10),
  },
  userImage: {
    height: calcHeight(30),
    width: calcWidth(30),
    borderRadius: calcHeight(15),
    resizeMode: 'cover',
  },
  altIcon: {
    height: calcHeight(30),
    width: calcWidth(30),
  },
  userNameText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold',
    }),
    color: primaryBlack,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  followButtonStyle: {
    borderWidth: calcWidth(1),
    borderColor: primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButtonTextStyle: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'semibold',
    }),
    color: primaryBlue,
    marginHorizontal: calcWidth(16),
  },
  threeDotsIconTouch: {
    alignItems: 'flex-end',
    padding: calcWidth(16)
  },
  threeDotsIcon: {
    height: calcHeight(25),
    width: calcWidth(5),
    fill: lightPeriwinkle,
  },
});

export default styles;
