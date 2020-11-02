import * as types from './types';
import { TypeAction } from './typeActionTypes';
import { inferStringLiteral } from '../typeFunctions';

const initialState = {
  
}

export const ThemeReducer = (
  state = initialState,
  action: TypeAction,
) => {
  switch(action.type) {
    case(inferStringLiteral(types.GET_FILE)): {
      return state;
    }

    case(inferStringLiteral(types.GET_FILE_PENDING)): {
      return state;
    }

    case(inferStringLiteral(types.GET_FILE_ERROR)): {
      return state;
    }

    default: {
      return state;
    }
  }
}