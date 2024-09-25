//import { DynamicObject } from '../../types/interfaces';

import {Middleware} from 'redux';
const findLinkers = (type, linkers) => {
  return Object.keys(linkers).filter(key => linkers[key].includes(type));
};

const getActionName = actionType => {
  return actionType.split('_').slice(0, -1).join('_');
};

export default () => store => next => action => {
  const {type, request, meta = {}} = action;
  const state = store.getState().pending;
  return next(action);
};
