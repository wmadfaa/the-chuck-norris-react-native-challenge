// Example for using discriminated union types.
export type ThemeColors = 'light' | 'dark';

export enum LayoutActionTypes {
  SET_THEME = '@@layout/SET_THEME',
}

export interface LayoutState {
  readonly theme: ThemeColors;
}
