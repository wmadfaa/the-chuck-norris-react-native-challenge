import React from 'react';
import { MainStackParams } from '../../app/navigators';
import ScreenContainer from '../../containers/ScreenContainer';
import { ScreenNavigationProp } from '../../utils/ScreenProps';
import ROUTES from '../../configs/routes';
import Header from '../../components/Header/Header';

interface PickJokeScreenProps extends ScreenNavigationProp<MainStackParams, ROUTES.PICK_JOKE> {}

const PickJokeScreen: React.FC<PickJokeScreenProps> = () => {
	return (
		<ScreenContainer>
			<Header title="pick Joke" />
			{}
		</ScreenContainer>
	);
};

export default PickJokeScreen;
