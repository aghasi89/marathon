import { useCallback, useEffect, useState, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NavigationParamList } from '../../../../navigation/ChatNavigation';
import { getCoachFeeds, setCoachFeeds } from '../../../../store/actions/feed-action';
import { coachFeedSelector } from '../../../../store/selectors/feed-selector';
import { profileSelector } from '../../../../store/selectors/profile-selector';
import { useAppContext } from '../../AppContext';

type Props = NativeStackScreenProps<NavigationParamList, "CHANNELLIST">;

export default () => {
  const { t } = useTranslation();
  const { channel } = useAppContext();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const { newgroup } = route?.params!
  const [isGroupFromPack, setIsGroupFromPack] = useState<boolean>(false)
  const [isChannelFromPack, setIsChannelFromPack] = useState<boolean>(false)
  const [selectedSwitch, setSelectedSwitch] = useState<'packages' | 'lives'>(
    "packages",);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'finished'|"inprogress">(
    "upcoming",);
  const coachFeeds = useSelector(coachFeedSelector)
  const user = useSelector(profileSelector)

  useEffect(() => {
    const feedType = `${selectedTab}_${selectedSwitch}`;
    dispatch(getCoachFeeds({
      id: user?.id,
      feedType: feedType
    }))
  }, [selectedTab, selectedSwitch])

  const handleTabPress = useCallback((selected: 'upcoming' | 'finished'|'inprogress') => {
    dispatch(setCoachFeeds(undefined))
    setSelectedTab(selected)
  }, [selectedTab])

  const handleSwitchSelect = useCallback(
    (selected: "packages" | "lives") => {
      dispatch(setCoachFeeds(undefined))
      setSelectedSwitch(selected);
    },
    [selectedSwitch])

  useEffect(() => {
    newgroup ? setIsGroupFromPack(true) : setIsChannelFromPack(true)
  }, [isGroupFromPack, isChannelFromPack])

  const handlerGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handlerCreateChannel = useCallback((feedID: number) => {
    //@ts-ignore
    navigation.navigate("ADDMEMBERS", { feedID, isGroupFromPack, isChannelFromPack, isNewCreating: true })
  }, [isGroupFromPack, navigation])

  return {
    t,
    dispatch,
    navigation,
    channel,
    selectedSwitch,
    selectedTab,
    coachFeeds,
    handleSwitchSelect,
    handleTabPress,
    handlerCreateChannel,
    handlerGoBack

  };
};