import React from 'react';
import { MainStackParams } from '../../app/navigators';
import ScreenContainer from '../../containers/ScreenContainer';
import { ScreenNavigationProp } from '../../utils/ScreenProps';
import ROUTES from '../../configs/routes';
import Header from '../../components/Header/Header';
import { Profile } from '../../components/Swiper/SwiperCard';
import Swiper from '../../components/Swiper/Swiper';

interface PickJokeScreenProps extends ScreenNavigationProp<MainStackParams, ROUTES.PICK_JOKE> {}

const profiles: Profile[] = [
	{
		id: '1',
		name: 'Caroline',
		age: 24
	},
	{
		id: '2',
		name: 'Jack',
		age: 30
	},
	{
		id: '3',
		name: 'Anet',
		age: 21
	},
	{
		id: '4',
		name: 'John',
		age: 28
	}
];

const PickJokeScreen: React.FC<PickJokeScreenProps> = () => {
	return (
		<ScreenContainer>
			<Header title="pick Joke" />
			<Swiper {...{ profiles }} />
		</ScreenContainer>
	);
};

export default PickJokeScreen;
