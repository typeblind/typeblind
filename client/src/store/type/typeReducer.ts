import * as types from './types';
import { TypeAction } from './typeActionTypes';
import { inferStringLiteral } from '../typeFunctions';

export interface TypingStore {
  loading: boolean;
  error: Error | null
  lines: Array<string[]> // Array of string arrays
}

const initialState = {
  loading: false,
  error: null,
  lines: [],
}

export const TypingReducer = (
  state = initialState,
  action: TypeAction,
) => {
  switch(action.type) {
    case(inferStringLiteral(types.GET_FILE)): {
      console.log("GET FILE")
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        error: null,
        lines: action.payload,
      };
    }

    case(inferStringLiteral(types.GET_FILE_PENDING)): {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case(inferStringLiteral(types.GET_FILE_ERROR)): {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}