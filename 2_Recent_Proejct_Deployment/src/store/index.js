import ClovaStudioSlice from './slices/ClovaStudioSlice';
import landingPageSettingSlice from './slices/landingPageSettingSlice';
import authSlice from './slices/authSlice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        ClovaStudioSlice: ClovaStudioSlice.reducer,
        authSlice: authSlice.reducer,
        landingPageSettingSlice: landingPageSettingSlice.reducer,
    },
});