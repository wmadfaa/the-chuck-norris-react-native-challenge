import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from '../configureStore';

// layouts
import LayoutContainer from '../containers/LayoutContainer';

import MainNavigator from './navigators';

const {store, persistor} = configureStore();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LayoutContainer>
            {({theme}) => (
              <ApplicationProvider {...eva} theme={eva[theme]}>
                <NavigationContainer>
                  <MainNavigator />
                </NavigationContainer>
              </ApplicationProvider>
            )}
          </LayoutContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
