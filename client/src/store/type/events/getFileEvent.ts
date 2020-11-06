import { Dispatch } from 'react';
import * as  actions from '../actions';
// import ICourse from '../../../interfaces/ICourse';

export const getFileEvent = (extension: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(actions.getFilePending());


  }
}