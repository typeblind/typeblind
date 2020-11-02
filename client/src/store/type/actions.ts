import * as types from './types'
import {inferStringLiteral} from '../typeFunctions';
import { Dispatch, Action } from 'redux'

export const getFileSuccess = (extension: string) => ({
  type: inferStringLiteral(types.GET_FILE),
  payload: null
});

export const getFilePending = () => ({
  type: inferStringLiteral(types.GET_FILE_PENDING),
  payload: null
});

export const getFileError = (err: string) => ({
  type: inferStringLiteral(types.GET_FILE_ERROR),
  payload: err
});