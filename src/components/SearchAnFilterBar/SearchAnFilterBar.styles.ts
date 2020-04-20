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
    paddingVertical: 4,
    marginHorizontal: -4,
  },
  resetFilterContainer: {
    paddingVertical: 4,
    marginBottom: 4,
    marginHorizontal: -4,
  },
  addBtn: {
    height: Platform.OS == 'ios' ? 40 : 43.8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  filterBtn: {
    flexGrow: 1,
  },
  btn: {
    flexShrink: 1,
    marginHorizontal: 4,
    justifyContent: 'flex-start',
  },
  searchInput: {
    flexGrow: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  customBtn: {
    maxWidth: '75%',
  },
});
