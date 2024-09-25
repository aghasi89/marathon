import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {primaryBlack} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import Check from '../check/Check';
import styles from './RecentInfoCard.styles';
import { ITag } from '../../types/types';

type RecentInfoTypes = {
  title: string;
  imageUrl: string;
  count?: string;
  amount?: string;
  time?: string;
  saleType?: string;
  type?: string;
  tags?:Array<ITag>
};
type Props = {
  info: RecentInfoTypes;
  onLongPress?: () => void;
  onPress?: () => void;
  isDisabled?: boolean;
  isSubmited?: boolean;
  onPressCheck?: () => void;
  onClose?: () => void;
  isOnClose?: boolean;
  
};
const RecentInfoCard: React.FC<Props> = ({
  info,
  onLongPress,
  onPress,
  isDisabled,
  isSubmited,
  onPressCheck,
  onClose,
  isOnClose,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={onLongPress}
      disabled={onLongPress ? false : true}
      onPress={onPress}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.titleText}>{info.title}</Text>
          <Text style={[styles.titleText, styles.textStyle]}>
            {info.count ? info.count + '   ' : ''}
            <Text style={styles.greenText}>{info.amount}</Text>
          </Text>
        </View>
        <Image style={styles.image} source={{uri: info.imageUrl}}></Image>
        {isOnClose && (
          <TouchableOpacity style={styles.closeTouch} onPress={onClose}>
            <Icons.PlusX fill={primaryBlack} />
          </TouchableOpacity>
        )}
      </View>

      <View style={info.tags && info.tags.length>4?styles.bottomSheetTags:info.saleType ? styles.bottomSheet : styles.bottomSheet1}>
        {info.tags?
        info.tags.map((tag:ITag,index:number)=>{
          return index<4? <Text style={info.tags.length>4 ? styles.infoText : styles.infoText1} key ={index}>
          {index===3? "...":tag.title}
        </Text>:<></>
        })
        :<>
        <Text style={info.saleType ? styles.infoText : styles.infoText1}>
          {info.time}
        </Text>
        <Text style={info.saleType ? styles.infoText : styles.infoText1}>
          {info.type}
        </Text>
        </>}
        <Text style={styles.text}>{info.saleType}</Text>
      </View>
      <View style={styles.check}>
        {!isDisabled && (
          <Check
            isSubmited={isSubmited}
            onPress={() => {
              onPressCheck();
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
export default RecentInfoCard;
