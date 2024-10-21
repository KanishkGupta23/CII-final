import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const industryData = createSlice({
  name: 'data',
  initialState,
  reducers: {
    collect: (state,action) => {
     
      state.value =action.payload;

    },
   
  },
})

// Action creators are generated for each case reducer function
export const { collect} = industryData.actions

export default industryData.reducer