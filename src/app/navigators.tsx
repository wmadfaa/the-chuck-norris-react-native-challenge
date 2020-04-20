import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ROUTES from '../configs/routes';

// screens
import ShareJokeScreen from '../screens/ShareJoke/ShareJoke.screen';
import PickJokeScreen from '../screens/PickJoke/PickJoke.screen';
import {Joke} from '../store/jokes/jokes.types';

export type MainStackParams = {
  [ROUTES.SHARE_JOKE]: {selectedJoke: Joke['joke']};
  [ROUTES.PICK_JOKE]: undefined;
};

const MainStack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name={ROUTES.PICK_JOKE} component={PickJokeScreen} />
      <MainStack.Screen name={ROUTES.SHARE_JOKE} component={ShareJokeScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
