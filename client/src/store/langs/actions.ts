import * as types from './types'
import {inferStringLiteral} from '../typeFunctions';

export const selectLang = () => ({
  type: inferStringLiteral(types.SELECT_LANG),
  payload: null,
});


