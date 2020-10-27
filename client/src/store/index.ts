import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { ThemeReducer, Theme } from './theme/theme_reducer';
import { LangsStore, langsReducer } from './langs/langsReducer';

export type RootState = {
  theme: Theme,
  langs: LangsStore,
}

const rootReducer = combineReducers({
  theme: ThemeReducer,
  langs: langsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
