import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const renderSlice = createSlice({
    name: 'render',
    initialState: false,
    reducers: {
        updateState: (state: boolean) => state = !state
    }
})

export const { updateState } = renderSlice.actions;
export default renderSlice.reducer;