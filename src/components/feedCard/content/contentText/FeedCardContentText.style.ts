import {StyleSheet} from 'react-native';
import { inputBorder, primaryBlack } from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    marginVertical:calcHeight(10),
    marginRight:calcWidth(16)
  },
  descriptionText:{
    ...EnCodeSans({
        size:'legal',
        weight:'semibold'
    }),
    color:primaryBlack,
    flexWrap:'wrap',
    marginLeft:calcWidth(16),
    marginBottom:calcHeight(10)
  },
  hashtagsListContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom:calcHeight(10)
  },
  hashtagTouchContainer:{
    marginLeft:calcWidth(16)
  },
  hashtagText:{
    ...EnCodeSans({
        size:'legal',
        weight:'regular'
    }),
    color:inputBorder
  },
  seeMoreContainer:{
    paddingHorizontal:calcWidth(16),
    flex:1,
    alignItems:'flex-end'
  }
});

export default styles;
