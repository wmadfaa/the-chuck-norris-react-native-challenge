import {Reducer} from 'redux';
import {ActionType} from 'typesafe-actions';
import * as LayoutActions from './layout.actions';
import {LayoutState, LayoutActionTypes} from './layout.types';

export type LayoutAction = ActionType<typeof LayoutActions>;

export const initialState: LayoutState = {
  theme: 'dark',
};

const reducer: Reducer<LayoutState, LayoutAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LayoutActionTypes.SET_THEME: {
      return {...state, theme: action.payload};
    }
    default: {
      return state;
    }
  }
};

export {reducer as layoutReducer};
