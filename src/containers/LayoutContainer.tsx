import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ApplicationState} from '../store';
import {ThemeColors, setThemeAction} from '../store/layout';

interface LayoutContainerStoreProps {
  theme: ThemeColors;
  setTheme: (theme: ThemeColors) => void;
}

export interface LayoutContainerProps {
  children?: (props: LayoutContainerStoreProps) => React.ReactElement;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({children}) => {
  const {theme} = useSelector((state: ApplicationState) => state.layout);
  const dispatch = useDispatch();

  const setTheme = (color: ThemeColors) => dispatch(setThemeAction(color));

  if (!children) return <></>;
  return children({theme, setTheme});
};

export default LayoutContainer;
