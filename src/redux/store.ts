import {configureStore} from '@reduxjs/toolkit'
import wordsSlice from './reducers';

const store = configureStore({
    reducer:{
    [wordsSlice.name] : wordsSlice.reducer
}})

export type IRootState = ReturnType<typeof store.getState>
export default store;
