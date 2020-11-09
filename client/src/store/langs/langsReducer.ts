import * as types from './types';
import { LangsAction } from './langsActionTypes';
import { LangCardProps } from '../../components/pages/Home/LangCard';

export type LangsStore = {
  [key: string] : LangCardProps
}

const initialState: LangsStore = {
  Go: {
    name: 'Go',
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
  },
  Rust: {
    name: "Rust",
    color: "#EF4A00",
    extension: ".rs",
    description: "Language for Robust software"
  },
  Swift: {
    name: "Swift",
    color: "#FE502D",
    extension: ".swift",
    description: "Languge to develop apps for Apple devices",
  },
  CSharp: {
    name:"C#",
    color: "#2D0076",
    extension: "C#",
    description: "Modern language from Microsoft",
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