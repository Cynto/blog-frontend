import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import userObjReducer from './slices/userObj';

export const store = configureStore({
  reducer: {
    userObj: userObjReducer,
  },
});
// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  userObj: userObjReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
