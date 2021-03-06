import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Icon, IconProps, Spinner} from '@ui-kitten/components';
import {validate} from 'validate.js';
import filter from 'lodash.filter';
import {ApplicationState, ApplicationDispatch} from '../../store';
import {addFriendAction, Friend} from '../../store/friends';
import {MainStackParams} from '../../app/navigators';
import ScreenContainer from '../../containers/ScreenContainer/ScreenContainer';
import {ScreenNavigationProp} from '../../utils/ScreenProps';
import ROUTES from '../../configs/routes';
import Header from '../../components/Header/Header';
import FriendsList from '../../components/FriendsList/FriendsList';
import SearchAnFilterBar from '../../components/SearchAnFilterBar/SearchAnFilterBar';
import AddNewEmailInfoCard from './components/AddNewEmailInfoCard/AddNewEmailInfoCard';
import SortModal, {SortOptions} from './components/SortModal/SortModal';
import FilterModal, {FilterOptions} from './components/FilterModal/FilterModal';
import {
  sortFriendsByEmailDomainName,
  sortFriendsByEmailHostName,
  filterSelectedFriends,
  filterUnselectedFriends,
} from '../../utils/helpers';

import styles from './ShareJoke.styles';
import {sendJokeActionAsync} from '../../store/jokes/jokes.actions';
import EmptyFriendsListInfoCard from './components/EmptyFriendsListInfoCard/EmptyFriendsListInfoCard';

interface ShareJokeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.SHARE_JOKE> {}

const SendIcon = (props: IconProps) => (
  <Icon {...props} name="paper-plane-outline" />
);

const LoadingIndicator = (props: IconProps) => (
  <View style={[props.style, styles.loadingIndicator]}>
    <Spinner size="small" />
  </View>
);

interface SearchAndFilterInput {
  value: string;
  error?: string;
}

interface ShareJokeScreenState {
  showFilterModal: boolean;
  showSortModal: boolean;
  friendsData: Friend[];
  selectedFriends: Friend[];
  filterValue: string;
  sortValue: string;
  searchAndFilterInput: SearchAndFilterInput;
}

