// LandingDetail 
import { createSlice } from "@reduxjs/toolkit";

const landingPageSettingSlice = createSlice({
    name: "landingPageSetting",
    initialState: {landingPageSetting: null},
    reducers: {
        setLandingPageSetting: (state, action) => {
            state.landingPageSetting = action.payload;
        }
    }
})

export default landingPageSettingSlice;