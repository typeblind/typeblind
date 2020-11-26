import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { ThemeReducer, Theme } from './theme/theme_reducer';
import { LangsStore, langsReducer } from './langs/langsReducer';
import { TypingStore, TypingReducer } from './type/typeReducer';
import { editorReducer, EditorStore } from "./editor/editorReducer";

export type RootState = {
  theme: Theme,
  langs: LangsStore,
  typing: TypingStore,
  editor: EditorStore
}

const rootReducer = combineReducers({
  theme: ThemeReducer,
  langs: langsReducer,
  typing: TypingReducer,
  editor: editorReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
