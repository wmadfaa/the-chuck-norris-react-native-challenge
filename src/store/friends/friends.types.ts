export enum FriendsActionTypes {
  ADD_FRIEND = '@@friends/ADD_FRIEND',
  REMOVE_FRIEND = '@@friends/REMOVE_FRIEND',
  UPDATE_FRIEND = '@@friends/UPDATE_FRIEND',
  UPDATE_ALL_FRIENDS = '@@friends/UPDATE_ALL_FRIENDS',
}

export interface Friend {
  id: string;
  email: string;
  selected: boolean;
}

export type FriendsState = readonly Friend[];
