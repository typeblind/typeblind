
import * as actions from './actions';
import {InferValueTypes} from '../typeFunctions';

export type TypeAction = ReturnType<InferValueTypes<typeof actions>>;