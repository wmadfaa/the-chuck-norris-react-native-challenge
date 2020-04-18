import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../../store';
import {MainStackParams} from '../../app/navigators';
import ScreenContainer from '../../containers/ScreenContainer';
import {ScreenNavigationProp} from '../../utils/ScreenProps';
import ROUTES from '../../configs/routes';
import Header from '../../components/Header/Header';
import FriendsList from '../../components/FriendsList/FriendsList';

interface HomeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.HOME> {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const {friends} = useSelector((state: ApplicationState) => state);
  const [friendsData, setFriendsData] = useState([...friends]);

  return (
    <ScreenContainer>
      <Header />
      <FriendsList friends={friendsData} />
    </ScreenContainer>
  );
};

export default HomeScreen;
