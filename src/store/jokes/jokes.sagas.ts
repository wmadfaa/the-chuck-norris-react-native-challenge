import {call, put, all, takeEvery, cancelled} from 'redux-saga/effects';
import * as JokesActions from './jokes.actions';
import {fetchRandomJokes} from './jokes.api';

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

function* rootSaga() {
  yield all([
    takeEvery(
      JokesActions.fetchRandomJokesActionAsync.request,
      fetchRandomJokesSaga,
    ),
  ]);
}

export {rootSaga as JokesRootSaga};
