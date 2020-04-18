import {combineReducers, Dispatch} from 'redux';

import {LayoutState, LayoutAction, LayoutReducer} from './layout';
import {FriendsState, FriendsAction, FriendsReducer} from './friends';

export interface ApplicationState {
  layout: LayoutState;
  friends: FriendsState;
}

export type ApplicationAction = LayoutAction | FriendsAction;

export type ApplicationDispatch = Dispatch<ApplicationAction>;

export const RootReducer = combineReducers({
  layout: LayoutReducer,
  friends: FriendsReducer,
});
