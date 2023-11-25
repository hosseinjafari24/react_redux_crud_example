import {configureStore} from '@reduxjs/toolkit';
import postReducer from '../slices/posts';
import userReducer from '../slices/users';
import counterReducer from '../slices/counter';

const reducer = {
    posts: postReducer,
    counter: counterReducer,
    users: userReducer,
};

const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;
