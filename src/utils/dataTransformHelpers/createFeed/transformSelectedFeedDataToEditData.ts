import {ICreateFeed, ICurrency, IFeedItem, IUser} from '../../../types/types';
import {downloadMediaFromBunny} from '../../bunny.net';
import {BunnyAdministrativeDirectories} from '../../bunny.net/bunnyConfig';
import calculateCalories from '../../calculateCalories';

const transformSelectedFeedDataToEditData = (
  selectedFeed?: IFeedItem,
  user?: IUser,
  currency?: ICurrency,
  isEditing?: boolean,
): ICreateFeed => {
  return {
    feed_id: selectedFeed?.id,
    media: selectedFeed?.feed?.media,
    creator: user?.id,
    coach_question: selectedFeed?.coach_question,
    duration: selectedFeed?.duration,
    currency: selectedFeed?.currency_id,
    is_public: selectedFeed?.feed?.is_public,
    language: selectedFeed?.language?.id,
    selectedMeasurements: selectedFeed?.measurement,
    price: selectedFeed?.price ? parseInt(selectedFeed?.price) : 0,
    start_day: selectedFeed?.start_day
      ? selectedFeed?.start_day
      : selectedFeed?.datetime,
    title: selectedFeed?.feed?.title,
    user_count: isEditing ? selectedFeed?.user_count : 1,
    wallet: selectedFeed?.wallet_id,
    context: selectedFeed?.context,
    feedType: selectedFeed?.feed?.type,
    text:
      selectedFeed?.type === 'basic'
        ? selectedFeed?.feed?.title
        : selectedFeed?.text,
    components: selectedFeed?.components,
    preparation_steps: selectedFeed?.preparation_steps,
    protein: selectedFeed?.protein,
    carbohydrates: selectedFeed?.carbohydrates,
    fat: selectedFeed?.fat,
    kcal_measurement: selectedFeed?.kcal_measurement,
    total_kcal: calculateCalories(
      selectedFeed?.protein,
      selectedFeed?.fat,
      selectedFeed?.carbohydrates,
    ),
    apportionment: selectedFeed?.apportionment,
    serving_size: selectedFeed?.serving_size,
    is_more: selectedFeed?.is_more,
    measurementSelectedUnit: selectedFeed?.unit_of_measurement,
    selectedCategories: selectedFeed?.feed_category,
    selectedCurrency: {...currency, name: currency?.code},
    is_individual: isEditing ? selectedFeed?.is_individual : true,
    feedPaymentType: isEditing
      ? !!selectedFeed?.price
        ? 'paid'
        : 'free'
      : 'paid',
    selectedBodyParts: selectedFeed?.body_parts,
    level: selectedFeed?.level,
    calorie: selectedFeed?.calorie,
    selectedEquipments: selectedFeed?.equipments?.map(item => ({
      name: item.name_en,
      url: downloadMediaFromBunny({
        public_key: item.image,
        mediaType: 'image',
        customDir: BunnyAdministrativeDirectories.EQUIPMENT,
      })?.url,
      id: item.id,
    })),
    selectedExercises: selectedFeed?.trainings?.map(item => ({
      name: item.exercise?.title,
      url: item.exercise?.video
        ? downloadMediaFromBunny({
            public_key: item.exercise?.video,
            mediaType: 'video',
            aspectRatio: item.exercise?.size,
            userDir:item.exercise?.creator,
            imageDir:'feed'
          })?.thumbnailURL
        : '',
      id: item?.exercise?.id ?? 0,
      time: `${item.time}`,
      body_parts: item.exercise?.body_parts,
      description: item.exercise?.description ?? '',
      equipments: item.exercise?.equipments,
      videoUrl: item.exercise?.video
        ? downloadMediaFromBunny({
          public_key: item.exercise?.video,
          mediaType: 'video',
          aspectRatio: item.exercise?.size,
          userDir:item.exercise?.creator,
          imageDir:'feed'
        })?.url
        : '',
      title: item.exercise?.title,
      level: item.exercise?.level,
      rest_time: item.rest_time,
    })),
    is_protected:
      selectedFeed?.feed?.is_protected ?? selectedFeed?.is_protected,
    is_completed: selectedFeed?.feed?.is_completed,
    is_draft: selectedFeed?.feed?.is_draft,
    isEditing,
  };
};
export default transformSelectedFeedDataToEditData;
