import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Icon, IconProps} from '@ui-kitten/components';
import {validate} from 'validate.js';
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
import FilterModal from './components/SortModal/FilterModal';
import SortModal from './components/FilterModal/FilterModal';

interface ShareJokeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.SHARE_JOKE> {}

const SendIcon = (props: IconProps) => (
  <Icon {...props} name="paper-plane-outline" />
);

interface SearchAndFilterInput {
  value: string;
  error?: string;
}

interface ShareJokeScreenState {
  showFilterModal: boolean;
  showSortModal: boolean;
  friendsData: Friend[];
  filterValue?: string;
  sortValue?: string;
  searchAndFilterInput: SearchAndFilterInput;
}

const ShareJokeScreen: React.FC<ShareJokeScreenProps> = ({route}) => {
  const {selectedJokeId} = route.params;
  const dispatch = useDispatch<ApplicationDispatch>();
  const {friends} = useSelector((state: ApplicationState) => state);

  const [state, setState] = useState<ShareJokeScreenState>({
    showFilterModal: false,
    showSortModal: false,
    friendsData: [...friends],
    searchAndFilterInput: {
      value: '',
    },
  });

  useEffect(() => {
    setState((prev) => ({...prev, friendsData: [...friends]}));
  }, [friends]);

  const filterFriendsData = (query: string) => {
    setState((prev) => ({
      ...prev,
      friendsData: friends.filter((friend) => friend.email.includes(query)),
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
    if (state.searchAndFilterInput && state.friendsData.length == 0) {
      const validationResult = validate(
        {[state.searchAndFilterInput.value]: state.searchAndFilterInput},
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
            error: validationResult[prev.searchAndFilterInput.value][0],
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

  const handleOnSortChange = (filterValue: string) => {
    setState((prev) => ({...prev, filterValue}));
  };

  const handleOnFilterChange = (filterValue: string) => {
    setState((prev) => ({...prev, filterValue}));
  };

  const handleSort = () => {};

  const handleResetSort = () => {};

  const handleFilter = () => {};

  const handleResetFilter = () => {};

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
          status={state.searchAndFilterInput.error ? 'danger' : 'basic'}
          value={state.searchAndFilterInput.value}
          caption={state.searchAndFilterInput.error}
          onChangeText={handleOnSearchAnFilterInputChange}
          handleClearSearchInput={handleClearSearchInput}
          onAddBtnClick={onAddBtnClick}
          onSubmitEditing={onAddBtnClick}
          onFilterBtnClick={handleToggleFilterModulePreview}
          onSortBtnClick={handleToggleSortModulePreview}
        />
        {friends.length != 0 &&
        state.friendsData.length == 0 &&
        !!state.searchAndFilterInput ? (
          <AddNewEmailInfoCard
            searchedEmail={state.searchAndFilterInput.value}
          />
        ) : (
          <FriendsList friends={state.friendsData} />
        )}
        <Button style={{margin: 8}} status="primary" accessoryLeft={SendIcon}>
          Send Jokes
        </Button>
      </ScreenContainer>
      {state.showFilterModal && (
        <FilterModal
          onClose={handleToggleFilterModulePreview}
          onReset={handleResetFilter}
          onApply={handleFilter}
          onChange={handleOnFilterChange}
          selectedValue={state.filterValue}
        />
      )}
      {state.showSortModal && (
        <SortModal
          onClose={handleToggleSortModulePreview}
          onReset={handleResetSort}
          onApply={handleSort}
          onChange={handleOnSortChange}
          selectedValue={state.sortValue}
        />
      )}
    </>
  );
};

export default ShareJokeScreen;
