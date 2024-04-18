import { configureStore } from '@reduxjs/toolkit';
import {
  daySummarySlice,
  plateGroupSlice,
  plateSlice,
  tableSlice,
  userReducer,
} from '../slices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    plateGroup: plateGroupSlice.reducer,
    plate: plateSlice.reducer,
    table: tableSlice.reducer,
    summary: daySummarySlice.reducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
