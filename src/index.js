import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './bootstrap.css';
import { ApiRouter, BrowserRouter as Router, Switch ,Route, BrowserRouter, useParams} from "react-router-dom";
import ChefMaster from './component/chefMaster';
import Body from "./component/body";
import Pictures from './component/pictures';
import Error from "./component/404";
import Draggable from './component/dragpage';
import Videoplayer from './component/videoplayer';
import { Themes } from './component/context';
    import Pager from "./component/rand"  
      
   

    export const Changer=React.createContext(Themes)
ReactDOM.render(
  <Changer.Provider value={Themes}>
  <React.StrictMode>
    <BrowserRouter
      // basename={window.location.pathname || ''}
      >
      <Switch>
     <Route path="/" exact component={Body}/>
    
     <Route path="/video/:page/:search" exact component={Pager}/>
     <Route path="/pictures/:id/:sec" exact component={Pictures}/>
     <Route path="/build" exact component={Draggable}/>
     <Route path="/videoplayer" exact component={Videoplayer}/>
     <Route component={Error}/>
     </Switch>
     </BrowserRouter >
  </React.StrictMode>
  </Changer.Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
