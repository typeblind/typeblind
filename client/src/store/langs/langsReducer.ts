import * as types from './types';
import { LangsAction } from './langsActionTypes';

export type LangsStore = {
  [key: string] : {
    name: string;
    color: string;
    ext: string;
  }
}

const initialState = {
  go: {
    name: 'GoLang',
    color: '#00ACD7',
    ext: '.go',
  },
  js: {
    name: 'JavaScript',
    color: '#E8D44D',
    ext: '.js'
  },
  ts: {
    name: 'TypeScript',
    color: '#2F74C0',
    ext: '.ts',
  },

}

export const langsReducer = (
  state = initialState,
  action: LangsAction
) => {
  switch(action.type) {
    case (types.SELECT_LANG): {
      return state;
    }
    default: {
      return state
    }
  }
}