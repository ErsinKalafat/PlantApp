import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
    isCompleted: boolean;
    currentStep: number;
    totalSteps: number;
}

const initialState: OnboardingState = {
    isCompleted: false,
    currentStep: 0,
    totalSteps: 4,
};

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
            state.isCompleted = action.payload;
        },
    },
});

export const { setOnboardingCompleted } = onboardingSlice.actions;

export default onboardingSlice.reducer; 