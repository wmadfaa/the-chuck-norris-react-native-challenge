import {Reducer} from 'redux';
import {ActionType} from 'typesafe-actions';
import {JokesState, JokesActionTypes} from './jokes.types';
import uniqBy from 'lodash.uniqby';
import merge from 'lodash.merge';

export type JokesAction = ActionType<typeof import('./jokes.actions')>;

export const initialState: JokesState = {
  jokes: [],
  errors: {
    fetchJokes: undefined,
    sendJoke: undefined,
  },
  loading: {
    fetchJokes: false,
    sendJoke: false,
  },
};

const reducer: Reducer<JokesState, JokesAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case JokesActionTypes.FETCH_RANDOM_JOKES_REQUEST: {
      return merge(
        {...state},
        {
          loading: {fetchJokes: true},
          errors: {fetchJokes: undefined},
        },
      );
    }
    case JokesActionTypes.FETCH_RANDOM_JOKES_SUCCESS: {
      return merge(
        {...state},
        {
          jokes: uniqBy([...state.jokes, ...action.payload], 'id'),
          loading: {fetchJokes: false},
        },
      );
    }
    case JokesActionTypes.FETCH_RANDOM_JOKES_FAILURE: {
      return merge(
        {...state},
        {
          loading: {fetchJokes: false},
          errors: {fetchJokes: action.payload},
        },
      );
    }
    case JokesActionTypes.FETCH_RANDOM_JOKES_CANCEL: {
      return merge(
        {...state},
        {
          loading: {fetchJokes: false},
        },
      );
    }

    case JokesActionTypes.SEND_JOKE_REQUEST: {
      const nextState = merge(
        {...state},
        {
          loading: {sendJoke: true},
          errors: {sendJoke: undefined},
        },
      );
      console.log(nextState);
      return nextState;
    }
    case JokesActionTypes.SEND_JOKE_SUCCESS: {
      const nextState = merge(
        {...state},
        {
          loading: {sendJoke: false},
        },
      );
      return nextState;
    }
    case JokesActionTypes.SEND_JOKE_FAILURE: {
      return merge(
        {...state},
        {
          loading: {sendJoke: false},
          errors: {sendJoke: action.payload},
        },
      );
    }
    case JokesActionTypes.SEND_JOKE_CANCEL: {
      return merge(
        {...state},
        {
          loading: {sendJoke: false},
        },
      );
    }
    case JokesActionTypes.REMOVE_ERROR: {
      return merge(
        {...state},
        {
          errors: {[action.payload]: undefined},
        },
      );
    }
    default: {
      return state;
    }
  }
};

export {reducer as JokesReducer};
