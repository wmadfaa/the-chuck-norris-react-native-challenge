import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {Joke} from '../../store/jokes';
import {Card, Text, Layout} from '@ui-kitten/components';

export interface SwiperCardProps {
  joke: Joke;
  likeOpacity?: Animated.Node<number> | number;
  nopeOpacity?: Animated.Node<number> | number;
}

const SwiperCard: React.FC<SwiperCardProps> = ({joke}) => {
  return (
    <Layout style={StyleSheet.absoluteFill}>
      <Card
        disabled
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text>{joke.joke}</Text>
      </Card>
    </Layout>
  );
};

export default SwiperCard;
