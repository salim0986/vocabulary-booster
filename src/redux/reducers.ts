import { createSlice } from "@reduxjs/toolkit";

interface words{
    wordsArr:string[],
    transArr:string[],
    chosenOptions:string[]
}

const initialState:words = {
    wordsArr:[],
    transArr:[],
    chosenOptions:[]
}

const wordsSlice = createSlice({
    name:"words",
    initialState,
    reducers:{
        wordsSave:(state,action)=>{
         state.wordsArr = action.payload
        },
        transSave:(state,action)=>{
            state.transArr = action.payload
        },
        chosenSave:(state,action)=>{
            state.chosenOptions = action.payload
        }
    }
})

export const {wordsSave,transSave,chosenSave} = wordsSlice.actions
export default wordsSlice;