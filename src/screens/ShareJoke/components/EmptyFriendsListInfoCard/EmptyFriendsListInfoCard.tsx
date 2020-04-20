import React from 'react';
import {Layout, Card, Text} from '@ui-kitten/components';

export interface EmptyFriendsListInfoCardProps {}

const EmptyFriendsListInfoCard: React.FC<EmptyFriendsListInfoCardProps> = () => {
  return (
    <Layout style={{flex: 1, alignSelf: 'stretch'}}>
      <Card status="info" style={{margin: 16}}>
        <Text category="p1">
          your friends list is Empty! {'\n'}
          add new friends using the{' '}
          <Text category="label">search and add new e-mail </Text>form on the
          top 👆.
        </Text>
      </Card>
    </Layout>
  );
};

export default EmptyFriendsListInfoCard;
