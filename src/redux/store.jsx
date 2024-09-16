import {configureStore} from "@reduxjs/toolkit";
import {placeReducer} from "./slices/placeSlice.jsx";

export default configureStore({
    reducer: {
        places: placeReducer
    },
});
