
 import * as React from 'react';
 import { useContext } from 'react';
 import { useParams } from "react-router-dom"
 import { Changer } from '..';
 import axios from 'axios';
 import "./bootstrap.css";
 import "./video.css";
 import "./Font-face/font-face.css"
 import "./css/font-awesome.min.css";
 import Footer from './footer';
 import image from "./css/third-phone.jpeg";
 import fullpage from "fullpage.js/dist/fullpage"
 import {Link} from "react-router-dom"
  
 export default function Videoplayer(){
   // variable for start icon
   let starIcon="fa-star-o"
  const [info,setInfo]=React.useState([
    ...JSON.parse(localStorage.getItem("info"))
  ])

  const html=(content)=>{
   if(content){
     console.log(content.data)
   }
}
   console.log("info",info)
   const changeIcon=(e)=>{
      e.target.setAttribute("class","fa fa-star")
   }
   
 React.useEffect(()=>{

 
    //setting the src of the video
    for(let v=0;v<info.length;v++){
      if(info[v].id==localStorage.getItem("id")){
      console.log(info[v].id)
      }
    }      
    console.log(JSON.parse(localStorage.getItem("info")))
},[])
     const theme=useContext(Changer)
    const [look,setLook]=React.useState(theme.day)
    const [query,setQuery]=React.useState(true)
      const changeGround=()=>{
          {query?setLook(theme.night):setLook(theme.day)}
          setQuery(!query)
      }

      const setId=(e)=>{
        localStorage.setItem("id",e.target.id)
        localStorage.setItem("info",JSON.stringify(info));
        window.location.reload()
      }
    console.log(theme)
     return (
         <div>
             <div className='video_header flex'>
               <div className='put_back flex'>
               {/* begin of paragraph */}
               <p className='col-md-10 col-lg-9'>
                 <h1>
                      Welcome to max videos content with no desrcretion. 
                       Relax. Comfortable . <span>to be entertained</span>
               </h1> {/* end of h1 */}

               {/* begin of rate_section */}
               <div className='rate_section'>
               <span>Having a good time do well to rate us</span>
                  <i onClick={changeIcon} className={`fa ${starIcon}`}></i>
                 <i onClick={changeIcon} className={`fa ${starIcon}`}></i>
                 <i onClick={changeIcon} className={`fa ${starIcon}`}></i>
                 <i onClick={changeIcon} className={`fa ${starIcon}`}></i>
                 <i onClick={changeIcon} className={`fa ${starIcon}`}></i>
                 </div>
                 {/* end of rate_section */}
                
               {/* begin of page section */}
               <div className='page_section col-md-10 col-lg-9'>  
                 <span>sections</span>
                 <em><Link to="/video/1/nature">Videos</Link></em> || <em><Link to="/pictures/1/nature">Pictures</Link></em>
               </div> 
                {/* end of page section */}
               </p> 
                {/* end of paragraph */}

             </div>          
             </div>{/* end of put_back */}

            <div className='body_section flex align-items'>
            
               {/* begin of video container} */}
              <div className=" col-lg-9 flex col-md-7">
                  <div className='col-12'>
                  {info.map(e=>e.id==localStorage.getItem("id")?    
                <video className='video' src={e.videos.large.url} poster={e.userImageURL} controls></video>:''
                )}
                 <a href={document.querySelector(".video").src} download><span className='fa fa-download download_icon'></span></a>
                </div>
               </div> {/* end of video container} */}
              <div className='related_context alter_context col-md-5 col-lg-3'>
                <h4 className='related_header'>Related Videos</h4>
                {info.map(e=>info.indexOf(e)>(info.length-4)&&info.indexOf(e)<info.length?
                     <div className='flex' key={e.id}>
                       <div className='side_video_img relative'>
                       <i className='fa fa-play start_icon_reduce' onClick={setId} id={e.id}></i>
                         <img className='video_img' src={e.userImageURL}></img>
                         </div>
                       <div className='side_video_text related_text'>{e.tags}</div>
                     </div>
                      :'')}
              </div>{/* end of related context */}

            </div>{/* end of body section */}
          <Footer></Footer>
         </div>
     )
 }