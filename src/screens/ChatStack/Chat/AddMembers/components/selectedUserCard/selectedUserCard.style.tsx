import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {lightChatBlue, primaryWhite} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightChatBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: calcHeight(4),
    paddingLeft: calcWidth(4),
    paddingRight: calcWidth(8),
    borderRadius: calcHeight(5),
    marginRight: calcWidth(8),
  },
  lastContainer: {
    backgroundColor: lightChatBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: calcHeight(4),
    paddingLeft: calcWidth(4),
    paddingRight: calcWidth(8),
    borderRadius: calcHeight(5),
  },
  userAvatar: {
    width: calcWidth(24),
    height: calcHeight(24),
    borderRadius: calcHeight(24),
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: primaryWhite,
    paddingLeft: calcWidth(4),
  },
});
export default styles;
