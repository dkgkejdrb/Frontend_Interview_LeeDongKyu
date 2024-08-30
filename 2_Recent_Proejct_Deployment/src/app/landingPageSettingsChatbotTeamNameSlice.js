import { createSlice } from "@reduxjs/toolkit";

const landingPageSettingsChatbotTeamNameSlice = createSlice({
    name: "landingPageSettingsChatbotTeamName",
    initialState: {landingPageSettingsChatbotTeamName: null},
    reducers: {
        setLandingPageSettingsChatbotTeamName: (state, action) => {
            state.landingPageSettingsChatbotTeamName = action.payload;
        }
    }
})

export default landingPageSettingsChatbotTeamNameSlice;