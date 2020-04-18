import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ApplicationState, ApplicationDispatch} from '../../store';
import {addFriendAction} from '../../store/friends/friends.actions';
import {MainStackParams} from '../../app/navigators';
import ScreenContainer from '../../containers/ScreenContainer';
import {ScreenNavigationProp} from '../../utils/ScreenProps';
import ROUTES from '../../configs/routes';
import Header from '../../components/Header/Header';
import FriendsList from '../../components/FriendsList/FriendsList';
import SearchAnFilterBar from '../../components/SearchAnFilterBar/SearchAnFilterBar';
import {Card, Text, Button, Icon, IconProps} from '@ui-kitten/components';

interface HomeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.HOME> {}

const SendIcon = (props: IconProps) => (
  <Icon {...props} name="paper-plane-outline" />
);

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch<ApplicationDispatch>();
  const {friends} = useSelector((state: ApplicationState) => state);
  const [searchAndFilterInputValue, setSearchAndFilterInputValue] = useState(
    '',
  );
  const [friendsData, setFriendsData] = useState([...friends]);

  useEffect(() => {
    setFriendsData([...friends]);
  }, [friends]);

  const filterFriendsData = (query: string) => {
    setFriendsData(friends.filter((friend) => friend.email.includes(query)));
  };

  const handleOnSearchAnFilterInputChange = (val: string) => {
    setSearchAndFilterInputValue(val.toLowerCase());
    filterFriendsData(val.toLowerCase());
  };
  const handleClearSearchInput = () => {
    setSearchAndFilterInputValue('');
    setFriendsData([...friends]);
  };
  const onAddBtnClick = () => {
    if (searchAndFilterInputValue && friendsData.length == 0) {
      handleClearSearchInput();
      dispatch(addFriendAction(searchAndFilterInputValue));
    }
  };

  return (
    <ScreenContainer>
      <Header title="add friends emails" canGoBack />
      <SearchAnFilterBar
        textContentType="emailAddress"
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="go"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchAndFilterInputValue}
        onChangeText={handleOnSearchAnFilterInputChange}
        handleClearSearchInput={handleClearSearchInput}
        onAddBtnClick={onAddBtnClick}
        onSubmitEditing={onAddBtnClick}
      />
      {friends.length != 0 &&
      friendsData.length == 0 &&
      !!searchAndFilterInputValue ? (
        <Card status="info" style={{margin: 16}}>
          <Text category="p1">
            <Text category="label">{searchAndFilterInputValue}</Text> is not in
            your friends list yet! {'\n'}
            you can add it by clicking on the add new friend button.
          </Text>
        </Card>
      ) : (
        <FriendsList friends={friendsData} />
      )}
      <Button style={{margin: 8}} status="primary" accessoryLeft={SendIcon}>
        Send Jokes
      </Button>
    </ScreenContainer>
  );
};

export default HomeScreen;
