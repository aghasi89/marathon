import {CustomAttachement} from '../CustomAttachement/CustomAttachement';
import FeedAttachement from '../FeedAttachement/FeedAttachement';
import {LiveAttachement} from '../LiveAttachement/LiveAttachement';
import {RecipeAttachement} from '../RecipeAttachement/RecipeAttachement';
import {VoiceMessageAttachment} from '../VoiceMessageAttachement/VoiceMessageAttachment';

export type MessageType = 'workout' | 'voice-message';
export interface MessageAttachementType {
  type: MessageType;
  title: string;
  image: string;
  feedId: number;
  exercise: number;
  duration: number;
}

const AttachmentRenderer = (attachment: any) => {
  switch (attachment.type) {
    case 'workout':
      return <CustomAttachement {...attachment} />;
    case 'voice-message':
      return <VoiceMessageAttachment {...attachment} />;
    case 'recipe':
      return <RecipeAttachement {...attachment} />;
    case 'livestream':
      return <LiveAttachement {...attachment} />;
    case 'feed':
      return <FeedAttachement {...attachment} />;
    default:
      return null;
  }
};
export default AttachmentRenderer;
