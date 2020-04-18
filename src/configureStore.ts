import {Store, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer, Persistor} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {ApplicationState, ApplicationAction, RootReducer} from './store';

export type ApplicationStore = Store<ApplicationState, ApplicationAction>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export default function configureStore(): {
  store: ApplicationStore;
  persistor: Persistor;
} {
  const composeEnhancers = composeWithDevTools({});

  const persistedReducer = persistReducer(persistConfig, RootReducer);

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(createLogger())),
  );
  const persistor = persistStore(store as any);

  return {store, persistor};
}
