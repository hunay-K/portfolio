import { configureStore, createSlice } from '@reduxjs/toolkit';

let current_page = createSlice({
    name : 'current_page',
    initialState : '',
    reducers : {
        change_page(state, a){
            return a.payload
        }
    }
})

let board_data = createSlice({
    name : 'board_data',
    initialState : '',
    reducers : {
        replace_data(state, obj){
            return state = obj.payload;
        }
    }
})

let current_board = createSlice({
    name : 'current_board',
    initialState : '',
    reducers : {
        replace_board(state, obj){
            return state = obj.payload;
        }
    }
})

let more_data = createSlice({
    name : 'more_data',
    initialState : '',
    reducers : {
        replace_more_data(state, obj){
            return state = obj.payload;
        }
    }
})

export let {change_page} = current_page.actions
export let {replace_data} = board_data.actions
export let {replace_board} = current_board.actions
export let {replace_more_data} = more_data.actions

export default configureStore({
    reducer: {
        current_page : current_page.reducer,
        board_data : board_data.reducer,
        current_board : current_board.reducer,
        more_data : more_data.reducer
    }
  });