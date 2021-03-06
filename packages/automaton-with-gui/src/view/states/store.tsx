import * as About from './About';
import * as Automaton from './Automaton';
import * as ContextMenu from './ContextMenu';
import * as CurveEditor from './CurveEditor';
import * as FxSpawner from './FxSpawner';
import * as Header from './Header';
import * as History from './History';
import * as Settings from './Settings';
import * as TextPrompt from './TextPrompt';
import * as Timeline from './Timeline';
import * as Toasty from './Toasty';
import * as Workspace from './Workspace';
import { Dispatch, Store, combineReducers, createStore as createReduxStore } from 'redux';
import { shallowEqual, useDispatch as useReduxDispatch, useSelector as useReduxSelector, useStore as useReduxStore } from 'react-redux';

// == state ========================================================================================
export interface State {
  about: About.State;
  automaton: Automaton.State;
  contextMenu: ContextMenu.State;
  curveEditor: CurveEditor.State;
  fxSpawner: FxSpawner.State;
  header: Header.State;
  history: History.State;
  settings: Settings.State;
  textPrompt: TextPrompt.State;
  timeline: Timeline.State;
  toasty: Toasty.State;
  workspace: Workspace.State;
}

// == action =======================================================================================
export type Action = (
  About.Action |
  Automaton.Action |
  ContextMenu.Action |
  CurveEditor.Action |
  FxSpawner.Action |
  Header.Action |
  History.Action |
  Settings.Action |
  TextPrompt.Action |
  Timeline.Action |
  Toasty.Action |
  Workspace.Action |
  { type: 'Reset' }
);

// == reducer ======================================================================================
const reducer = combineReducers<State>( {
  about: About.reducer,
  automaton: Automaton.reducer,
  contextMenu: ContextMenu.reducer,
  curveEditor: CurveEditor.reducer,
  fxSpawner: FxSpawner.reducer,
  header: Header.reducer,
  history: History.reducer,
  settings: Settings.reducer,
  textPrompt: TextPrompt.reducer,
  timeline: Timeline.reducer,
  toasty: Toasty.reducer,
  workspace: Workspace.reducer
} );

// == store ========================================================================================
export function createStore(): Store<State, Action> {
  let devtools: any;
  if ( typeof window !== 'undefined' ) { // vs. node.js
    devtools = window && ( window as any ).__REDUX_DEVTOOLS_EXTENSION__;
  }

  return createReduxStore(
    reducer,
    devtools && devtools()
  );
}

// == utils ========================================================================================
export function useSelector<T>( selector: ( state: State ) => T ): T {
  return useReduxSelector( selector, shallowEqual );
}

export function useDispatch(): Dispatch<Action> {
  return useReduxDispatch<Dispatch<Action>>();
}

export function useStore(): Store<State, Action> {
  return useReduxStore();
}
