import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { ThemeReducer, Theme } from './theme/theme_reducer';
import { LangsStore, langsReducer } from './langs/langsReducer';
import { TypingStore, TypingReducer } from './type/typeReducer';

export type RootState = {
  theme: Theme,
  langs: LangsStore,
  typing: TypingStore
}

const rootReducer = combineReducers({
  theme: ThemeReducer,
  langs: langsReducer,
  typing: TypingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
