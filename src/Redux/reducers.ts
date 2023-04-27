import { combineReducers } from "@reduxjs/toolkit";
import datas, {InitialState as DatasInitialState, Action as DatasActions} from "./Reducers/datas";
import { Reducer, CombinedState } from 'redux';

export interface Reducers{
  datas: DatasInitialState;
}

const rootReducer: Reducer<CombinedState<Reducers>, DatasActions> = combineReducers({
  datas: datas as Reducer<DatasInitialState, DatasActions>,
});

export default rootReducer;