import {StyleSheet} from 'react-native';
import {
  assistantMessageBlack,
  boldBlack,
  darkWhite,
  ghostWhite,
  midGray,
  platinum,
  primaryBlack,
  primaryBlue,
  primaryWhite,
  red,
  robinEggBlue,
  textLightGray,
} from '../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {borderStyle} from '../../../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: primaryWhite,
  },
  messageContainer: {
    flex: 1,
    // alignItems: "flex-start",
    backgroundColor: darkWhite,
    paddingHorizontal: calcWidth(16),
    // marginBottom: calcHeight(30)
  },
  messageListContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  newMessageContainer: {
    flex: 1,
    backgroundColor: darkWhite,
    alignItems: 'center',
    paddingHorizontal: calcWidth(16),
  },
  bigAssistantIcon: {
    marginTop: calcHeight(32),
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: boldBlack,
    marginBottom: calcHeight(4),
  },
  assistantDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: textLightGray,
    lineHeight: 24,
    textAlign: 'center',
  },
  taskHelpText: {
    fontSize: 14,
    fontWeight: '500',
    color: textLightGray,
    marginTop: calcHeight(60),
    marginBottom: calcHeight(16),
  },
  taskItem: {
    width: '100%',
    backgroundColor: primaryWhite,
    borderWidth: 1,
    borderColor: robinEggBlue,
    borderRadius: 8,
    marginBottom: calcHeight(8),
  },
  taskItemButton: {
    padding: 16,
  },
  taskText: {
    fontSize: 12,
    fontWeight: '200',
    color: primaryBlack,
    lineHeight: 14,
  },
  editIcon: {
    height: calcHeight(23),
    width: calcWidth(23),
    marginLeft: calcWidth(10),
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryBlue,
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalButtons: {
    paddingHorizontal: calcWidth(30),
  },
  modal: {
    paddingVertical: calcHeight(15),
    justifyContent: 'space-between',
  },
  messageModal: {
    flexDirection: 'row',
    borderRadius: calcHeight(10),
    backgroundColor: primaryWhite,
    paddingTop: calcHeight(10),
    paddingBottom: calcHeight(10),
    paddingLeft: calcWidth(14),
    paddingRight: calcWidth(46),
    maxHeight: calcHeight(400)
  },
  messageSettingsModal: {
    width: "75%",
    borderRadius: calcHeight(10),
    backgroundColor: platinum,
    marginTop: calcHeight(13)
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: calcHeight(10),
    paddingBottom: calcHeight(10),
    paddingLeft: calcWidth(30),
    paddingRight: calcWidth(20),
    borderBottomWidth: 0.2,
    height: calcHeight(45)
  },
  settingDelItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: calcHeight(10),
    paddingBottom: calcHeight(10),
    paddingLeft: calcWidth(30),
    paddingRight: calcWidth(26),
    height: calcHeight(45),
  },
  settingText: {
    fontSize: 14,
    fontWeight: '600',
    color: assistantMessageBlack,
  },
  settingDelText: {
    fontSize: 14,
    fontWeight: '600',
    color: red,
  },
  userAvatar: {
    width: calcHeight(28),
    height: calcHeight(28),
    borderRadius: calcHeight(21),
    resizeMode: 'center',
    marginRight: calcWidth(4),
  },
  messageSettingsIcon: {
    width: calcHeight(28),
    height: calcHeight(28),
    borderRadius: calcHeight(21),
    resizeMode: 'center',
    marginRight: calcWidth(8),
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '400',
    color: assistantMessageBlack,
    lineHeight: 21,
  }
});
export default styles;
