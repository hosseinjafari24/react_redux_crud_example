import {
    createSlice,
    createAsyncThunk,
    ActionReducerMapBuilder
} from "@reduxjs/toolkit";
import PostService from "../services/post.service";
import Post from "../models/post";

//const initialState : Array<Post> = [];
const initialState : any[] = [];

export const createPost = createAsyncThunk(
	'posts/create',
	async (post : Post) => {
	    const response = await PostService.create(post);
	    return response.data;
	}
);
export const retrievePosts = createAsyncThunk(
	'posts/retrieve',
	async ()=> {
	    const response = await PostService.getAll();
	    return response.data;
	}
);

export const updatePost = createAsyncThunk(
	'posts/update',
	async ( post : Post) => {
	    const response = await PostService.update(post.id, post);
	    return response.data;
	}
);

export const deletePost = createAsyncThunk(
	'posts/delete',
	async (id :number) => {
	    await PostService.delete(id);
	    return { id };
	}
);

const postSlice = createSlice({
    	name:'post',
    	initialState : initialState,
    	reducers:{},
    	extraReducers : (builder : ActionReducerMapBuilder<any[]>)=> {
		builder.addCase(createPost.fulfilled,(state, action) : void => {
		    state.push(action.payload);
		}),
		builder.addCase(retrievePosts.fulfilled,(state,action)  => {
		    	console.log(`state :: ${state}`);
			return [...action.payload]
		}),
		builder.addCase(updatePost.fulfilled,(state,action) => {
		   const index = state.findIndex(post => post.id === action.payload.id);
		   state[index] = {
			...state[index],
			...action.payload
		   };
		}),
		builder.addCase(deletePost.fulfilled,(state,action) => {
		    let index = state.findIndex(post => post.id === action.payload.id);
		    state.splice(index,1);
		})
    	}
});

const {reducer} = postSlice;

export default reducer;
