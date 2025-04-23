import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
}

const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {
        addToCart:(state,action)=>{
            const iteamIndex = state.carts.findIndex((iteam)=>iteam.id === action.payload.id)
            if(iteamIndex >= 0 ){
                state.carts[iteamIndex].qnty += 1
            }else{
                const temp = {...action.payload , qnty : 1}
                state.carts = [...state.carts, temp]
            }
        },


        removeToCart:(state,action)=>{
            const data = state.carts.filter((ele)=>ele.id !== action.payload)
            state.carts = data
        },

        removeSingleIteams:(state,action)=>{
            const iteamIndex_dec = state.carts.findIndex((iteam)=>iteam.id === action.payload.id)
            if(state.carts[iteamIndex_dec].qnty >= 1){
                state.carts[iteamIndex_dec].qnty -= 1
            }
        },
        emptyCartIteams : (state)=>{
            state.carts = []
        }
    }
})
export const {addToCart,removeToCart,removeSingleIteams,emptyCartIteams} = cartSlice.actions

export default cartSlice.reducer