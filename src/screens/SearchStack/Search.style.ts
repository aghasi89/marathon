import { StyleSheet } from 'react-native';
import { lightPeriwinkles, primaryWhite } from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:primaryWhite
  },
  indicatorContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  tabBarContainer:{
    paddingTop:calcHeight(16),
    marginBottom:calcHeight(8)
  },
  tabBar: {
    marginHorizontal: calcWidth(16)
  },
  tabBarIcon: {
    height: calcHeight(20),
    width: calcWidth(22)
  },
  selectedFiltersContainer:{
    paddingBottom:calcHeight(16),
    marginTop:calcHeight(8)
  },
  emptyListContainer:{
    flex:1,
    alignItems:'center',
    marginTop:calcHeight(150)
  },
  emptyListText:{
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color:lightPeriwinkles
  }
});
export default styles;
