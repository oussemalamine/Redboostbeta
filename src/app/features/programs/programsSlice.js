import { createSlice } from '@reduxjs/toolkit'
const PROGRAMS_KEY = '_0programs'
const programsSlice = createSlice({
  name: 'programsSlice',
  initialState: {
    data: localStorage.getItem(PROGRAMS_KEY) ? JSON.parse(localStorage.getItem(PROGRAMS_KEY)) : [],
  },
  reducers: {
    addProgram: (state, action) => {
      state.data.push(action.payload)
      localStorage.setItem(PROGRAMS_KEY, JSON.stringify(state.data))
    },
    deleteProgram: (state, action) => {
      state.data = state.data.filter((program) => program.id !== action.payload)
      localStorage.setItem(PROGRAMS_KEY, JSON.stringify(state.data))
    },
  },
})
export const { addProgram, deleteProgram } = programsSlice.actions
export default programsSlice.reducer
