import {Reducer} from 'redux';
import {ActionType} from 'typesafe-actions';
import filter from 'lodash.filter';
import * as FriendsActions from './friends.actions';
import {FriendsState, FriendsActionTypes} from './friends.types';

export type FriendsAction = ActionType<typeof FriendsActions>;

export const initialState: FriendsState = [];

const reducer: Reducer<FriendsState, FriendsAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FriendsActionTypes.ADD_FRIEND: {
      return [...state, action.payload];
    }
    case FriendsActionTypes.REMOVE_FRIEND: {
      return filter([...state], ({id}) => id !== action.payload);
    }
    case FriendsActionTypes.REMOVE_ALL_FRIENDS: {
      return [];
    }
    case FriendsActionTypes.UPDATE_FRIEND: {
      const nextFriends = [...state];

      for (let i in nextFriends) {
        if (nextFriends[i].id == action.payload.id) {
          nextFriends[i].selected = action.payload.selected;
          break;
        }
      }

      return nextFriends;
    }
    case FriendsActionTypes.UPDATE_ALL_FRIENDS: {
      return state.map((friend) => ({
        ...friend,
        selected: action.payload,
      }));
    }
    default: {
      return state;
    }
  }
};

export {reducer as FriendsReducer};
