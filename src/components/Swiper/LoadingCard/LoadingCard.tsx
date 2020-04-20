import React from 'react';
import {Layout, Spinner, Text} from '@ui-kitten/components';

import styles from './LoadingCard.styles';

const LoadingCard: React.FC = () => {
  return (
    <Layout style={styles.root}>
      <Layout style={styles.loadingCard} level="3">
        <Spinner size="giant" />
        <Text category="c2" style={styles.loadingCaption}>
          ...loading the jokes
        </Text>
      </Layout>
    </Layout>
  );
};

export default LoadingCard;
