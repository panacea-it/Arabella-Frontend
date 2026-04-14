import navBarSlice from "./slices/navBarSlice";
import modalSlice from "./slices/modalSlice";
// ...existing code...

const rootReducer = {
  navBar: navBarSlice,
  modal: modalSlice,
  // ...existing code...
};

export default rootReducer;
