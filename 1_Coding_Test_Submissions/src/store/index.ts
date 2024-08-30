import { configureStore } from '@reduxjs/toolkit';
import TimeTableReducer from './slices/TimeTableSlice';

const store = configureStore({
    reducer: {
        TimeTableDataState: TimeTableReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;