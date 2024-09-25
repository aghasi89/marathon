import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import { chatBarBack, chatSearchBorder, primaryBlack, primaryWhite, red } from '../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  chatContainer: {
    backgroundColor: primaryWhite,
  },
  swipeDeleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: calcWidth(40),
    marginBottom: calcHeight(16),
    backgroundColor: red
  },
  name: {
    width: "90%",
    fontSize: 18,
    fontWeight: "400",
    color: primaryBlack,
  },
  chatIcon: {
    marginRight: calcWidth(4)
  },
  lastMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    width: "85%",
    fontSize: 14,
    fontWeight: "400",
    color: chatSearchBorder,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "400",
    color: chatSearchBorder,
    marginLeft: calcWidth(8)
  },
  assistantItemContainer: {
    flexDirection: "column", 
    marginHorizontal: calcWidth(16),
    marginBottom: calcHeight(16),
    paddingBottom: calcHeight(16),
    backgroundColor: primaryWhite,
    borderBottomColor: chatBarBack,
    borderBottomWidth: 1
  },
  assistantHeader: {
    flexDirection: "row",
    alignItems: "center"
  }
});
export default styles;
