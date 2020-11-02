import * as types from './types'
import {inferStringLiteral} from '../typeFunctions';
import { Dispatch, Action } from 'redux'

export const getFile = (extension: string): Action => dispatch => {
  // dispatch({
  //   type: types.GET_FILE,
  // });

  // axios({
  //     headers: {
  //         'Access-Token': accessToken,
  //     },
  //     method: 'GET',
  //     url: `${apiConfig.url}project/${projectId}/author${organizationId ? `?organizationId=${organizationId}` : ''}`,
  // })
  //     .then(response => {
  //         if (response.data.success) {
  //             dispatch({
  //                 type: types.GET_AUTHORS,
  //                 data: response.data.data,
  //                 success: response.data.success,
  //                 errors: response.data.errors,
  //             });
  //         } else {
  //             utils.showError(response.data.errors[0]);
  //         }
  //     })
  //     .catch(errors => {
  //         console.log(errors.response);
  //     });
};

