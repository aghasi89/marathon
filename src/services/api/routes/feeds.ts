import { FeedListFilterTypes, ICheckIsQuetstinsExist, IComment, ICreateExercise, ICreateFeed, IExerciseItem, IFeedListItem, IFeedTypes, IHideFeed, IPostAnswer, IPrivateWorkout, IReportFeed, getFeedListPayload } from '../../../types/types';
import feedApi from '../feedInstance';
import mainApi from '../mainInstance';

class Feeds {
  getFeedList = async ({ filterBy, page, geo }: getFeedListPayload) => {
    try {
      const res = await feedApi.get(`/all-feed/?geo=${geo}&page=${page}${filterBy === 'feed' ? '' : `&type=` + filterBy}`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getFeedById = async (id: number, type: string) => {
    try {
      const res = await feedApi.get(`/${type}/${id}/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getChatFeeds = async (data: any) => {
    try {
      const res = await feedApi.post(`get-feeds-for-chat/`, data);
      return res.data;
    } catch (er) {
      throw er;
    }
  }
  // createFeed = async (feedType: FeedListFilterTypes, data: ICreateFeed) => {
  //   try {
  //     const res = await feedApi.post(`/${feedType}/`, data);
  //     return res.data;
  //   } catch (er) {
  //     throw er;
  //   }
  // };
  createDraftFeed = async (payload: { type: FeedListFilterTypes }) => {
    try {
      const res = await feedApi.post(`create-draft-feed/`, payload);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  editFeed = async (feedType: FeedListFilterTypes, data: ICreateFeed, id: number) => {
    try {
      const res = await feedApi.put(`/${feedType}/${id}/`, data);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getCategoriesList = async (feedType: FeedListFilterTypes) => {
    try {
      const res = await feedApi.post(`/get-feed-categories-with-type/`, { type: feedType });
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getMeasurementsList = async () => {
    try {
      const res = await feedApi.get(`/measurement/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getMeasurementUnitsList = async () => {
    try {
      const res = await feedApi.get(`/unit-of-measurement/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getCoachFeed = async (id: number, feedType: string) => {
    try {
      const res = await feedApi.get(`get-coach-feed/${id}/?page=1&type=${feedType}`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getEquipmentsList = async () => {
    try {
      const res = await feedApi.get(`equipment/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getBotyPartsList = async () => {
    try {
      const res = await feedApi.get(`body-part/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  createExercise = async (data: ICreateExercise) => {
    try {
      const res = await feedApi.post(`exercise/`, data);
      return res;
    } catch (er) {
      throw er;
    }
  };
  getMyExecises = async () => {
    try {
      const res = await feedApi.get(`exercise/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getExecise = async (id: number) => {
    try {
      const res = await feedApi.get(`exercise/${id}/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  editExercise = async (id: number, payload: IExerciseItem) => {
    try {
      const res = await feedApi.put(`exercise/${id}/`, payload);
      return res;
    } catch (er) {
      throw er;
    }
  };
  deleteExercise = async (id: number) => {
    try {
      const res = await feedApi.delete(`exercise/${id}/`);
      return res;
    } catch (er) {
      throw er;
    }
  };
  getCoachFeeds = async (id: number, feedType: IFeedTypes) => {
    try {
      const res = await feedApi.get(`${feedType}/?user_id=${id}`);
      return res.data.results
    } catch (er) {
      throw er;
    }
  };
  connectPrivateWorkout = async (data: IPrivateWorkout) => {
    try {
      const res = await feedApi.post(`/workout-user/`, data);
      return res.data
    } catch (er) {
      throw er;
    }
  };
  deleteFeed = async (id: number) => {
    try {
      const res = await feedApi.delete(`feed/${id}/`);
      return res;
    } catch (er) {
      throw er;
    }
  };
  setCoachQuestionsAnswer = async (payload: IPostAnswer) => {
    try {
      const res = await feedApi.post(`/answer-measurement/`, payload);
      return res;
    } catch (er) {
      throw er;
    }
  };
  setLikeOrDislikeFeed = async (payload: number) => {
    try {
      const res = await feedApi.get(`/like-or-dislike/${payload}/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getLikedUsersList = async (payload: number) => {
    try {
      const res = await feedApi.get(`/like/${payload}/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getCoachesList = async () => {
    try {
      const res = await mainApi.get(`/get-validated-coaches/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  postComment = async (payload: IComment) => {
    try {
      const res = await feedApi.post(`/feed-comment/`, payload);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  getComments = async (id: string) => {
    try {
      const res = await feedApi.get(`/feed-comment/${id}/`);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  postCommentReply = async (payload: any) => {
    try {
      const res = await feedApi.post(`/reply-comment/`, payload);
      return res.data;
    } catch (er) {
      throw er;
    }
  };
  hideFeed = async (payload: IHideFeed) => {
    try {
      const res = await feedApi.post(`/hide-feed/`, payload);
      return res.data
    } catch (er) {
      throw er;
    }
  };
  getReportCategory = async () => {
    try {
      const res = await feedApi.get(`/report-category/`);
      return res.data
    } catch (er) {
      throw er;
    }
  };
  createReport = async (payload: IReportFeed) => {
    try {
      const res = await feedApi.post(`/report/`, payload);
      return res.data
    } catch (er) {
      throw er;
    }
  };
  deleteComment = async (id: number) => {
    try {
      const res = await feedApi.delete(`/feed-comment/${id}/`);
      return res
    } catch (er) {
      throw er;
    }
  };
  deleteReplyComment = async (id: number) => {
    try {
      const res = await feedApi.delete(`/reply-comment//${id}/`);
      return res
    } catch (er) {
      throw er;
    }
  };
  likeComment = async (id: number) => {
    try {
      const res = await feedApi.get(`/comment-like-or-dislike/${id}/`);
      return res
    } catch (er) {
      throw er;
    }
  };
  likeReplyComment = async (id: number) => {
    try {
      const res = await feedApi.get(`/reply-comment-like-or-dislike/${id}/`);
      return res
    } catch (er) {
      throw er;
    }
  };
  checkIsQuetstinsExist = async (payload: ICheckIsQuetstinsExist) => {
    try {
      const res = await feedApi.post(`/check-answer/`, payload);
      return res
    } catch (error: any) {
      throw error.response.data
    }
  };
}

const feeds = new Feeds();
export default feeds;
