import { configureStore, createSlice } from "@reduxjs/toolkit";


const usernameSlice = createSlice({
    name: "user",
    initialState: {
        username: "not logged in",
    },
    reducers: {
        usernameChange: (state, action) => {
            state.username = action.payload;
        },
    },
});
const navigatorSlice = createSlice({
    name: "navigator",
    initialState: {
        navigator: "home",
    },
    reducers: {
        navigatorChange: (state, action) => {
            state.navigator = action.payload;
        },
    },
});

const usernameChange = usernameSlice.actions.usernameChange;
const navigatorChange = navigatorSlice.actions.navigatorChange;

export { usernameChange, navigatorChange };

export default configureStore({
    reducer: { user: usernameSlice.reducer, navigator: navigatorSlice.reducer },
});
