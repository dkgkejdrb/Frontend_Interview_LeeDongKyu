import { createSlice } from "@reduxjs/toolkit";

const ClovaStudioSlice = createSlice({
    name: "fileIndex",
    initialState: {fileIndex: null},
    reducers: {
        setFileIndex: (state, action) => {
            state.fileIndex = action.payload;
        }
    }
})

export default ClovaStudioSlice;