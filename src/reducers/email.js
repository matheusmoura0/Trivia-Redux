import { SET_EMAIL_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function email(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EMAIL_ACTION:
    return { email: action.payload };
  default:
    return state;
  }
}

export default email;
