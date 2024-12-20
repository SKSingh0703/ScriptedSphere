import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error:null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading=true;
      state.error = null;
    },
    signInSuccess:(state,action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    signInFailure:(state,action) =>{
        state.error=action.payload;
        state.loading=false;
    },
    updateUserStart:(state)=>{
      state.loading=true;
      state.error = null;
    },
    updateUserSuccess:(state,action)=>{
      state.currentUser = action.payload;
      state.loading=false;
      state.error=null; 
    },
    updateUserFailure:(state,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    updateUserEnd:(state)=>{
      state.loading=false;
    },
    deleteUserStart:(state)=>{
      state.loading=true;
      state.error = null;
    },
    deleteUserSuccess:(state) =>{
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    deleteUserFailure:(state,action)=>{
      state.error=action.payload;
      state.loading =false;
    },
    signOutUserStart:(state)=>{
      state.loading=true;
    },
    signOutUserSuccess:(state) =>{
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    signOutUserFailure:(state,action)=>{
      state.error=action.payload;
      state.loading =false;
    },
  },
})

export const {signInStart ,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess ,
  updateUserEnd,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess
} = userSlice.actions;

export default userSlice.reducer;