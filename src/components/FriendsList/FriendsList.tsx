import React from 'react';
import {List} from '@ui-kitten/components';
import {Friend} from '../../store/friends';
import FriendsListItem from '../FriendsListItem/FriendsListItem';
import styles from './FriendsList.styles';

interface FriendsListProps {
  friends: Friend[];
}

const FriendsList: React.FC<FriendsListProps> = ({friends}) => {
  return (
    <List
      style={styles.root}
      data={friends}
      renderItem={({item}: {item: Friend}) => <FriendsListItem {...item} />}
    />
  );
};

export default FriendsList;
