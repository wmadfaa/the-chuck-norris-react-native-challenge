import React from 'react';
import {List, Layout, Text, Divider} from '@ui-kitten/components';
import {Friend} from '../../store/friends';
import FriendsListItem from '../FriendsListItem/FriendsListItem';
import styles from './FriendsList.styles';

interface FriendsListProps {
  friends: Friend[];
}

const FriendsList: React.FC<FriendsListProps> = ({friends}) => {
  return (
    <Layout style={styles.root} level="2">
      <Layout style={styles.caption} level="3">
        <Text category="c2">Friends list</Text>
        <Divider />
      </Layout>
      <List
        style={styles.list}
        data={friends}
        renderItem={({item}: {item: Friend}) => <FriendsListItem {...item} />}
      />
    </Layout>
  );
};

export default FriendsList;
