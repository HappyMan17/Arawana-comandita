import { configureStore } from '@reduxjs/toolkit';
import { plateSlice, tableSlice, userReducer } from '../slices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    plate: plateSlice.reducer,
    table: tableSlice.reducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
