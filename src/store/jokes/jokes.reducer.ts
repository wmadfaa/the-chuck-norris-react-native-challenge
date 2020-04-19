import {Reducer} from 'redux';
import {ActionType} from 'typesafe-actions';
import {JokesState, JokesActionTypes} from './jokes.types';

export type JokesAction = ActionType<typeof import('./jokes.actions')>;

export const initialState: JokesState = {
  jokes: [],
  isLoading: false,
};

const reducer: Reducer<JokesState, JokesAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case JokesActionTypes.FETCH_RANDOM_JOKES_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    case JokesActionTypes.FETCH_RANDOM_JOKES_SUCCESS: {
      return {
        ...state,
        jokes: [...state.jokes, ...action.payload],
        isLoading: false,
      };
    }
    case JokesActionTypes.FETCH_RANDOM_JOKES_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case JokesActionTypes.FETCH_RANDOM_JOKES_CANCEL: {
      return {...state, isLoading: false};
    }
    case JokesActionTypes.REMOVE_ERROR: {
      return {...state, error: undefined};
    }
    default: {
      return state;
    }
  }
};

export {reducer as JokesReducer};
