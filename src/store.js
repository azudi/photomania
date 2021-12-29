  
  import { createStore, combineReducers } from "redux";
  import homepagereducer from "./reducer";
  import sidereducer from "./sidereducer"

      
    const reducers=combineReducers({homepagereducer,sidereducer})
    export default createStore(reducers)