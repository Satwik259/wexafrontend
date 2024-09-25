// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
// const store = configureStore({
//   reducer: {
//     auth: authSlice,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import themeReducer from "../feautures/theme/themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,       
    theme: themeReducer,   
  },
});

export default store;
