import ClovaStudioSlice from '../pages/w2/ClovaStudioSlice';
import landingPageSettingSlice from './landingPageSettingSlice';
import authSlice from './authSlice';
import landingPageSettingsChatbotTeamNameSlice from './landingPageSettingsChatbotTeamNameSlice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    ClovaStudioSlice: ClovaStudioSlice.reducer,
    authSlice: authSlice.reducer,
    landingPageSettingSlice: landingPageSettingSlice.reducer,
    landingPageSettingsChatbotTeamName: landingPageSettingsChatbotTeamNameSlice.reducer
  },
});