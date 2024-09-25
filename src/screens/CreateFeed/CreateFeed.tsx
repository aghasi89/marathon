import React from 'react';
import {View} from 'react-native';
import Icons from '../../assets/icons/svg'
import MultiSelectModal from '../FeedStack/CreateFeed/components/MultiSelectModal/MultiSelectModal';
import { calcHeight } from '../../assets/dimensions';
import {IFeedMultiItem} from '../../types/types';
import CreateFeedHook from './CreatedFeed-hook';
import styles from './CreateFeed.style';

const CreateFeedScreen: React.FC = () => {
  const {t, handleCreateFeed, modalCloseHandle, modalVisbility, user} =
    CreateFeedHook();
  const createFeedList: IFeedMultiItem[] = [
    {
      id: 0,
      name: t('assistant') ?? '',
      code: 'assistant',
      icon: <Icons.AssistantInChannel {...styles.icons} />,
    },
    {
      id: 1,
      name: t('package') ?? '',
      code: 'package',
      isSelected: user?.role_mode === 'coach',
      icon: <Icons.FeedCardPacksIcon {...styles.icons} />,
    },
    {
      id: 2,
      name: t('article') ?? '',
      code: 'article',
      icon: <Icons.Article {...styles.icons} />,
    },
    {
      id: 3,
      name: t('recipes') ?? '',
      code: 'recipe',
      icon: <Icons.Recipe {...styles.icons} />,
    },
    {
      id: 4,
      name: t('live') ?? '',
      code: 'live',
      isSelected: user?.role_mode === 'coach',
      icon: <Icons.LiveIcon {...styles.icons} />,
    },
    {
      id: 5,
      name: t('workout') ?? '',
      code: 'workout',
      isSelected: user?.role_mode === 'coach',
      icon: <Icons.Dumbbells {...styles.icons} />,
    },
    {
      id: 5,
      name: t('publication') ?? '',
      code: 'basic',
      icon: <Icons.BasicPublicationIcon {...styles.icons} />,
    },
  ];
  return (
    <View style={styles.container}>
      <MultiSelectModal
        height={calcHeight(520)}
        isVisible={modalVisbility}
        onClose={modalCloseHandle}
        onSelect={handleCreateFeed}
        dataList={createFeedList}
        selectedList={[]}
      />
    </View>
  );
};

export default CreateFeedScreen;
