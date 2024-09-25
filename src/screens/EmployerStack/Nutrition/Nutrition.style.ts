import {StyleSheet} from 'react-native';
import {
  backgroudLightGreen,
  primaryBlack,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingBottom: calcHeight(260),
  },
  leftComponentStyle: {
    paddingRight: calcWidth(35),
  },
  leftCompomemtContainer:{
    flexDirection:'row',
    alignItems:'center',
    flex:1,
    width:calcWidth(90)
  },
  iconStyle: {
    marginRight: calcWidth(23),
  },
  caloriesContainer: {
    width: '100%',
    height: calcHeight(80),
    marginTop: calcHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroudLightGreen,
    paddingHorizontal: calcWidth(20),
  },
  calories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  caloryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caloryCount: {
    marginHorizontal: calcWidth(6),
  },
  progressStyle: {
    height: calcHeight(37),
    width: calcWidth(37),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'body',
    }),
    color: primaryBlack,
    textAlign: 'center',
  },
  totalContainer: {
    height: calcHeight(60),
    backgroundColor: backgroudLightGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(23),
  },
  totalText: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'headline',
    }),
    color: primaryBlack,
  },
  totalKcal: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'form-field',
    }),
  },
  totalKcalContainer: {
    flexDirection: 'row',
    width: calcWidth(200),
    justifyContent: 'flex-end',
    
  },
  mealContainer: {
    flexDirection:'row',
  },
  foodsContainer:{
    paddingLeft:calcWidth(20)
  },
  mealItem: {
    marginVertical: calcHeight(17),
    marginLeft:calcWidth(18),
    marginRight:calcWidth(4)
  },
});

export default styles;
