import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  root: {
    flexDirection: 'column',
    paddingHorizontal: 8,
  },
  searchContainer: {
    paddingTop: 8,
    flexDirection: 'row',
  },
  filterAndOrderContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginHorizontal: -4,
  },
  addBtn: {
    height: Platform.OS == 'ios' ? 40 : 43.8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  filterBtn: {
    flexGrow: 1,
    flexShrink: 1,
  },
  btn: {
    marginHorizontal: 4,
    justifyContent: 'flex-start',
  },
  searchInput: {
    flexGrow: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
