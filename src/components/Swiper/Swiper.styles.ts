import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    margin: 8,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cards: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingCard: {
    padding: 16,
    alignSelf: 'center',
    alignItems: 'center',
  },
  loadingCaption: {
    marginTop: 8,
  },
});
