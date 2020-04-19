import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, IconProps, Icon} from '@ui-kitten/components';
import {ApplicationState, ApplicationDispatch} from '../../store';
import {fetchRandomJokesActionAsync} from '../../store/jokes/jokes.actions';
import {MainStackParams} from '../../app/navigators';
import ScreenContainer from '../../containers/ScreenContainer';
import {ScreenNavigationProp} from '../../utils/ScreenProps';
import ROUTES from '../../configs/routes';
import Header from '../../components/Header/Header';
import Swiper from '../../components/Swiper/Swiper';

interface PickJokeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.PICK_JOKE> {}

const SendIcon = (props: IconProps) => <Icon {...props} name="share-outline" />;

const PickJokeScreen: React.FC<PickJokeScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<ApplicationDispatch>();
  const {jokes} = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    if (jokes.jokes.length == 0) {
      dispatch(fetchRandomJokesActionAsync.request());
    }
  }, []);

  const handleLoadMoreJokes = () => {
    dispatch(fetchRandomJokesActionAsync.request());
  };

  return (
    <ScreenContainer>
      <Header title="pick Joke" canGoBack={false} />
      <Text category="h6" style={{padding: 16}}>
        Select a joke to share is with you friend
      </Text>
      {jokes.jokes.length > 0 && (
        <Swiper
          jokes={[...jokes.jokes]}
          onEndRetched={handleLoadMoreJokes}
          loading={jokes.isLoading}
        />
      )}
      <Button
        style={{margin: 8}}
        status="primary"
        accessoryLeft={SendIcon}
        onPress={() => navigation.navigate(ROUTES.HOME)}>
        Share
      </Button>
    </ScreenContainer>
  );
};

export default PickJokeScreen;
