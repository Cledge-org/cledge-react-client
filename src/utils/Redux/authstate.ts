import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState{
    authenticated : boolean,
    firstName: String,
    lastName: String,
    email : String,
    tags: String[],
}

const initialState: AuthState = {
    authenticated: false,
    firstName: null,
    lastName: null,
    email: null,
    tags: [],
}

export const authStateSlice = createSlice({
    name: "authstate",
    initialState,
    reducers :{
       toggleAuthenticated: (state)=> {state.authenticated = !state.authenticated}
    }
})

export const {toggleAuthenticated} = authStateSlice.actions;
export default authStateSlice.reducer;