import request, { url } from '../../services/request';

export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const USER_IS_FETCHING = 'USER_IS_FETCHING';

export const userIsFetching = () => ({ type: USER_IS_FETCHING });
const setUser = (user) => ({ type: SET_USER, user });

export const fetchUser = () => async (dispatch) => {
  request('/me', 'GET')
    .then((user) => {
      dispatch(setUser(user));
    })
    .catch((err) => dispatch(setUser(null)));
};

export const signIn = (credentials, history) => async (dispatch) =>
  request('/login', 'POST', credentials).then(async () => {
    await dispatch(fetchUser());
    history.goBack();
  });

export const signOut = () => async (dispatch) => {
  request('/logout', 'POST').then(() => dispatch(setUser(null)));
};
