import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Text, Button, Icon, IconProps} from '@ui-kitten/components';
import {validate} from 'validate.js';
import {ApplicationState, ApplicationDispatch} from '../../store';
import {addFriendAction} from '../../store/friends/friends.actions';
import {MainStackParams} from '../../app/navigators';
import ScreenContainer from '../../containers/ScreenContainer';
import {ScreenNavigationProp} from '../../utils/ScreenProps';
import ROUTES from '../../configs/routes';
import Header from '../../components/Header/Header';
import FriendsList from '../../components/FriendsList/FriendsList';
import SearchAnFilterBar from '../../components/SearchAnFilterBar/SearchAnFilterBar';

interface HomeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.HOME> {}

const SendIcon = (props: IconProps) => (
  <Icon {...props} name="paper-plane-outline" />
);

interface SearchAndFilterInput {
  value: string;
  error?: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({route}) => {
  const {selectedJokeId} = route.params;
  const dispatch = useDispatch<ApplicationDispatch>();
  const {friends} = useSelector((state: ApplicationState) => state);
  const [searchAndFilterInput, setSearchAndFilterInput] = useState<
    SearchAndFilterInput
  >({
    value: '',
  });
  const [friendsData, setFriendsData] = useState([...friends]);

  useEffect(() => {
    setFriendsData([...friends]);
  }, [friends]);

  const filterFriendsData = (query: string) => {
    setFriendsData(friends.filter((friend) => friend.email.includes(query)));
  };

  const handleOnSearchAnFilterInputChange = (val: string) => {
    setSearchAndFilterInput({value: val.toLowerCase()});
    filterFriendsData(val.toLowerCase());
  };
  const handleClearSearchInput = () => {
    setSearchAndFilterInput({value: ''});
    setFriendsData([...friends]);
  };

  const onAddBtnClick = () => {
    if (searchAndFilterInput && friendsData.length == 0) {
      const validationResult = validate(
        {[searchAndFilterInput.value]: searchAndFilterInput},
        {
          [searchAndFilterInput.value]: {
            email: true,
          },
        },
      );
      if (!validationResult) {
        handleClearSearchInput();
        dispatch(addFriendAction(searchAndFilterInput.value));
      } else {
        setSearchAndFilterInput((prev) => ({
          ...prev,
          error: validationResult[prev.value][0],
        }));
      }
    }
  };

  return (
    <ScreenContainer>
      <Header title="add & select friends emails" canGoBack />
      <SearchAnFilterBar
        textContentType="emailAddress"
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="go"
        autoCapitalize="none"
        autoCorrect={false}
        status={searchAndFilterInput.error ? 'danger' : 'basic'}
        value={searchAndFilterInput.value}
        caption={searchAndFilterInput.error}
        onChangeText={handleOnSearchAnFilterInputChange}
        handleClearSearchInput={handleClearSearchInput}
        onAddBtnClick={onAddBtnClick}
        onSubmitEditing={onAddBtnClick}
      />
      {friends.length != 0 &&
      friendsData.length == 0 &&
      !!searchAndFilterInput ? (
        <Card status="info" style={{margin: 16}}>
          <Text category="p1">
            <Text category="label">{searchAndFilterInput.value}</Text> is not in
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
