export enum JokesActionTypes {
  REMOVE_ERROR = '@@jokes/REMOVE_ERROR',

  FETCH_RANDOM_JOKES_REQUEST = '@@jokes/FETCH_RANDOM_JOKES_REQUEST',
  FETCH_RANDOM_JOKES_SUCCESS = '@@jokes/FETCH_RANDOM_JOKES_SUCCESS',
  FETCH_RANDOM_JOKES_FAILURE = '@@jokes/FETCH_RANDOM_JOKES_FAILURE',
  FETCH_RANDOM_JOKES_CANCEL = '@@jokes/FETCH_RANDOM_JOKES_CANCEL',

  SEND_JOKE_REQUEST = '@@jokes/SEND_JOKE_REQUEST',
  SEND_JOKE_SUCCESS = '@@jokes/SEND_JOKE_SUCCESS',
  SEND_JOKE_FAILURE = '@@jokes/SEND_JOKE_FAILURE',
  SEND_JOKE_CANCEL = '@@jokes/SEND_JOKE_CANCEL',
}

export interface Joke {
  id: string;
  joke: string;
  categories: string[];
}

export interface JokesState {
  readonly jokes: Joke[];
  readonly errors: {
    fetchJokes?: Error;
    sendJoke?: Error;
  };
  readonly loading: {
    fetchJokes: boolean;
    sendJoke: boolean;
  };
}
