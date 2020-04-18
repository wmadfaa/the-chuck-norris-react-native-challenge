import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  btn: {
    height: 40,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  searchInput: {
    flexGrow: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
