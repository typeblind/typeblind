
import * as actions from './actions';
import {InferValueTypes} from '../typeFunctions';

export type EditorAction = ReturnType<InferValueTypes<typeof actions>>;