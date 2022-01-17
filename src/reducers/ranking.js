import { SET_SCORE_RANKING } from '../actions';

const INITIAL_STATE = '';

export default function ranking(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_SCORE_RANKING:
    return action.payload.ranking;
  default:
    return state;
  }
}
