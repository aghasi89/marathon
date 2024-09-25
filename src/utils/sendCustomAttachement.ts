import uuid from 'react-native-uuid';

interface WorkoutProps {
  id: number;
  image: string;
  title: string;
  exercise: number;
  duration: number;
}

interface VoiceMessageProps {
  uri: string;
}

interface RecipeProps {
  id: number;
  image: string;
  title: string;
  calories: number;
  duration: number;
}

interface LivestreamProps {
  callText: string,
  liveStatus: string
}
interface FeedProps {
  image: string,
  title: string,
  is_individual: boolean,
  date: string,
  feedId: number,
  otherId: number,
  user_count: number,
  type: string,
  feedType: string
}

const sendCustomAttachement = async <T,>(
  props: T,
  messageType: string,
  channel: any,
  client: any,
) => {
  const commonMessage = {
    created_at: new Date(),
    attachments: [],
    mentioned_users: [],
    id: uuid.v4(),
    status: 'sending',
    type: 'regular',
    user: client.user
  };
  if (messageType === 'workout') {
    const workoutProps = props as WorkoutProps;
    const workoutMessage = {
      ...commonMessage,
      attachments: [
        {
          feedId: workoutProps.id,
          image: workoutProps.image,
          title: workoutProps.title,
          type: 'workout',
          exercise: workoutProps.exercise,
          duration: workoutProps.duration,
        },
      ],
    };
    const { created_at, type, status, user, ...messageWithoutReservedFields } =
      workoutMessage;
    await channel?.sendMessage(messageWithoutReservedFields);
  }
  //  else if (messageType === 'voice-message') {
  //   const voiceMessageProps = props as VoiceMessageProps;
  //   const voiceMessage = {
  //     ...commonMessage,
  //     attachments: [
  //       {
  //         asset_url: voiceMessageProps.uri,
  //         file_size: 200,
  //         mime_type: 'audio/mp4',
  //         title: 'test.mp4',
  //         type: 'voice-message',
  //         audio_length: recordTime,
  //       },
  //     ],
  //   };
  //   //@ts-ignore
  //   updateMessage(voiceMessage);
  //   const res = await channel.sendFile(
  //     voiceMessageProps.uri,
  //     'test.mp4',
  //     'audio/mp4',
  //   );
  //   voiceMessage.attachments[0].asset_url = res.file;
  //   await channel.sendMessage(voiceMessage);
  // } 
  else if (messageType === 'recipe') {
    const recipeProps = props as RecipeProps;
    const recipeMessage = {
      ...commonMessage,
      attachments: [
        {
          feedId: recipeProps.id,
          image: recipeProps.image,
          title: recipeProps.title,
          type: 'recipe',
          calories: recipeProps.calories,
          duration: recipeProps.duration,
        },
      ],
    };
    const { created_at, type, status, user, ...messageWithoutReservedFields } =
      recipeMessage;
    await channel?.sendMessage(messageWithoutReservedFields);
  }
  else if (messageType === 'livestream') {
    const livestream = props as LivestreamProps;
    const recipeMessage = {
      ...commonMessage,
      attachments: [
        {
          type: 'livestream',
          callText: livestream.callText,
          liveStatus: livestream.liveStatus,
        },
      ],
    };
    const response = await channel?.query({ messages: { limit: 50 } });
    const messages = response?.messages.filter((message: any) => {
      return (message.attachments && message.attachments.some((attachment: any) => attachment.type === "livestream"));
    });
    const messagesToDelete = messages.map((message: any) => message.id);
    messagesToDelete.forEach(async (messageId: any) => {
      await client.deleteMessage(messageId);
    });
    const { created_at, type, status, user, ...messageWithoutReservedFields } =
      recipeMessage;
    await channel?.sendMessage(messageWithoutReservedFields);
  }
  else if (messageType === 'feed') {
    const feed = props as FeedProps;
    const feedMessage = {
      ...commonMessage,
      attachments: [
        {
          image: feed.image,
          title: feed.title,
          is_individual: feed.is_individual,
          date: feed.date,
          feedId: feed.feedId,
          otherId: feed.otherId,
          user_count: feed.user_count,
          type: feed?.type,
          feedType: feed?.feedType
        },
      ],
    };
    const { created_at, type, status, user, ...messageWithoutReservedFields } =
      feedMessage;
    await channel?.sendMessage(messageWithoutReservedFields);
  }
};
export default sendCustomAttachement;
