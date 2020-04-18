import React from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {
  Divider,
  Icon,
  IconProps,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
  Layout,
  OverflowMenu,
  MenuItem,
  CheckBox,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';

import {ScreenNavigationProp} from '../../utils/ScreenProps';
import {MainStackParams} from '../../app/navigators';
import ROUTES from '../../configs/routes';

import {ApplicationDispatch, ApplicationState} from 'src/store';
import {ThemeColors, setThemeAction} from '../../store/layout';

import styles from './Home.styles';
import {Friend} from '../../store/friends/friends.types';
import {updateFriendAction} from '../../store/friends/friends.actions';

interface HomeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.HOME> {}

const MenuIcon = (props: IconProps) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props: IconProps) => <Icon {...props} name="info" />;

const ThemeColorIcon = (color: ThemeColors) => (props: IconProps) => {
  const iconName = color === 'light' ? 'sun-outline' : 'moon-outline';
  return <Icon {...props} name={iconName} />;
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const edgeInsets = useSafeArea();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const {
    layout: {theme},
    friends,
  } = useSelector((state: ApplicationState) => state);
  const dispatch = useDispatch<ApplicationDispatch>();

  const setTheme = (color: ThemeColors) => () => {
    dispatch(setThemeAction(color));
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderSettingsAction = () => {
    const nextThemeColor: ThemeColors = theme === 'light' ? 'dark' : 'light';
    return (
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryRight={InfoIcon} title="About" />
        <MenuItem
          // @ts-ignore
          onPress={setTheme(nextThemeColor)}
          accessoryRight={ThemeColorIcon(nextThemeColor)}
          title={`switch to ${nextThemeColor} theme`}
        />
      </OverflowMenu>
    );
  };

  const onListItemActiveCheckedChange = (
    id: Friend['id'],
    selected: Friend['selected'],
  ) => () => {
    dispatch(updateFriendAction(id, selected));
  };

  const renderItem = ({item}: {item: Friend}) => {
    return (
      <ListItem
        onPress={onListItemActiveCheckedChange(item.id, !item.selected)}
        title={item.email}
        accessoryLeft={(props) => <Icon {...props} name="person" />}
        accessoryRight={() => (
          <CheckBox
            checked={item.selected}
            onChange={onListItemActiveCheckedChange(item.id, !item.selected)}
          />
        )}
      />
    );
  };

  return (
    <Layout
      style={[
        styles.root,
        {
          paddingTop: edgeInsets.top,
          paddingBottom: edgeInsets.bottom,
          paddingLeft: edgeInsets.left,
          paddingRight: edgeInsets.right,
        },
      ]}>
      <TopNavigation title="add Emails" accessoryRight={renderSettingsAction} />
      <Divider />
      <List style={styles.container} data={friends} renderItem={renderItem} />
    </Layout>
  );
};

export default HomeScreen;
