import firebase from 'firebase';
// prettier-ignore
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGIN_USER_PENDING } from './constants';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text
});

const loginUserPending = () => ({
  type: LOGIN_USER_PENDING
});

const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

const loginUserFail = () => ({
  type: LOGIN_USER_FAIL
});

export const loginUser = (email, password) => dispatch => {
  dispatch(loginUserPending());
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => dispatch(loginUserSuccess(user)))
    .catch(error => {
      console.log('error', error);

      // Create a new user
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => dispatch(loginUserSuccess(user)))
        .catch(error2 => {
          console.log('error', error2);
          dispatch(loginUserFail());
        });
    });
};
