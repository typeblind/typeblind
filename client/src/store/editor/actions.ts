import * as types from './types'
import {inferStringLiteral} from '../typeFunctions';

export const ChangeBoardChar = (newChar: string) => ({
    type: inferStringLiteral(types.CHANGE_BOARD_CHAR),
    payload: newChar,
  });

export const ChangeRow = (row: number) => ({
    type: inferStringLiteral(types.CHANGE_CUR_ROW),
    payload: row
})

export const ChangeChar = (char: number) => ({
    type: inferStringLiteral(types.CHANGE_CUR_CHAR),
    payload: char
})

export const ChangeFullRow = (row: string[]) => ({
    type: inferStringLiteral(types.CHANGE_ROW),
    payload: row 
})


  