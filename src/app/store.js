import { configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import loginSliceReducer from './features/login/loginSlice'
import registerSliceReducer from './features/register/registerSlice'
import appReducer from './features/appSlice/appSlice'
import programsSliceReducer from './features/programs/programsSlice'

// Configure the Redux store
const store = configureStore({
  reducer: {
    app: appReducer,
    loginSlice: loginSliceReducer,
    registerSlice: registerSliceReducer,
    programsSlice: programsSliceReducer,
  },
})

export default store
