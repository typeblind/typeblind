import * as types from './types'
import {inferStringLiteral} from '../typeFunctions';
import { Dispatch, Action } from 'redux'

export const getFileSuccess = (json: any) => ({
  type: inferStringLiteral(types.GET_FILE),
  payload: json
});

export const getFilePending = () => ({
  type: inferStringLiteral(types.GET_FILE_PENDING),
  payload: null
});

export const getFileError = (err: string) => ({
  type: inferStringLiteral(types.GET_FILE_ERROR),
  payload: err
});