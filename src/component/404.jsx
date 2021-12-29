
 import * as React from 'react';
 import { useContext } from 'react';
 import { useParams } from "react-router-dom"
 import { Changer } from '..';
 import axios from 'axios';
 import "./bootstrap.css";
 import "./video.css";
 import "./Font-face/font-face.css"
 import "./css/font-awesome.min.css";
export default function Error(){
      return(
          <div className="error_page flex">
                <div>
                <h1 className="col-12">4<span className="fa fa-bomb"></span>4</h1>
                <div className="col-12">Page not Found</div>
                </div>
          </div>
      )

}