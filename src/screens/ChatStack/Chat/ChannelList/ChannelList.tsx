import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChannelList} from 'stream-chat-react-native';
import FilterTabBar from '../../../../components/filterTabBar/filterTabBar';
import Icons from '../../../../assets/icons/svg/index';
import Accordion from '../../../../components/accordion/Accordion';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import videoLink from '../../../../utils/videoLink';
import {calcHeight} from '../../../../assets/dimensions';
import {IAssistantChannels, IError} from '../../../../types/types';
import {setError} from '../../../../store/actions/administrative-action';
import ChatHeader from '../Components/ChatHeader';
import InputComponent from '../../../FeedStack/CreateFeed/components/InputComponent/InputComponent';
import ChannelPreview from './components/ChannelPreview/ChannelPreview';
import ChannelListHook from './ChannelList-hook';
import style from './ChannelList.style';
import AssistantPreview from './components/AssistantPreview/AssistantPreview';
import EmptyAssistantPreview from './components/EmptyAssistantPreview/EmptyAssistantPreview';

const ChannelListScreen: React.FC = () => {
  const {
    onPressToDismiss,
    searchText,
    debounceSearch,
    groupFilter,
    t,
    tabFilter,
    showGroupChats,
    activeFilter,
    assistantChannels,
    filter,
    user,
    isExpanded,
    otherExpanded,
    chatfeeds,
    handlerSendMessage,
    onSelect,
    onSelectToAssistant,
    handleDeleteAssistant,
    handleFilterSelection,
    toggleAccordion,
    toggleAnotherAccordeon,
    key,
    dispatch,
  } = ChannelListHook();

  const handleDelete = async (isCreator: boolean, channel: any) => {
    if (isCreator) {
      await channel?.delete();
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: 'You are not the owner of\n this channel to delete it.',
        buttonTitle: 'OK',
      };
      dispatch(setError(data));
    }
  };

  // const handlerMuteChannel = async (channel: any) => {
  //   if (channel?.muteStatus().muted) {
  //     await channel?.unmute();
  //   } else {
  //     await channel?.mute();
  //   }
  // };

  return (
    <Pressable style={style.container} onPress={onPressToDismiss}>
      <ChatHeader title={t('messages') ?? ''} />
      <InputComponent
        onChange={debounceSearch}
        placeholder={'People, groups, messages...' ?? ''}
        icon={<Icons.ChatSearchIcon />}
        containerStyle={style.searchInputContainer}
        inputStyle={style.searchInput}
      />
      <FilterTabBar
        filters={tabFilter}
        activeFilter={activeFilter}
        setActiveFilter={handleFilterSelection}
      />
      {showGroupChats ? (
        <ScrollView
          style={{marginBottom: calcHeight(70)}}
          nestedScrollEnabled={true}>
          <Accordion
            toggleAccordion={toggleAnotherAccordeon}
            isExpanded={otherExpanded}
            title={t(`others`)}
            image="https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/62646/373050/3YBFL6-image-75.jpg"
            child={
              <ChannelList
                key={key + 'otherGroup'}
                // PreviewAvatar={ChannelPreviewAvatar}
                additionalFlatListProps={{style: style.channelList}}
                onSelect={onSelect}
                filters={groupFilter}
                Preview={({channel, unread}) => {
                  return (
                    <ChannelPreview
                      channel={channel}
                      unread={unread}
                      user={user}
                      onSelect={onSelect}
                      handleDelete={handleDelete}
                      // handlerMuteChannel={handlerMuteChannel}
                    />
                  );
                }}
              />
            }
          />
          {chatfeeds &&
            chatfeeds?.map((item: any, index: number) => {
              let searchFilter = undefined;
              if (searchText) {
                searchFilter = {
                  $or: [
                    {name: {$autocomplete: searchText}},
                    {
                      $and: [
                        {type: 'messaging'},
                        {'member.user.name': {$autocomplete: searchText}},
                      ],
                    },
                  ],
                };
              }
              return (
                <>
                  <Accordion
                    image={
                      item.media[0]?.type === 'videoLink'
                        ? videoLink(item.media[0]?.url)
                        : item.media[0]?.type === 'video'
                        ? downloadMediaFromBunny({
                            public_key: item.media[0]?.url,
                            mediaType: item.media[0]?.type,
                            imageDir: 'feed',
                            userDir: item?.creator,
                          })?.thumbnailURL
                        : downloadMediaFromBunny({
                            public_key: item.media[0]?.url,
                            mediaType: item.media[0]?.type,
                            imageDir: 'feed',
                            userDir: item?.creator,
                          })?.url
                    }
                    key={item.id}
                    isExpanded={isExpanded === index}
                    title={item.title}
                    child={
                      <View>
                        <ChannelList
                          key={key + 'group'}
                          // PreviewAvatar={ChannelPreviewAvatar}
                          additionalFlatListProps={{style: style.channelList}}
                          onSelect={onSelect}
                          filters={{
                            members: {
                              $in: user?.get_stream_id
                                ? [user.get_stream_id.toString()]
                                : [],
                            },
                            isFeed: true,
                            feedid: item.id,
                          }}
                          Preview={({channel, unread}) => {
                            return (
                              <ChannelPreview
                                channel={channel}
                                unread={unread}
                                user={user}
                                onSelect={onSelect}
                                handleDelete={handleDelete}
                                // handlerMuteChannel={handlerMuteChannel}
                              />
                            );
                          }}
                        />
                      </View>
                    }
                    toggleAccordion={() => toggleAccordion(index)}
                  />
                </>
              );
            })}
        </ScrollView>
      ) : activeFilter !== 'assistant' ? (
        <View style={style.channelListContainer}>
          <ChannelList
            key={key + 'all'}
            filters={filter}
            Preview={({channel, unread}) => {
              return (
                <ChannelPreview
                  channel={channel}
                  unread={unread}
                  user={user}
                  onSelect={onSelect}
                  handleDelete={handleDelete}
                  // handlerMuteChannel={handlerMuteChannel}
                />
              );
            }}
          />
        </View>
      ) : (
        <FlatList
          style={style.assistantList}
          data={assistantChannels}
          renderItem={({
            item,
            index,
          }: {
            item: IAssistantChannels;
            index: number;
          }) => (
            <AssistantPreview
              key={index}
              data={item}
              onSelect={onSelectToAssistant}
              handleDelete={handleDeleteAssistant}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id?.toString()}
          ListEmptyComponent={() => {
            return <EmptyAssistantPreview onSelect={onSelectToAssistant} />;
          }}
        />
      )}
      <TouchableOpacity
        style={style.createButton}
        onPress={
          activeFilter !== 'assistant'
            ? handlerSendMessage
            : () => onSelectToAssistant(undefined)
        }>
        <Icons.ChatPlus />
      </TouchableOpacity>
    </Pressable>
  );
};
export default ChannelListScreen;
