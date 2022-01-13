import { TOKEN_ACTION } from '../actions';

const INITIAL_STATE = {
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN_ACTION:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default player;
