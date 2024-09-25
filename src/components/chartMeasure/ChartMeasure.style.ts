import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: calcHeight(7),
    width: calcWidth(575),
    height: calcHeight(323),
  },
  chartArea: {
    flex: 1,
    marginHorizontal: calcWidth(30),
    marginBottom: calcHeight(25),
  },
  chart: {
    width: '100%',
    height: '100%',
  },
  xAxis: {
    marginHorizontal: calcWidth(10),
  },
  contentInsetChart: {
    top: calcHeight(111),
    bottom: calcHeight(95),
  },
  contentInsetAxis: {
    left: calcWidth(30),
    right: calcWidth(30),
  },
});

export default styles;
