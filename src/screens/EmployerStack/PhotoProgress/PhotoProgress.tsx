import React from 'react';
import {View,ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../assets/icons/svg/index';
import {primaryBlack} from '../../../assets/styles/colors.styles';
import { PhotoProgressCard } from '../../../components/photoProgressCard/PhotoProgressCard';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import OutLineButton from '../../../components/buttons/outline/OutLineButton';
import TextInputComponent from '../../../components/textInput/TextInputComponent';
import ProgramDays from '../../../components/programDays/ProgramDays';
import Toaster from '../../../components/toester/Toester';
import {PrimeryButton} from '../../../components/buttons';
import {EmployerNavigationParamList} from '..';
import hook from './PhotoProgress-hook';
import styles from './PhotoProgress.style';

type Props = NativeStackScreenProps<
  EmployerNavigationParamList,
  'PhotoProgress'
>;

const PhotoProgress: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    leftIconPress,
    days,
    dayIndex,
    handleUploadButtonClick,
    isVisibleSwiper,
    onAddImage,
    images,
    addComent,
    commentsList,
    onChangeCommentText,
    deleteComment,
    onToasterClose,
    onChartIconPress,
  } = hook(navigation);
  const renderItems = [
    {
      title: 'Front',
      image:images?.front
    },
    {
      title: 'Back',
      image:  images?.back,
    },
    {
      title: 'Side',
      image: images?.side
    },
  ];
  
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Photo Progress'}
        leftComponentStyle={styles.leftComponentStyle}
        leftComponent={
          <View style={styles.leftCompomemtContainer}>
            <Icons.ChartBlack style={styles.iconStyle} onPress={onChartIconPress} />
            <Icons.EllipsisIcon
              fill={primaryBlack}
              style={styles.iconStyle}
              onPress={() => {}}
            />
          </View>
        }
      />
      <ProgramDays days={days} dayIndex={dayIndex} />
      <ScrollView>
        {renderItems.map((item, index) => {
          return (
            <PhotoProgressCard
            images={item.image}
            titleText={item.title}
            key={index}
            onImagePress={()=>onAddImage(item.title)}
            defaultIconType={item.title.toLocaleLowerCase()}
            />
          );
        })}
        <View style={styles.commentsContainer}>
          {commentsList.map((comment, index) => {
            return (
              <View key={index} style={styles.comment}>
                <TextInputComponent
                  value={comment}
                  onChangetext={text => onChangeCommentText(text, index)}
                  rightIcon={true}
                  close={() => deleteComment(index)}
                />
              </View>
            );
          })}
          <View style={styles.commentsButtonContainer}>
            <OutLineButton
              style={styles.commentsButton}
              Icon={
                <Icons.Comment
                  fill={primaryBlack}
                  {...styles.commentsButtonIcon}
                />
              }
              title="Add Comment"
              onPress={addComent}
            />
          </View>
        </View>
      </ScrollView>
      <Toaster
        height={200}
        isVisible={isVisibleSwiper}
        onClose={onToasterClose}
        Screen={
          <View style={styles.toasterScreen}>
            <PrimeryButton
              title="Camera"
              type="default"
              onPress={() => {
                handleUploadButtonClick('camera');
              }}
              style={styles.toasterButton}
              Icon={<Icons.Image />}
            />
            <PrimeryButton
              title="Library"
              type="default"
              onPress={() => {
                handleUploadButtonClick('library');
              }}
              style={styles.toasterButton}
              Icon={<Icons.Image />}
            />
          </View>
        }
      />
    </View>
  );
};
export default PhotoProgress;
