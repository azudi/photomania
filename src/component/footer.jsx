import * as React from 'react';
import { useContext } from 'react';
import { useParams } from "react-router-dom"
import { Changer } from '..';
import axios from 'axios';
import "./bootstrap.css";
import "./video.css";
import "./Font-face/font-face.css"
import "./css/font-awesome.min.css";


export default function Footer(){
     return(
         <div className='footer'><br></br><br></br>
             <div className='flex'>
                 <div className='About_note col-md-6 col-lg-5'>
                     <h4>About Us</h4>
                     <p className='footer_p'>
                         We are individuals who value the comfort and beauty of pictures
                         and video. So thrives in our best effort to bring HD pictures and video from
                         trusted and user friendly source from around the internet
                     </p>
                 </div>{/*end of about note */}
                 <div className='About_note col-md-6 col-lg-5'>
                     <h4>Contact</h4>
                     <p className='footer_p_icon'>
                         <a href="tel:08089873611"><span className='social'><i className='fa fa-phone'></i> +234 808 987 3611</span></a>
                         <a href="https://www.linkedin.com/in/jerry-azubuike-801752222"><span className='social'><i className='fa fa-linkedin'></i> Follow on Linkedin</span></a>
                         <a href=""><span className='social'><i className='fa fa-twitter'></i> Follow on twitter</span></a>
                         <a href="mailto:jerryazubuike001@gmail.com"><span className='social'><i className='fa fa-envelope-o'></i> jerryazubuike001@gmail.com</span></a>
                     </p>
                 </div>{/*end of about note */}
                 <div className='text-right-footer'>
               <span>&copy;copyright 2021, Design by jerry Azubuike</span>         
              </div>
             </div>
         </div>
     )
}