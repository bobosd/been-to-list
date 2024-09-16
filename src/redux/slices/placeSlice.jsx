import {createSlice} from "@reduxjs/toolkit";

export const placeSlice = createSlice({
    name: "places",
    initialState: [],
    reducers: {
        addPlace: (state, action) => {
            return [...state, action.payload];
        },
        removePlace: (state, action) => {
            return state.filter((place) => place.id !== action.payload);
        },
        updatePlace: (state, action) => {
            return state.map((place) => place.id === action.payload.id ? action.payload : place);
        }
    }
});

export const {addPlace, removePlace, updatePlace} = placeSlice.actions;
export const placeReducer = placeSlice.reducer;
