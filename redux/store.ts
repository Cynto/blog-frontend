import { configureStore } from '@reduxjs/toolkit';
import userObjReducer from './slices/userObj';

export const store = configureStore({
  reducer: {
    userObj: userObjReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
