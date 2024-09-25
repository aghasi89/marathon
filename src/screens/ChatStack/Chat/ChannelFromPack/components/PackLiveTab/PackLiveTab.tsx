import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import style from './PackLiveTab.style';
import Icons from '../../../../../../assets/icons/svg/index';
import {primaryWhite, red} from '../../../../../../assets/styles/colors.styles';

interface Props {
  select: (text: 'package' | 'live') => void;
  selected: 'package' | 'live';
}
const PackLiveTab: React.FC<Props> = (props: Props) => {
  const {select, selected} = props;
  const {t} = useTranslation();

  return (
    <View style={style.tabContainer}>
      <TouchableOpacity
        style={style.packageTab}
        onPress={() => select('package')}>
        <View style={style.rowContainer}>
          <Icons.FeedCardPacksIcon fill={primaryWhite} {...style.tabBarIcon} />
          <Text style={style.tabText}>{t(`packages`)}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={style.liveTab} onPress={() => select('live')}>
        <View style={style.rowContainer}>
          <Icons.LiveIcon fill={red} {...style.tabBarIcon} />
          <Text style={style.tabText2}>{t(`lives`)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PackLiveTab;
