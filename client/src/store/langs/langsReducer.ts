import * as types from './types';
import { LangsAction } from './langsActionTypes';
import { LangCardProps } from '../../components/pages/Home/LangCard';

export type LangsStore = {
  [key: string] : LangCardProps
}

const initialState: LangsStore = {
  go: {
    name: 'GoLang',
    color: '#00ACD7',
    extension: '.go',
    description: 'Modern and fast language for back-end'
  },
  JavaScript: {
    name: 'JavaScript',
    color: '#E8D44D',
    extension: '.js',
    description: 'Language for building interfaces'
  },
  TypeScript: {
    name: 'TypeScript',
    color: '#2F74C0',
    extension: '.ts',
    description: 'Version of JavaScript with types and other cool stuff'
  },
  cpp: {
    name: 'C++',
    color: '#F34B7D',
    extension: '.cpp',
    description: 'Garbage',
  }
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