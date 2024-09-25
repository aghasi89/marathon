import {put, takeEvery} from 'redux-saga/effects';
import marathonGroups from '../../services/api/routes/groupMarathons';
import {
  setGroups,
  setCategories,
  setMarathonGroupTags,
  setGroup,
  setClinets,
  setLeads,
  setInviteGroups,
  setNotifications,
  setPayments,
} from '../actions/marathon-action';
import {MarathonsTypes} from '../costants';

function* getCategories() {
  try {
    const res = yield marathonGroups.getGroupCategories();
    yield put(setCategories(res));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getMarathonGroupTags() {
  try {
    const res = yield marathonGroups.getMarathonGroupTags();
    yield put(setMarathonGroupTags(res));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* createGroup({payload}) {
  try {
    const res = yield marathonGroups.createGroup(payload);
    const data = yield marathonGroups.getGroups();
    yield put(setGroups(data.marathonGroups));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getGroups() {
  try {
    const res = yield marathonGroups.getGroups();
    yield put(setGroups(res.marathonGroups));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* deleteGroup({payload}) {
  try {
    const res = yield marathonGroups.deleteGroup(payload);
    const data = yield marathonGroups.getGroups();
    yield put(setGroups(data.marathonGroups));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getGroupById({payload}) {
  try {
    const res = yield marathonGroups.getGroupById(payload);
    yield put(setGroup(res.marathonGroups));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* changeGroup({payload}) {
  try {
    const res = yield marathonGroups.changeGroup(payload.group, payload.id);
    const data = yield marathonGroups.getGroups();
    yield put(setGroups(data.marathonGroups));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getClients() {
  try {
    const res = yield marathonGroups.getClients();
    yield put(setClinets(res));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getLeads() {
  try {
    const res = yield marathonGroups.getLeads();
    yield put(setLeads(res));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getInviteGroups() {
  try {
    const res = yield marathonGroups.getInviteGroups();
    yield put(setInviteGroups(res));
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getNotifications() {
  try {
    const res = yield marathonGroups.getNotifications();
    yield put(setNotifications(res));
  } catch (ex) {
    console.log('exxxxxx', ex);
  }
}
function* getPayments() {
  try {
    const res = yield marathonGroups.getPayments();
    yield put(setPayments(res));
  } catch (ex) {
    console.log('exxxxxx', ex);
  }
}
export function* watchGroups() {
  yield takeEvery(MarathonsTypes.GET_CATEGORIES, getCategories);
  yield takeEvery(MarathonsTypes.GET_MARATHONGROUP_TAGS, getMarathonGroupTags);
  yield takeEvery(MarathonsTypes.CREATE_GROUP, createGroup);
  yield takeEvery(MarathonsTypes.GET_GROUPS, getGroups);
  yield takeEvery(MarathonsTypes.DELETE_GROUP, deleteGroup);
  yield takeEvery(MarathonsTypes.GET_GROUP_BY_ID, getGroupById);
  yield takeEvery(MarathonsTypes.CHANGE_GROUP, changeGroup);
  yield takeEvery(MarathonsTypes.GET_CLIENTS, getClients);
  yield takeEvery(MarathonsTypes.GET_LEADS, getLeads);
  yield takeEvery(MarathonsTypes.GET_INVITE_GROUPS, getInviteGroups);
  yield takeEvery(MarathonsTypes.GET_NOTIFICATIONS, getNotifications);
  yield takeEvery(MarathonsTypes.GET_PAYMENTS, getPayments);
}
createGroup;
