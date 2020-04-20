import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {Card, Text, Layout} from '@ui-kitten/components';
import {Joke} from '../../../store/jokes';

import styles from './SwiperCard.styles';

export interface SwiperCardProps {
  joke: Joke;
  likeOpacity?: Animated.Node<number> | number;
  nopeOpacity?: Animated.Node<number> | number;
  onPress?(jokeId: Joke['id']): void;
}

const SwiperCard: React.FC<SwiperCardProps> = ({joke, onPress}) => {
  const handleOnPress = () => {
    if (onPress) {
      onPress(joke.id);
    }
  };
  return (
    <Layout style={StyleSheet.absoluteFill}>
      <Card
        onPress={handleOnPress}
        disabled={!handleOnPress}
        style={styles.card}>
        <Text>{joke.joke}</Text>
      </Card>
    </Layout>
  );
};

export default SwiperCard;
