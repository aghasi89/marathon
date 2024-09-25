import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import HeaderWithUserInfo from '../../../../components/headers/headerWithUserInfo/HeaderWithUserInfo';
import Icons from '../../../../assets/icons/svg';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import SectionTitle from '../../CreateFeed/components/SectionTitle/SectionTitle';
import hook from './MemberDetails.hook';
import styles from './MemberDetails.style';

const MemberDetails: React.FC = () => {
  const {t, backIconPressHandle, selectedMember, dataList} = hook();
  return (
    <View style={styles.container}>
      <HeaderWithUserInfo
        leftIcon={true}
        imageAlt={<Icons.AltImageIcon />}
        image={
          selectedMember?.user.image
            ? downloadMediaFromBunny({
                public_key: selectedMember?.user?.image,
                mediaType: 'image',
                userDir: selectedMember?.user?.id,
                imageDir: 'profile',
              })?.url
            : ''
        }
        title={`${selectedMember?.user.user.first_name ?? ''} ${
          selectedMember?.user.user.last_name ?? ''
        }`}
        leftIconPress={backIconPressHandle}
      />
      <ScrollView overScrollMode="never" style={styles.scrollContainer}>
        <SectionTitle
          containerStyle={styles.sectionTitles}
          title={t('measurments')}
        />
        {dataList?.measurementData?.map(el => (
          <View style={styles.rowContainer}>
            <Text style={styles.measurementQuestionText}>{el.question}</Text>
            <Text style={styles.measurementAnswerText}>{el.answer}</Text>
          </View>
        ))}
        {!!dataList?.coachQuestionData?.length && (
          <>
            <SectionTitle
              containerStyle={styles.sectionTitles}
              title={t('questions')}
            />
            {dataList?.coachQuestionData?.map((el, index) => (
              <View key={index} style={styles.coachQuestionRowContainer}>
                <Text style={styles.coachQuestionText}>{el.question}</Text>
                <Text style={styles.coachQuestionanswerText}>{el.answer}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default MemberDetails;
