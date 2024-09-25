import { StyleSheet } from 'react-native';
import { primaryBlack, primaryWhite } from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  cardStyle: {
    marginBottom: calcHeight(24)
  },
  cardContainer:{
    marginHorizontal:calcWidth(8),
    marginBottom:calcHeight(16)
  },
  followButtonText:{
    ...EnCodeSans({
      size: 'legal',
      weight: "regular"
  }),
  color: primaryWhite
  },
  cardHeaderText:{
    ...EnCodeSans({
      size: 'legal',
      weight: "regular"
  }),
  color: primaryBlack
  },
  statusText:{
    ...EnCodeSans({
      size: 'little',
      weight: "regular"
  }),
  color: primaryBlack
  },
  coachCardContainer:{
    width:'100%',
    alignItems:'center'
  }
});
export default styles;
