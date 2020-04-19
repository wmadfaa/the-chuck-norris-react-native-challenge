import {createAsyncAction, action} from 'typesafe-actions';
import {JokesActionTypes, Joke} from './jokes.types';

export const removeErrorAction = (errorId: string) =>
  action(JokesActionTypes.REMOVE_ERROR, errorId);

export const fetchRandomJokesActionAsync = createAsyncAction(
  JokesActionTypes.FETCH_RANDOM_JOKES_REQUEST,
  JokesActionTypes.FETCH_RANDOM_JOKES_SUCCESS,
  JokesActionTypes.FETCH_RANDOM_JOKES_FAILURE,
  JokesActionTypes.FETCH_RANDOM_JOKES_CANCEL,
)<undefined, Joke[], Error, undefined>();
