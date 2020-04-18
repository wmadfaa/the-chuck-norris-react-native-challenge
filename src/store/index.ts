import {combineReducers, Dispatch} from 'redux';

import {LayoutState, LayoutAction, layoutReducer} from './layout';

export interface ApplicationState {
  layout: LayoutState;
}

export type ApplicationAction = LayoutAction;

export type ApplicationDispatch = Dispatch<ApplicationAction>;

export const RootReducer = combineReducers({
  layout: layoutReducer,
});
