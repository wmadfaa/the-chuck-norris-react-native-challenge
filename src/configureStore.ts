import {Store, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer, Persistor} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {
  ApplicationState,
  ApplicationAction,
  RootReducer,
  RootSaga,
} from './store';

export type ApplicationStore = Store<ApplicationState, ApplicationAction>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['jokes'],
};

export default function configureStore(): {
  store: ApplicationStore;
  persistor: Persistor;
} {
  const composeEnhancers = composeWithDevTools({});

  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(persistConfig, RootReducer);

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, createLogger())),
  );
  const persistor = persistStore(store as any);

  sagaMiddleware.run(RootSaga);
  return {store, persistor};
}
