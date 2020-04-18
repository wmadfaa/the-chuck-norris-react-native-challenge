import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ROUTES from '../configs/routes';

// screens
import HomeScreen from '../screens/Home/Home.screen';

export type MainStackParams = {
  [ROUTES.HOME]: undefined;
};

const MainStack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name={ROUTES.HOME} component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
