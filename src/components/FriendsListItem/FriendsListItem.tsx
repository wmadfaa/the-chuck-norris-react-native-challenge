import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Icon, ListItem, CheckBox, Button} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {ApplicationDispatch} from '../../store';
import {
  updateFriendAction,
  removeFriendAction,
  Friend,
} from '../../store/friends';

const FriendsListItem: React.FC<Friend> = ({email, id, selected}) => {
  const swipeableRef = useRef<Swipeable>(null);
  const dispatch = useDispatch<ApplicationDispatch>();

  const onListItemActiveCheckedChange = () => {
    dispatch(updateFriendAction(id, !selected));
  };

  const handleOnDeletePress = () => {
    swipeableRef.current?.close();
    setTimeout(() => {
      dispatch(removeFriendAction(id));
    }, 300);
  };

  const renderRightActions = () => {
    return (
      <Button
        style={styles.deleteBtn}
        onPress={handleOnDeletePress}
        status="danger"
        accessoryRight={(props) => <Icon {...props} name="trash-2-outline" />}>
        DELETE
      </Button>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      leftThreshold={80}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      <ListItem
        onPress={onListItemActiveCheckedChange}
        title={email}
        accessoryLeft={(props) => <Icon {...props} name="person" />}
        accessoryRight={() => (
          <CheckBox
            checked={selected}
            onChange={onListItemActiveCheckedChange}
          />
        )}
      />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  deleteBtn: {
    borderRadius: 0,
  },
});

export default FriendsListItem;
