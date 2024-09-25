import React from 'react';
import {ScrollView, View} from 'react-native';
import {Circle, G, Path, Line} from 'react-native-svg';
import {AreaChart, XAxis} from 'react-native-svg-charts';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import styles from './ChartMeasure.style';

type Props = {
  data: Array<number>;
  dates: Array<string>;
};

const ChartMeasure: React.FC<Props> = props => {
  const {data, dates} = props;
  const Decorator = ({x, y, data}) => {
    return data.map((value, index) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke={primaryBlue}
        fill={primaryBlue}
      />
    ));
  };

  const CustomGrid = ({x, y, ticks}) => (
    <G>
      {
        // Horizontal grid
        ticks.map(tick => (
          <Line
            key={tick}
            x1="0%"
            x2="100%"
            y1={y(68)}
            y2={y(68)}
            stroke="rgba(0,0,0,0.10196078431372549)"
            strokeLinecap="round"
            strokeDasharray={4}
          />
        ))
      }
      {
        // Vertical grid
        data.map((_, index) => (
          <Line
            key={index.toString()}
            y1="0%"
            y2="100%"
            x1={x(index)}
            x2={x(index)}
            stroke="rgba(0,0,0,0.10196078431372549)"
            strokeLinecap="round"
            strokeDasharray={4}
          />
        ))
      }
    </G>
  );
  const Liner = ({line}) => (
    <Path d={line} stroke={primaryBlue} fill={'none'} />
  );
  const HorizontalLine = ({x, y}) => (
    <Line
      key={'zero-axis'}
      x1={x(2)}
      x2={x(5)}
      y1={y(64)}
      y2={y(64)}
      stroke={'rgba(0,0,0,0.10196078431372549)'}
      strokeDasharray={[4, 8]}
      strokeWidth={2}
    />
  );
  const Tooltip = ({x, y}) => (
    <G x={x(2)} key={'tooltip'}>
      <Circle
        cy={y(64.1)}
        r={18}
        stroke={primaryBlue}
        strokeWidth={2}
        fill={primaryWhite}
      />
    </G>
  );
  const TooltipSecond = ({x, y}) => (
    <G x={x(5)} key={'tooltip'}>
      <Circle
        cy={y(64.1)}
        r={18}
        stroke={primaryBlue}
        strokeWidth={2}
        fill={primaryWhite}
      />
    </G>
  );
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chartContainer}>
      <View style={styles.chart}>
        <AreaChart
          style={styles.chartArea}
          data={data}
          svg={{fill: 'rgba(88,156,254,0)'}}
          contentInset={styles.contentInsetChart}>
          <Liner />
          <CustomGrid />
          <Decorator />
          <Tooltip />
          <HorizontalLine />
          <TooltipSecond />
        </AreaChart>
        <XAxis
          style={styles.xAxis}
          data={data}
          formatLabel={value => `${data[value]} kg`}
          contentInset={styles.contentInsetAxis}
          svg={{fontSize: 16, fill: primaryBlack}}
        />
        <XAxis
          style={styles.xAxis}
          data={dates}
          formatLabel={value => `${dates[value]}`}
          contentInset={styles.contentInsetAxis}
          svg={{fontSize: 12, fill: primaryBlack}}
        />
      </View>
    </ScrollView>
  );
};

export default ChartMeasure;
