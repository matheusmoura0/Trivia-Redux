export const SET_EMAIL_ACTION = 'SET_EMAIL';
export const TOKEN_ACTION = 'TOKEN_ACTION';

export const tokenAction = (payload) => ({
  type: TOKEN_ACTION,
  payload,
});
