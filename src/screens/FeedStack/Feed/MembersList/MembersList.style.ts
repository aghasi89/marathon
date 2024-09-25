import {StyleSheet} from 'react-native';
import {lightPeriwinkle, primaryBlack, primaryWhite} from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:primaryWhite
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  headerContainer:{
    marginVertical:calcHeight(22)
  },
  headerIconStyle:{
    height:calcHeight(27),
    width:calcWidth(18),
    fill:primaryBlack
  },
  scrollContainer:{
    height:'100%'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: calcWidth(16),
    marginBottom:calcHeight(16)
  },
  detailsTouchContainer: {
    width: calcWidth(50),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  emptyListContainer:{
    marginTop:calcHeight(250),
    alignItems:'center'
  },
  emptyListText:{
    ...EnCodeSans({
        weight:'semibold',
        size:'body'
    }),
    color: lightPeriwinkle,
  }
});
export default styles;
