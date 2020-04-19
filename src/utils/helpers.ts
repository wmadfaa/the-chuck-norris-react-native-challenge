import orderBy from 'lodash.orderby';
import {Friend} from '../store/friends';

export const sortFriendsByEmailDomainName = (friends: Friend[]) => {
  return orderBy(friends, [
    ({email}) => email.substring(email.lastIndexOf('@') + 1),
  ]);
};

export const sortFriendsByEmailHostName = (friends: Friend[]) => {
  return orderBy(friends, [
    ({email}) => email.substring(0, email.lastIndexOf('@')),
  ]);
};
