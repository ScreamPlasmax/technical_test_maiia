import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import reducers from './reducers';
import { useDispatch } from 'react-redux';

export type StoreType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers(reducers);

const store = configureStore<StoreType>({
  reducer: rootReducer,
  devTools: true,
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
