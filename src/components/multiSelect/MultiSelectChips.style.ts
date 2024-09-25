import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { borderGrey, primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { borderStyle } from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: calcWidth(14),
    justifyContent: "space-around"
  },
  chipContainer: {
    borderRadius: 29,
    borderWidth: 1,
    borderColor: borderGrey,
    marginBottom: calcHeight(17),
  },
  text: {
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(11),
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold'
    }),
  },
  shadowContainer: {
    ...borderStyle({
      size: 30,
      type: "default"
    }),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:primaryWhite,
    paddingRight: calcWidth(15),
    paddingVertical: calcHeight(9),
    paddingLeft: calcWidth(21),
    marginLeft:calcWidth(10),
    marginBottom:calcHeight(7)

  },
  selectedText: {
    color: primaryBlue,
  
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold'
    }),
    marginRight:calcWidth(19)
  },
  containerSelected:{
    flexDirection: "row",
    flexWrap: "wrap",
  }

});
export default styles;
