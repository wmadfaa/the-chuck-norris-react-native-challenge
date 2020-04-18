import React from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {
  Button,
  Divider,
  Icon,
  IconProps,
  List,
  ListItem,
  ListItemProps,
  TopNavigation,
  TopNavigationAction,
  Layout,
  OverflowMenu,
  MenuItem,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';

import {ScreenNavigationProp} from '../../utils/ScreenProps';
import {MainStackParams} from '../../app/navigators';
import ROUTES from '../../configs/routes';

import {ApplicationDispatch, ApplicationState} from 'src/store';
import {ThemeColors, setThemeAction} from '../../store/layout';

import styles from './Home.styles';

interface HomeScreenProps
  extends ScreenNavigationProp<MainStackParams, ROUTES.HOME> {}

const MenuIcon = (props: IconProps) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props: IconProps) => <Icon {...props} name="info" />;

const ThemeColorIcon = (color: ThemeColors) => (props: IconProps) => {
  const iconName = color === 'light' ? 'sun-outline' : 'moon-outline';
  return <Icon {...props} name={iconName} />;
};

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const edgeInsets = useSafeArea();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const {theme} = useSelector((state: ApplicationState) => state.layout);
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
  const renderItemAccessory = () => <Button size="tiny">FOLLOW</Button>;

  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name="person" />
  );

  const renderItem = ({item, index}: {item: ListItemProps; index: number}) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

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
      <List style={styles.container} data={data} renderItem={renderItem} />
    </Layout>
  );
};

export default HomeScreen;
