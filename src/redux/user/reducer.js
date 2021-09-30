import { SET_USER, USER_IS_FETCHING } from './actions';

const user = (state = [null, true], action) => {
  switch (action.type) {
    case SET_USER:
      return [action.user, false];
    case USER_IS_FETCHING:
      return [null, true];
    default:
      return state;
  }
};

export default user;
