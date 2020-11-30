import * as types from "./types";
import { EditorAction } from "./editorActionTypes";

export type EditorStore = {
  boardChar: string;
  curRow: number;
  curChar: number;
  row: string[]
};

const initialState: EditorStore = {
  boardChar: "",
  curRow: 0,
  curChar: 0,
  row: []
};

export const editorReducer = (state = initialState, action: EditorAction) => {
  switch (action.type) {
    case types.CHANGE_BOARD_CHAR: { 
      return {...state, boardChar: action.payload };
    }
    case types.CHANGE_CUR_ROW: {
      return { ...state, curRow: state.curRow + action.payload, curChar: 0 };
    }
    case types.CHANGE_CUR_CHAR: {
      console.log("CHANGE_CUR_CHAR");
      return { ...state, curChar: state.curChar + action.payload };
    }
    case types.CHANGE_ROW: {
      console.log("ChangeRow");
      
      return { ...state, row: action.payload };
    }
    default: {
      return state;
    }
  }
};
