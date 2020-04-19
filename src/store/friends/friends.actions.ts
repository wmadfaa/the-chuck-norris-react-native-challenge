import {action} from 'typesafe-actions';
import {v4 as uuid} from 'uuid';

import {FriendsActionTypes, Friend} from './friends.types';

export const addFriendAction = (email: Friend['email']) => {
  const friend: Friend = {
    id: uuid(),
    email,
    selected: true,
  };
  return action(FriendsActionTypes.ADD_FRIEND, friend);
};

export const removeFriendAction = (id: Friend['id']) =>
  action(FriendsActionTypes.REMOVE_FRIEND, id);

export const removeAllFriendsAction = () =>
  action(FriendsActionTypes.REMOVE_ALL_FRIENDS);

export const updateFriendAction = (
  id: Friend['id'],
  selected: Friend['selected'],
) => action(FriendsActionTypes.UPDATE_FRIEND, {id, selected});

export const updateAllFriendsAction = (selected: Friend['selected']) =>
  action(FriendsActionTypes.UPDATE_ALL_FRIENDS, selected);
