import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createUser, deleteUser, retrieveUsers, updateUser,getUserById } from "../actions/user.action";

import User from "../models/user";

const initialState : User[] = [];

const userSlice = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {},
    extraReducers : (builder : ActionReducerMapBuilder<any[]>)=> {
	  builder.addCase(createUser.fulfilled,(state, action) : void => {
		state.push(action.payload);
	  }),
	  builder.addCase(retrieveUsers.fulfilled,(state,action)  => {
	    	console.log(`state :: ${state}`);
	    	return [...action.payload]
	 }),
	  builder.addCase(updateUser.fulfilled,(state,action) => {
	     const index = state.findIndex(item => item.id === action.payload.id);
	     state[index] = {
		   ...state[index],
		   ...action.payload
	     };
	 }),
	  builder.addCase(deleteUser.fulfilled,(state,action) => {
	    	let index = state.findIndex(item => item.id === action.payload.id);
	    	state.splice(index,1);
	 })
    }
});

const {reducer} = userSlice;

export default reducer;
