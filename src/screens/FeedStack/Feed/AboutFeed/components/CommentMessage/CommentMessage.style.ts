import {StyleSheet} from 'react-native';
import {
  formFieldGrey,
  primaryBlack,
  primaryBlue,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: calcHeight(13),
  },
  leftContainer: {
    marginRight: calcWidth(11),
  },
  imageContainer: {
    height: calcHeight(40),
    width: calcWidth(40),
    borderRadius: calcHeight(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: calcHeight(40),
    width: calcWidth(40),
    borderRadius: calcHeight(20),
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
  },
  nameAndDateContainer: {
    flexDirection: 'row',
    marginBottom: calcHeight(2),
    alignItems:'flex-end'
  },
  userName: {
    ...EnCodeSans({
      size: 'body',
      weight: 'bold',
    }),
    color: primaryBlack,
    marginRight: calcWidth(15),
  },
  comentDate: {
    ...EnCodeSans({
      size: 'little',
      weight: 'regular',
    }),
    color: formFieldGrey,
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  moreInfoShowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  moreInfoShowtext: {
    color: primaryBlue,
  },
  footer: {
    flexDirection: 'row',
    marginTop: calcHeight(11),
    justifyContent: 'space-between',
  },
  likeAndReplyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyText: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'regular',
    }),
    color: primaryBlue,
    marginRight: calcWidth(27),
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    height: calcHeight(18),
    width: calcWidth(20),
    marginRight: calcWidth(13),
  },
});
export default style;
