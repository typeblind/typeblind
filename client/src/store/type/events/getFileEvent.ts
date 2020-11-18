import { Dispatch } from 'react';
import { API_URL } from '../../../consts';
import * as  actions from '../actions';

// import ICourse from '../../../interfaces/ICourse';

export const getFileEvent = (language: string, extension: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(actions.getFilePending());

    fetch(`${API_URL}/file/${language}/${extension}`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch(actions.getFileSuccess(json.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(actions.getFileError(err))
      })

  }
}