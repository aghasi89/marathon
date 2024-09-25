import moment from 'moment';
import {
  ICreateFeed,
  IFeedMediaItem,
  IFeedMultiItem,
  IFeedTypes,
  IUser,
} from '../../../types/types';

const transformCreateFeedData = (
  geo: string,
  state?: ICreateFeed,
  type?: IFeedTypes,
  user?: IUser,
): ICreateFeed => {
  let category: number[] = [];

  state?.selectedCategories?.forEach(selectedCategory =>
    selectedCategory?.category?.forEach(item => {
      if (item.id) category = [...category, item.id];
    }),
  );
  let selectedMeasurementList: number[] = [];
  state?.selectedMeasurements?.forEach(item => {
    if (item.id) {
      selectedMeasurementList = [...selectedMeasurementList, item.id];
    }
  });
  let ingridients: IFeedMultiItem[] = [];
  if (type === 'recipe') {
    state?.components?.forEach(component => {
      if (!!component.name?.length) {
        ingridients = [...ingridients, component];
      }
    });
  }
  const context: Array<IFeedMediaItem> | undefined = state?.context
    ?.filter(el => el.size && el.type && el.value)
    .map(el => ({
      size: el.size,
      type: el.type,
      value: el.value,
    }));
  switch (type) {
    case 'package':
      return {
        coach_question: state?.coach_question?.filter(el => {
          if (!!el.text?.length) return el;
        }),
        context: context,
        creator: user?.id,
        chat_type: state?.chat_type,
        currency:
          state?.feedPaymentType === 'paid' ? state?.selectedCurrency?.id : 0,
        duration: state?.duration ?? 0,
        feed_category: category,
        is_public: user?.is_public,
        language: state?.language,
        measurement: selectedMeasurementList,
        media: state?.media,
        price: state?.price ?? 0,
        start_day: moment(state?.start_day).format('YYYY-MM-DD'),
        tag: state?.tag,
        title: state?.title,
        user_count: state?.user_count,
        wallet:
          state?.feedPaymentType === 'paid'
            ? state?.selectedCurrency?.wallet_id
            : 0,
        is_individual: state?.is_individual,
        is_completed: state?.is_completed,
        is_draft: state?.is_draft,
        geolocation: geo,
      };
    case 'live':
      return {
        creator: user?.id,
        title: state?.title,
        is_public: user?.is_public,
        media: state?.media,
        datetime: state?.start_day,
        duration: state?.duration ?? 0,
        user_count: 1,
        price: state?.price ?? 0,
        currency:
          state?.feedPaymentType === 'paid' ? state?.selectedCurrency?.id : 0,
        wallet:
          state?.feedPaymentType === 'paid'
            ? state?.selectedCurrency?.wallet_id
            : 0,
        link: '',
        text: state?.text,
        language: state?.language,
        feed_category: category,
        tag: state?.tag,
        is_individual: state?.is_individual,
        chat_type: state?.chat_type,
        geolocation: geo,
      };
    case 'article':
      return {
        creator: user?.id,
        title: state?.title,
        is_public: user?.is_public,
        media: state?.media,
        context: context,
        text: state?.text,
        language: state?.language,
        feed_category: category,
        geolocation: geo,
      };
    case 'recipe':
      return {
        calorie: state?.total_kcal ?? 0,
        is_protected: state?.is_protected,
        creator: user?.id,
        title: state?.title,
        is_public: user?.is_public,
        media: state?.media,
        text: state?.text,
        language: state?.language,
        feed_category: category,
        tag: state?.tag,
        duration: state?.duration ?? 0,
        kcal_measurement: state?.kcal_measurement,
        protein: state?.protein,
        carbohydrates: state?.carbohydrates,
        fat: state?.fat,
        apportionment: state?.apportionment ?? 0,
        serving_size: state?.serving_size ?? 0,
        components: ingridients,
        preparation_steps: state?.preparation_steps,
        unit_of_measurement: state?.unit_of_measurement ?? null,
        geolocation: geo,
        is_more:
          state?.apportionment &&
          state.serving_size &&
          state.unit_of_measurement
            ? true
            : false,
      };
    case 'basic':
      return {
        creator: user?.id,
        title: state?.text ?? '',
        is_public: user?.is_public,
        media: state?.media,
        geolocation: geo,
      };
    case 'workout':
      return {
        creator: user?.id,
        title: state?.title,
        duration: state?.duration ?? 0,
        is_public: user?.is_public,
        media: state?.media,
        type: state?.feedType,
        level: state?.level,
        calorie: state?.calorie,
        text: state?.text ?? '',
        trainings: state?.selectedExercises?.map(item => ({
          exercise_id: item.id,
          time: item.time ?? '0',
          rest_time: item.rest_time ?? '0',
        })),
        feed_category: category,
        body_parts: state?.selectedBodyParts?.map(el => el.id),
        equipments: state?.selectedEquipments?.map(el => el.id),
        language: state?.language,
        is_protected: state?.is_protected,
        geolocation: geo,
      };
    default:
      return {};
  }
};
export default transformCreateFeedData;
