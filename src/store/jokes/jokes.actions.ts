import {createAsyncAction, action} from 'typesafe-actions';
import {JokesActionTypes, Joke, JokesState} from './jokes.types';
import {Friend} from '../friends/friends.types';

export const removeErrorAction = (key: keyof JokesState['errors']) =>
  action(JokesActionTypes.REMOVE_ERROR, key);

export const fetchRandomJokesActionAsync = createAsyncAction(
  JokesActionTypes.FETCH_RANDOM_JOKES_REQUEST,
  JokesActionTypes.FETCH_RANDOM_JOKES_SUCCESS,
  JokesActionTypes.FETCH_RANDOM_JOKES_FAILURE,
  JokesActionTypes.FETCH_RANDOM_JOKES_CANCEL,
)<undefined, Joke[], Error, undefined>();

export const sendJokeActionAsync = createAsyncAction(
  JokesActionTypes.SEND_JOKE_REQUEST,
  JokesActionTypes.SEND_JOKE_SUCCESS,
  JokesActionTypes.SEND_JOKE_FAILURE,
  JokesActionTypes.SEND_JOKE_CANCEL,
)<{friends: Friend[]; joke: Joke}, undefined, Error, undefined>();