const ShareJokeScreen: React.FC<ShareJokeScreenProps> = ({route}) => {
  const {selectedJoke} = route.params;
  const dispatch = useDispatch<ApplicationDispatch>();
  const {friends, jokes} = useSelector((state: ApplicationState) => state);

  const [state, setState] = useState<ShareJokeScreenState>({
    showFilterModal: false,
    showSortModal: false,
    friendsData: [],
    selectedFriends: [],
    filterValue: '',
    sortValue: '',
    searchAndFilterInput: {
      value: '',
    },
  });

  useEffect(() => {
    const friendsData = [...friends];
    const selectedFriends = filterSelectedFriends(friendsData);
    setState((prev) => ({...prev, selectedFriends, friendsData}));
  }, [friends]);

  const filterFriendsData = (query: string) => {
    setState((prev) => ({
      ...prev,
      friendsData: filter([...friends], (friend) =>
        friend.email.substr(0, query.length).includes(query),
      ),
    }));
  };

  const handleOnSearchAnFilterInputChange = (val: string) => {
    setState((prev) => ({
      ...prev,
      searchAndFilterInput: {value: val.toLowerCase()},
    }));

    filterFriendsData(val.toLowerCase());
  };

  const handleClearSearchInput = () => {
    setState((prev) => ({
      ...prev,
      searchAndFilterInput: {value: ''},
      friendsData: [...friends],
    }));
  };

  const onAddBtnClick = () => {
    if (state.searchAndFilterInput.value && state.friendsData.length == 0) {
      const validationResult = validate(
        {
          [state.searchAndFilterInput.value]: state.searchAndFilterInput,
        },
        {
          [state.searchAndFilterInput.value]: {
            email: true,
          },
        },
      );
      if (!validationResult) {
        handleClearSearchInput();
        dispatch(addFriendAction(state.searchAndFilterInput.value));
      } else {
        setState((prev) => ({
          ...prev,
          searchAndFilterInput: {
            ...prev.searchAndFilterInput,
            error: validationResult[state.searchAndFilterInput.value][0],
          },
        }));
      }
    }
  };

  const handleToggleFilterModulePreview = () => {
    setState((prev) => ({...prev, showFilterModal: !prev.showFilterModal}));
  };

  const handleToggleSortModulePreview = () => {
    setState((prev) => ({...prev, showSortModal: !prev.showSortModal}));
  };

  const handleOnSortChange = (sortValue: string) => {
    setState((prev) => ({...prev, sortValue}));
  };

  const handleOnFilterChange = (filterValue: string) => {
    setState((prev) => ({...prev, filterValue}));
  };

  const handleSort = () => {
    let friendsData = state.filterValue ? state.friendsData : [...friends];

    let sortedFriendsData: Friend[] = friendsData;

    switch (state.sortValue) {
      case SortOptions.SORT_BY_EMAIL_DOMAIN: {
        sortedFriendsData = sortFriendsByEmailDomainName(friendsData);
        break;
      }
      case SortOptions.SORT_BY_EMAIL_HOST: {
        sortedFriendsData = sortFriendsByEmailHostName(friendsData);
        break;
      }
    }

    setState((prev) => ({
      ...prev,
      friendsData:
        sortedFriendsData.length > 0 ? sortedFriendsData : prev.friendsData,
      showSortModal: false,
    }));
  };

  const handleFilter = () => {
    let friendsData =
      state.filterValue || state.sortValue ? [...friends] : state.friendsData;
    let filteredFriendsData: Friend[] = friendsData;

    switch (state.filterValue) {
      case FilterOptions.FILTER_SELECTED_EMAILS: {
        filteredFriendsData = filterSelectedFriends(friendsData);
        break;
      }
      case FilterOptions.FILTER_UNSELECTED_EMAILS: {
        filteredFriendsData = filterUnselectedFriends(friendsData);
        break;
      }
    }

    setState((prev) => ({
      ...prev,
      friendsData:
        filteredFriendsData.length > 0 ? filteredFriendsData : prev.friendsData,
      showFilterModal: false,
    }));
  };

  const handleResetFilter = () => {
    console.log('on Reset');
    setState((prev) => ({
      ...prev,
      friendsData: [...friends],
      filterValue: '',
      sortValue: '',
    }));
  };

  const handleSendJoke = () => {
    dispatch(
      sendJokeActionAsync.request({
        friends: filterSelectedFriends(state.friendsData),
        joke: selectedJoke,
      }),
    );
  };

  return (
    <>
      <ScreenContainer>
        <Header title="share joke" canGoBack />
        <SearchAnFilterBar
          textContentType="emailAddress"
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          disableFilterAndSortActions={state.friendsData.length <= 1}
          status={state.searchAndFilterInput.error ? 'danger' : 'basic'}
          value={state.searchAndFilterInput.value}
          caption={state.searchAndFilterInput.error}
          onChangeText={handleOnSearchAnFilterInputChange}
          handleClearSearchInput={handleClearSearchInput}
          onAddBtnClick={onAddBtnClick}
          onSubmitEditing={onAddBtnClick}
          onFilterBtnClick={handleToggleFilterModulePreview}
          onSortBtnClick={handleToggleSortModulePreview}
          filterBtnLabel={state.filterValue || 'Filter'}
          sortByBtnLabel={state.sortValue || 'sort by'}
          disableClearActions={!(state.filterValue || state.sortValue)}
          onClearFilterClick={handleResetFilter}
        />
        {friends.length <= 0 ? (
          <EmptyFriendsListInfoCard />
        ) : state.friendsData.length == 0 && !!state.searchAndFilterInput ? (
          <AddNewEmailInfoCard
            searchedEmail={state.searchAndFilterInput.value}
          />
        ) : (
          <FriendsList friends={state.friendsData} />
        )}
        <Button
          style={{margin: 8}}
          status="primary"
          disabled={jokes.loading.sendJoke || state.selectedFriends.length == 0}
          onPress={handleSendJoke}
          accessoryLeft={jokes.loading.sendJoke ? LoadingIndicator : SendIcon}>
          {!jokes.loading.sendJoke ? 'Send Joke' : 'Sending Joke'}
        </Button>
      </ScreenContainer>
      {state.showFilterModal && (
        <FilterModal
          onClose={handleToggleFilterModulePreview}
          onApply={handleFilter}
          onReset={handleResetFilter}
          onChange={handleOnFilterChange}
          selectedValue={state.filterValue}
        />
      )}
      {state.showSortModal && (
        <SortModal
          onClose={handleToggleSortModulePreview}
          onApply={handleSort}
          onReset={handleResetFilter}
          onChange={handleOnSortChange}
          selectedValue={state.sortValue}
        />
      )}
    </>
  );
};

export default ShareJokeScreen;
