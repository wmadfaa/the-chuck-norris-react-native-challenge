import {combineReducers, Dispatch} from 'redux';
import {all, fork} from 'redux-saga/effects';
import {LayoutState, LayoutAction, LayoutReducer} from './layout';
import {FriendsState, FriendsAction, FriendsReducer} from './friends';
import {JokesState, JokesAction, JokesReducer, JokesRootSaga} from './jokes';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export interface ApplicationState {
  layout: LayoutState;
  friends: FriendsState;
  jokes: JokesState;
}

const jokesPersistConfig = {
  key: 'jokes',
  storage: AsyncStorage,
  blacklist: ['loading', 'error'],
};

export type ApplicationAction = LayoutAction | FriendsAction | JokesAction;

export type ApplicationDispatch = Dispatch<ApplicationAction>;

export const RootReducer = combineReducers({
  layout: LayoutReducer,
  friends: FriendsReducer,
  jokes: persistReducer(jokesPersistConfig, JokesReducer),
});

export function* RootSaga() {
  yield all([fork(JokesRootSaga)]);
}
