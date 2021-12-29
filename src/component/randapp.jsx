
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
 import video from "./css/Aegean_Sea_1.mp4"
  import fullpage from "fullpage.js/dist/fullpage"
  import {Link} from "react-router-dom"
   
  export default function App(){
     //staet for pagination
    const [link,setlink]=React.useState([
      1,2,3,4,5,6,7,8,9,10
    ]) 
    //state for relateted sectio text
    const [side,setSide]=React.useState([
      "nature","forest","person","animals"
    ])
       //functio to refresh the page
    const refreshPage=()=>{
      window.location.reload()
     }
      //using params
      const {page,search}=useParams()
     
    // variable for start icon
    let starIcon="fa-star-o"
   const [info,setInfo]=React.useState([])

    const html=(content)=>{
      if(content){
        setInfo([...content.data.hits])
      }
    }
    console.log("info",info)
    const changeIcon=(e)=>{
       e.target.setAttribute("class","fa fa-star")
    }
   const setId=(e)=>{
    localStorage.setItem("id",e.target.id)
    localStorage.setItem("info",JSON.stringify(info))
   }
  React.useEffect(()=>{
    async function blog(){
      try{   
         return await axios.get("https://pixabay.com/api/videos/",{
         params:{
          key:"24736926-85655e4f72fee0c16e2568fc5",
          q:{search}.search,
          per_page:30,
          video_type:"film",
          page:{page}.page
         }
      })
    }
       catch(err){
     console.log(err)
   }
    }
     blog().then(response=>html(response))
     .catch=(err)=>{
         console.log(err)
     }
        
},[])
      const theme=useContext(Changer)
     const [look,setLook]=React.useState(theme.day)
     const [query,setQuery]=React.useState(true)
       const changeGround=()=>{
           {query?setLook(theme.night):setLook(theme.day)}
           setQuery(!query)
       }
          
       const inputSearch=React.useRef()
       const getInput=(e)=>{
           e.preventDefault()  
           window.location.reload()      
       }
     console.log(theme)
      return (
          <div>
              <div className='video_header flex relative'>
                <div className='flex col-12 relative put_back'>
                {/* begin of paragraph */}
                <p className='col-md-10 col-lg-9'>
                  <h1>
                Welcome to max videos content with no desrcretion. 
                Relax. Comfortable . <span>to be entertained</span>
                </h1> {/* end of h1 */}

                {/* begin of rate_section */}
                <div className='rate_section'>
                <span>Having a good time do well to rate us  </span>
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

                {/* begin of seach box */}
                <div className='search_box col-md-10 col-lg-9'>
                  <form  className='input_box'><input ref={inputSearch} type="text"></input><button onClick={getInput}>search</button></form>
                </div>
              </div>          
               {/* end of seach box */}  
               </div>   {/* end of col-12 */} 
             <div className='body_section flex'>
             
                {/* begin of video container} */}
               <div className="video_container col-lg-9 flex col-md-7">
                 <div className='flex'>
                 {info.map(e=>info.indexOf(e)<info.length?
                   <div className='video_img_contain col-md-6 col-lg-4 col-sm-6 relative' key={e.id}>
                     <Link to="/videoplayer" id={e.id}><i className='fa fa-play start_icon' onClick={setId} id={e.id}></i></Link>
                     <span className='cover'></span>
                      <span className='video_name'>{e.tags}</span>
                        <img className='video_img' src={e.userImageURL} alt={e.tags}></img>
                      </div>
                 :'')}
                 </div>{/* end of first image looping */}  
                
                </div> {/* end of video container} */}

               <div className='related_context col-md-5 col-lg-3'>
                 <h4 className='related_header'>Related Videos</h4>
                 {info.map(e=>info.indexOf(e)>(info.length-10)&&info.indexOf(e)<info.length?
                      <div className='flex' key={e.id}>
                        <div className='relative side_video_img'>
                        <Link to="/videoplayer" id={e.id}><i className='fa fa-play start_icon_reduce' onClick={setId} id={e.id}></i></Link>
                          <img className='video_img' src={e.userImageURL}></img>
                          </div>
                          <div onClick={refreshPage} className='related_text side_video_text'><Link to={`/video/${{page}.page}/${side[Math.floor(Math.random()*side.length)]}`}>{e.tags?e.tags.substring(0,70)+"...":"Max prompt photo concept"}</Link></div>
                      </div>
                       :'')}
               </div>{/* end of related context */}

             </div>{/* end of body section */}
                

             <div className='pagination'>
               <div className='page_contain text-center col-md-12'>
               
                  {
                    link.map(e=>link.indexOf(e)==Number({page}.page)-1?<i key={link.indexOf(e)} onClick={refreshPage} className='pages page_dark'><Link  to={`/video/${e}/${{search}.search}`} key={e}>{e}</Link></i>:<i onClick={refreshPage} className='pages'><Link  to={`/video/${e}/${{search}.search}`} key={e}>{e}</Link></i>)
                  }
                 <i>. . .</i>
                 <Link to=''><span className='fa fa-chevron-right'></span></Link>
               </div>{/*  end of page contain */}
           </div>{/*  end of pagination */}
           <Footer></Footer>
          </div>
      )
  }