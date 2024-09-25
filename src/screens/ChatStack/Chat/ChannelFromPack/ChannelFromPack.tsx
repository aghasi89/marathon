import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
//@ts-ignore
import SwitchSelector from 'react-native-switch-selector';
import moment from 'moment';
import CreatePackTab from './components/CreatePackTab/CreatePackTab';
import PackCard from '../../../../components/packCard/packCard';
import { downloadMediaFromBunny } from '../../../../utils/bunny.net';
import { calcHeight } from '../../../../assets/dimensions';
import {
  aliceBlueBackground,
  primaryBlue,
  primaryWhite,
  red,
} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import videoLink from '../../../../utils/videoLink';
import styles from './ChannelFromPack.style';
import ChannelFromPackHook from './ChannelFromPack-hook';

const ChannelFromPack: React.FC = () => {
  const {
    t,
    selectedTab,
    coachFeeds,
    handleTabPress,
    handlerCreateChannel,
    handleSwitchSelect,
    handlerGoBack,
  } = ChannelFromPackHook();
  const usersCountSwitchOptions = [
    {
      label: t('packages'),
      value: 'package',
      customIcon: (
        <Icons.FeedCardPacksIcon fill={primaryWhite} {...styles.iconStyle} />
      ),
    },
    {
      label: t('lives'),
      value: 'lives',
      customIcon: <Icons.Live fill={red} {...styles.iconStyle} />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handlerGoBack}
          style={styles.backIconContainer}>
          <Icons.ArrowIcon fill={primaryBlue} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t(`createGroup`)}</Text>
        <View />
      </View>
      <SwitchSelector
        onPress={handleSwitchSelect}
        options={usersCountSwitchOptions}
        buttonColor={primaryBlue}
        backgroundColor={'#E5F0FF'}
        borderColor={aliceBlueBackground}
        textColor={primaryBlue}
        height={calcHeight(35)}
        fontSize={calcHeight(16)}
        style={styles.switchContainer}
        initial={0}
        selectedTextStyle={styles.switchSelectedText}
      />
      <CreatePackTab activeTab={selectedTab} handleTabPress={handleTabPress} />
      <View style={styles.middleContainer}>
        {coachFeeds ? coachFeeds.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.flatlist}
            numColumns={2}
            data={coachFeeds}
            renderItem={({ item }) => (
              <PackCard
                key={item?.feed?.id}
                isFinished={item?.is_finished}
                members={item?.members.length}
                price={item?.price}
                onPress={() => {
                  handlerCreateChannel(item?.feed?.id);
                }}
                title={item?.feed?.title ?? ''}
                type={item?.type ?? t(`group`)}
                userCount={item?.user_count}
                startDate={moment(item.start_day).format('DD MMMM')}
                imageUrl={
                  item?.feed?.media[0]?.type === 'videoLink'
                    ? videoLink(item?.feed?.media[0]?.url)
                    : item?.feed?.media[0].type === 'video'
                      ? downloadMediaFromBunny({
                        public_key: item?.feed?.media[0].url,
                        mediaType: item?.feed?.media[0].type,
                        userDir: item?.feed?.creator,
                        imageDir: 'feed',
                      })?.thumbnailURL
                      : downloadMediaFromBunny({
                        public_key: item?.feed?.media[0].url,
                        mediaType: item?.feed?.media[0].type,
                        userDir: item?.feed?.creator,
                        imageDir: 'feed',
                      })?.url
                }
              />
            )}
            keyExtractor={(item, index) => `${index}_${Date.now()}`}
          />
        ) : (
          <Text style={{ textAlign: "center" }}>{t('noResultsFound')}</Text>
        ) : (
          <ActivityIndicator style={{ flex: 1 }} size={30} color={primaryBlue} />
        )}
      </View>
    </View>
  );
};

export default ChannelFromPack;
