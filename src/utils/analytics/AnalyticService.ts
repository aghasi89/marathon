import analytics from '@react-native-firebase/analytics';
import {
  AnalyticEvents,
  AddAnalyticsPropsType,
  ISocialValueTypes,
  IContentTypes,
  ISareMethods,
  AnalyticEventPayload,
  IUserRoleType,
} from './analyticTypes';

class AnalyticService {
  private async sendAnalytic(
    eventName: AnalyticEvents,
    arg: AddAnalyticsPropsType[],
  ): Promise<void> {
    let payload: any = {};
    arg.forEach(el => (payload[el.parameterName] = el.value));
    console.log(eventName,':',payload);
    
    await analytics()
      .logEvent(eventName, payload)
      .then(() => console.log('event is sended!!!'))
      .catch(() => console.log('event error!!!'));
  }
  public userLogin(method: ISocialValueTypes): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.LOGIN][] = [
      {
        parameterName: 'method',
        value: method,
      },
    ];
    this.sendAnalytic(AnalyticEvents.LOGIN, analyticsData);
  }
  public userSignUp(method: ISocialValueTypes): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.SIGNUP][] = [
      {
        parameterName: 'method',
        value: method,
      },
    ];
    this.sendAnalytic(AnalyticEvents.SIGNUP, analyticsData);
  }
  public shareFeed(
    contentType: IContentTypes,
    shareMethod: ISareMethods,
  ): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.SHARE][] = [
      {
        parameterName: 'content_type',
        value: contentType,
      },
      {
        parameterName: 'share_method',
        value: shareMethod,
      },
    ];
    this.sendAnalytic(AnalyticEvents.SHARE, analyticsData);
  }
  public clickJoinToPackage(packageId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.CLICK_PACKAGE][] =
      [
        {
          parameterName: 'package_id',
          value: packageId,
        },
      ];
    this.sendAnalytic(AnalyticEvents.CLICK_PACKAGE, analyticsData);
  }
  public packageJoin(packageId: number,packagePrice:string): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.JOIN_PACKAGE][] = [
      {
        parameterName: 'package_id',
        value: packageId,
      },
      {
        parameterName: 'package_price',
        value: packagePrice,
      }
    ];
    this.sendAnalytic(AnalyticEvents.JOIN_PACKAGE, analyticsData);
  }
  public clickJoinToLive(liveTraningId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.CLICK_LIVE][] = [
      {
        parameterName: 'live_training_id',
        value: liveTraningId,
      },
    ];
    this.sendAnalytic(AnalyticEvents.CLICK_LIVE, analyticsData);
  }
  public liveJoin(liveTraningId: number,liveTrainingPrice:string): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.JOIN_LIVE][] = [
      {
        parameterName: 'live_training_id',
        value: liveTraningId,
      },
      {
        parameterName: 'live_training_price',
        value: liveTrainingPrice,
      },
    ];
    this.sendAnalytic(AnalyticEvents.JOIN_LIVE, analyticsData);
  }
  public followUser(userId: number, userRole: IUserRoleType): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.FOLLOW][] = [
      {
        parameterName: 'user_id',
        value: userId,
      },
      {
        parameterName: 'user_type',
        value: userRole,
      },
    ];
    this.sendAnalytic(AnalyticEvents.FOLLOW, analyticsData);
  }
  public LikeFeed(postId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.LIKE][] = [
      {
        parameterName: 'post_id',
        value: postId,
      },
    ];
    this.sendAnalytic(AnalyticEvents.LIKE, analyticsData);
  }
  public commentFeed(postId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.WRITE_COMMENT][] =
      [
        {
          parameterName: 'post_id',
          value: postId,
        },
      ];
    this.sendAnalytic(AnalyticEvents.WRITE_COMMENT, analyticsData);
  }
  public clickMessageToCoach(coachId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.CLICK_COACH_MESSAGE][] =
      [
        {
          parameterName: 'coach_id',
          value: coachId,
        },
      ];
    this.sendAnalytic(AnalyticEvents.CLICK_COACH_MESSAGE, analyticsData);
  }
  public viewFeed(contentType: IContentTypes, contentId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.VIEW_POST][] = [
      {
        parameterName: 'content_type',
        value: contentType,
      },
      {
        parameterName: 'content_id',
        value: contentId,
      },
    ];
    this.sendAnalytic(AnalyticEvents.VIEW_POST, analyticsData);
  }
  public regionChange(region: string): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.CHANGE_REGION][] =
      [
        {
          parameterName: 'region',
          value: region,
        },
      ];
    this.sendAnalytic(AnalyticEvents.CHANGE_REGION, analyticsData);
  }
  public languageChange(language: string): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.CHANGE_LANGUAGE][] =
      [
        {
          parameterName: 'language',
          value: language,
        },
      ];
    this.sendAnalytic(AnalyticEvents.CHANGE_LANGUAGE, analyticsData);
  }
  public viewUserProfile(
    profileId: number,
    profileUserRole: IUserRoleType,
  ): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.VIEW_PROFILE][] = [
      {
        parameterName: 'profile_id',
        value: profileId,
      },
      {
        parameterName: 'profile_type',
        value: profileUserRole,
      },
    ];
    this.sendAnalytic(AnalyticEvents.VIEW_PROFILE, analyticsData);
  }
  public search(query: string, resultCount: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.SEARCH][] = [
      {
        parameterName: 'query',
        value: query,
      },
      {
        parameterName: 'result_count',
        value: resultCount,
      },
    ];
    this.sendAnalytic(AnalyticEvents.SEARCH, analyticsData);
  }
  public addToFavortes(contentType: IContentTypes, contentId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.ADD_FAVORITES][] =
      [
        {
          parameterName: 'content_type',
          value: contentType,
        },
        {
          parameterName: 'content_id',
          value: contentId,
        },
      ];
    this.sendAnalytic(AnalyticEvents.ADD_FAVORITES, analyticsData);
  }
  public unfollowUser(userId: number, userRole: IUserRoleType): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.UNFOLLOW][] = [
      {
        parameterName: 'user_id',
        value: userId,
      },
      {
        parameterName: 'user_type',
        value: userRole,
      },
    ];
    this.sendAnalytic(AnalyticEvents.UNFOLLOW, analyticsData);
  }
  public completeWorkout(contentType: IContentTypes, workoutId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.COMPLETE_WORKOUT][] =
      [
        {
          parameterName: 'content_type',
          value: contentType,
        },
        {
          parameterName: 'content_id',
          value: workoutId,
        },
      ];
    this.sendAnalytic(AnalyticEvents.COMPLETE_WORKOUT, analyticsData);
  }
  public sessionDuration(timeSpent: string, pagesViewed: string): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.SESSION_DURATION][] =
      [
        {
          parameterName: 'time_spent',
          value: timeSpent,
        },
        {
          parameterName: 'pages_viewed',
          value: pagesViewed,
        },
      ];
    this.sendAnalytic(AnalyticEvents.SESSION_DURATION, analyticsData);
  }
  public userLogout(userId: number): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.LOGOUT][] =
      [
        {
          parameterName: 'userId',
          value:userId ,
        },
      ];
    this.sendAnalytic(AnalyticEvents.LOGOUT, analyticsData);
  }
  public errorTracking(errorType: string, errorMessage: string): void {
    const analyticsData: AnalyticEventPayload[AnalyticEvents.ERROR][] =
      [
        {
          parameterName: 'error_type',
          value:errorType ,
        },
        {
          parameterName: 'error_type',
          value:errorMessage ,
        },
      ];
    this.sendAnalytic(AnalyticEvents.ERROR, analyticsData);
  }
}

export default new AnalyticService();
