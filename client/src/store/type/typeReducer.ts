import * as types from './types';
import { TypeAction } from './typeActionTypes';

const initialState = {
  
}

export const ThemeReducer = (
  state = initialState,
  action: TypeAction,
) => {
  switch(action.type) {
    case(types.GET_FILE): {
      return state;
    }
    default: {
      return state;
    }
  }
}