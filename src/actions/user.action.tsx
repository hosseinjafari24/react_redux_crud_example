import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../models/user";
import UserService from "../services/user.service";
import { CREATE_USER, DELETE_USER, RETRIEVE_USER, SHOW_USER, UPDATE_USER } from "./user.type";

export const createUser = createAsyncThunk(
	CREATE_USER,
	async (user : User) => {
	    const response = await UserService.create(user);
	    return response.data;
	}
);
export const retrieveUsers = createAsyncThunk(
	RETRIEVE_USER,
	async ()=> {
	    const response = await UserService.getAll();
	    return response.data;
	}
);
export const updateUser = createAsyncThunk(
	UPDATE_USER,
	async ( user : User) => {
	    const response = await UserService.update(user.id, user);
	    return response.data;
	}
);
export const deleteUser = createAsyncThunk(
	DELETE_USER,
	async (id :number) => {
	    await UserService.delete(id);
	    return { id };
	}
);
export const getUserById = createAsyncThunk(
	SHOW_USER,
	async (id :number) => {
	    const response = await UserService.get(id);
	    return response.data;
	}
);
