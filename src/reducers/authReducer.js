// prettier-ignore
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_PENDING
} from '../actions/constants';

const initState = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      console.log('email', action.payload);
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case LOGIN_USER_PENDING:
      return { ...state, loading: true, error: '' };

    case LOGIN_USER_SUCCESS:
      console.log('success');
      return { ...state, ...initState, user: action.payload };

    case LOGIN_USER_FAIL:
      console.log('failed');
      return { ...state, ...initState, error: 'Authentication Failed' };

    default:
      return state;
  }
};

export default authReducer;
