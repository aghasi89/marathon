import React, {useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Tab} from 'react-native-elements';
import {calcWidth} from '../../../assets/dimensions';
import {
  primaryBlue,
  primaryBlack,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import styles from './TabNavigation.styles';

type elementTypes = {
  title: string;
  icon?: any;
  selectedIcon?: any;
};
type Props = {
  data: elementTypes[];
  index: number;
  setIndex: (value: number) => void;
  isInvite?: boolean;
};
const TabNavigationHeader: React.FC<Props> = ({
  data,
  index,
  setIndex,
  isInvite,
}) => {
  const ref = useRef();
  const [position, setposition] = useState(0);
  const scrollWidth = useRef();
  return (
    <View style={styles.container}>
      <ScrollView
        ref={ref}
        nestedScrollEnabled
        onLayout={evt => {
          const {width} = evt.nativeEvent.layout;
          scrollWidth.current = width;
        }}
        horizontal
        onScroll={event => {
          setposition(event.nativeEvent.contentOffset.x);
        }}
        contentContainerStyle={[
          styles.contentContainer,
          {marginHorizontal: data.length == 2 ? calcWidth(50) : 0},
        ]}
        stickyHeaderIndices={[0]}
        showsHorizontalScrollIndicator={false}>
        <Tab
          value={index}
          onChange={value => {
            setIndex(value);
            ref.current.scrollTo({x: position});
          }}
          disableIndicator
          style={styles.tabs}>
          {data.map((page, id) => (
            <Tab.Item
              key={id}
              title={page.title}
              icon={index === id ? page.selectedIcon : page.icon}
              titleStyle={{
                color: index === id ? primaryBlue : primaryBlack,
              }}
              iconPosition={'left'}
              containerStyle={{
                flexDirection: 'row',
                backgroundColor: primaryWhite,
                borderBottomWidth: index === id ? 3 : 0,
                borderBottomColor: isInvite ? primaryWhite : primaryBlue,
              }}
            />
          ))}
        </Tab>
      </ScrollView>
    </View>
  );
};

export default TabNavigationHeader;
