import React from 'react';
import {
  Divider,
  Icon,
  IconProps,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationDispatch, ApplicationState} from '../../store';
import {ThemeColors, setThemeAction} from '../../store/layout';

interface HeaderProps {}

const MenuIcon = (props: IconProps) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props: IconProps) => <Icon {...props} name="info" />;

const ThemeColorIcon = (color: ThemeColors) => (props: IconProps) => {
  const iconName = color === 'light' ? 'sun-outline' : 'moon-outline';
  return <Icon {...props} name={iconName} />;
};

const Header: React.FC<HeaderProps> = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const {
    layout: {theme},
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

  return (
    <>
      <TopNavigation title="add Emails" accessoryRight={renderSettingsAction} />
      <Divider />
    </>
  );
};

export default Header;
