import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ROUTES from '../configs/routes';

// screens
import HomeScreen from '../screens/Home/Home.screen';
import PickJokeScreen from '../screens/PickJoke/PickJoke.screen';
import {Joke} from '../store/jokes/jokes.types';

export type MainStackParams = {
  [ROUTES.HOME]: {selectedJokeId: Joke['id']};
  [ROUTES.PICK_JOKE]: undefined;
};

const MainStack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name={ROUTES.PICK_JOKE} component={PickJokeScreen} />
      <MainStack.Screen name={ROUTES.HOME} component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
