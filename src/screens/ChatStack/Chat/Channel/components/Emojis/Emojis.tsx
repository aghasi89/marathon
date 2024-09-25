import {IconProps, ReactionData} from 'stream-chat-react-native';
import Icons from '../../../../../../assets/icons/svg/index';

export const Like: React.FC<IconProps> = props => <Icons.LikeThumb />;
export const Heart: React.FC<IconProps> = props => <Icons.RedHeart />;
export const Laugh: React.FC<IconProps> = props => <Icons.Laugh />;
export const Surprise: React.FC<IconProps> = props => <Icons.Wow />;
export const Sad: React.FC<IconProps> = props => <Icons.Sad />;
export const Angry: React.FC<IconProps> = props => <Icons.Angry />;

export const reactTionsData: ReactionData[] = [
  {type: 'love', Icon: Heart},
  {type: 'like', Icon: Like},
  {type: 'sad', Icon: Sad},
  {type: 'haha', Icon: Laugh},
  {type: 'wow', Icon: Surprise},
  {type: 'angry', Icon: Angry},
];
