import {action} from 'typesafe-actions';

import {LayoutActionTypes, ThemeColors} from './layout.types';

export const setThemeAction = (theme: ThemeColors) =>
  action(LayoutActionTypes.SET_THEME, theme);
