import {call, put, all, takeEvery, cancelled} from 'redux-saga/effects';
import map from 'lodash.map';
import * as JokesActions from './jokes.actions';
import {fetchRandomJokes, sendJoke} from './jokes.api';

function* fetchRandomJokesSaga() {
  const controller = new AbortController();
  const {signal} = controller;
  try {
    const data = yield call(fetchRandomJokes, 6, signal);
    yield put(JokesActions.fetchRandomJokesActionAsync.success(data.value));
  } catch (err) {
    yield put(JokesActions.fetchRandomJokesActionAsync.failure(err));
  } finally {
    if (yield cancelled()) {
      controller.abort();
      yield put(JokesActions.fetchRandomJokesActionAsync.cancel());
    }
  }
}

function* sendJokeSaga({
  payload: {friends, joke},
}: ReturnType<typeof JokesActions.sendJokeActionAsync.request>) {
  const controller = new AbortController();
  const {signal} = controller;
  try {
    yield call(sendJoke, map(friends, 'email'), joke.joke, signal);
    yield put(JokesActions.sendJokeActionAsync.success());
  } catch (err) {
    yield put(JokesActions.sendJokeActionAsync.failure(err));
  } finally {
    if (yield cancelled()) {
      controller.abort();
      yield put(JokesActions.sendJokeActionAsync.cancel());
    }
  }
}

function* rootSaga() {
  yield all([
    takeEvery(
      JokesActions.fetchRandomJokesActionAsync.request,
      fetchRandomJokesSaga,
    ),
    takeEvery(JokesActions.sendJokeActionAsync.request, sendJokeSaga),
  ]);
}

export {rootSaga as JokesRootSaga};
