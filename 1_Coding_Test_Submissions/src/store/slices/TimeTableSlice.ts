import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface timeSlot {
    startTime: string;
    endTime: string;
}

interface timeTableDataArray {
    [key: string]: timeSlot[];
}

interface timeTableDataArrayObject {
    value: timeTableDataArray;
}

const initialState: timeTableDataArrayObject = {
    value: {
        "2A-1 (201~)": [], 
        "3B-1 (301~)": [],
    },
}

const TimeTableSlice = createSlice({
    name: 'TimeTableSlice',
    initialState,
    reducers: {
        // 전체 데이터를 교체하는 액션
        setValue: (state, action: PayloadAction<timeTableDataArray>) => {
            state.value = action.payload;
        }    
    }
})

export const { setValue } = TimeTableSlice.actions;
export default TimeTableSlice.reducer;