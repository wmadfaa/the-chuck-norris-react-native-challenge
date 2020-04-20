import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, IconProps, Icon, Layout} from '@ui-kitten/components';
import {ApplicationState, ApplicationDispatch} from '../../store';
import {fetchRandomJokesActionAsync, Joke} from '../../store/jokes';
import {MainStackParams} from '../../app/navigators';
import ScreenContainer from '../../containers/ScreenContainer/ScreenContainer';
import {ScreenNavigationProp} from '../../utils/ScreenProps';
import ROUTES from '../../configs/routes';
import Header from '../../components/Header/Header';
import Swiper, {LoadingCard} from '../../components/Swiper/Swiper';

import styles from './PickJoke.styles';

interface PickJokeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.PICK_JOKE> {}

const SendIcon = (props: IconProps) => <Icon {...props} name="share-outline" />;

const PickJokeScreen: React.FC<PickJokeScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<ApplicationDispatch>();
  const {jokes} = useSelector((state: ApplicationState) => state);
  const [activeJoke, setActiveJoke] = useState<Joke>();

  useEffect(() => {
    dispatch(fetchRandomJokesActionAsync.request());
  }, []);

  const handleLoadMoreJokes = () => {
    dispatch(fetchRandomJokesActionAsync.request());
  };

  const handleOnShareJoke = ({joke}: Joke) => {
    navigation.navigate(ROUTES.SHARE_JOKE, {selectedJoke: joke});
  };

  return (
    <ScreenContainer>
      <Header title="pick Joke" canGoBack={false} />
      <Layout level="2" style={styles.infos}>
        <Text category="s1" style={styles.title}>
          Select a joke to share is with you friend
        </Text>
        <Text category="c2" status="info">
          swipe the jokes cards to left/right to select the next joke
        </Text>
      </Layout>
      {jokes.jokes.length > 0 ? (
        <Swiper
          jokes={[...jokes.jokes]}
          onEndRetched={handleLoadMoreJokes}
          loading={jokes.loading.fetchJokes}
          onSelect={handleOnShareJoke}
          onChange={setActiveJoke}
        />
      ) : (
        <LoadingCard />
      )}
      <Button
        disabled={!activeJoke}
        style={styles.shareBtn}
        status="primary"
        accessoryLeft={SendIcon}
        onPress={() => activeJoke && handleOnShareJoke(activeJoke)}>
        Share
      </Button>
    </ScreenContainer>
  );
};

export default PickJokeScreen;
