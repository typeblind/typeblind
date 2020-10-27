
import * as actions from './actions';
import {InferValueTypes} from '../typeFunctions';

export type LangsAction = ReturnType<InferValueTypes<typeof actions>>;