
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
 import Loader from './loader';
 import interact from 'interactjs';
 import fullpage from "fullpage.js/dist/fullpage"
 import {Link} from "react-router-dom"
  
 export default function Pictures(){
let {id}=useParams();
let {sec}=useParams();
const [image,setImage]=React.useState("")
const [side,setSide]=React.useState([
  "natural", "beauties","housing", "estate","human","gathering","combact", "fight"
])
  console.log({id}.id)
     //link looping
     const [link,setlink]=React.useState([
       1,2,3,4,5,6,7,8,9,10
     ]) 
        //code to hide form
        const [form,setForm]=React.useState("hidepics")

   // variable for start icon
   let starIcon="fa-star-o"
  const [info,setInfo]=React.useState([])

   const html=(content)=>{
     if(content){
       setInfo([...content.data])
       document.querySelector(".roller_svg").remove()
     }
   }

   //changing the start attribute
   const changeIcon=(e)=>{
      e.target.setAttribute("class","fa fa-star")
   }
     //setting local storage id
     const setId=()=>{

     }
     const refreshPage=()=>{
      window.location.reload()
     }
 React.useEffect(()=>{
const videoText=document.querySelectorAll(".side_video_text>a")
for(let f=0;f<videoText.length;f++){
    videoText[f].innerHTML=side[f]
}
       
   async function blog(){
     try{   
        return await axios.get("https://api.unsplash.com/photos/",{
        params:{
         client_id:"-c-wVnznWkNnBiv9wcJ4YN7N-KPB-WAcpm_YK6ptaks",
         per_page:50,
         query:{sec}.sec,
         page:{id}.id
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

      //download section pop up
     const changeImg=(e)=>{
       let remain=info.filter(item=>info.indexOf(item)==e.target.id)
       localStorage.setItem("bgImage",remain[0].urls.full)
       setImage(e.target.src)
          document.querySelector(".show-img").src=image;
          document.querySelector(".pop-img").classList.remove("flowup")
      }
      const flowUp=()=>{
        document.querySelector(".pop-img").classList.add("flowup")
        document.querySelectorAll(".upSlide")[0].classList.remove("hidepics")
        document.querySelectorAll(".upSlide")[1].classList.add("hidepics")
          setMessages([
            {
              class:"sent",
              msg:'Hi i am maxi your special AI care'
             },
             {
              class:"sent",
              msg:'How can i be of help'
             }
          ])
      }
      const hidePics=()=>{
        document.querySelectorAll(".upSlide")[0].classList.add("hidepics")
        document.querySelectorAll(".upSlide")[1].classList.remove("hidepics")
      }
     

      const [messages,setMessages]=React.useState([
       {
         class:"sent",
         msg:'Hi i am maxi your special AI care'
        } ,
        {
          class:"sent",
          msg:'How may i be of help to you'
         } 
      ])


      const inputText=React.useRef()
      const fillMessageArea=()=>{
        if(inputText.current.value.trim()!=''){
          setMessages([...messages,
          {
            class:"recieve",
            msg:inputText.current.value
          }
          ])
          inputText.current.value=''
          setTimeout(()=>{
            setForm("")
          },1000)     
         }
        }

        //code for no display
        const noDisplay=()=>{
          setForm("hidepics")
        }

     
     //below is rendering of dom element

    console.log(theme)
     return (
         <div>

          
             <Loader></Loader>

           <div className='pop-img flowup flex'>
            
              <div className='col-md-6 col-lg-5 col-xl-4 upSlide'>
                  <img className='show-img' src={image}></img>
                  <div>
                    
                    <button className='clicker-button mar-1'><a href={image} download>download</a></button>
                    <button onClick={hidePics} className='click-button-o mar-1'>talk to photographer</button>
                    <button className='click-button-o mar-1'>make quote</button>
                  </div>
              </div>{/* end of upSlide */}
              <div className='col-md-6 col-lg-5 col-xl-4 upSlide hidepics'>
                <form title='form for email' className={`email_form ${form}`}>
                  <span onClick={noDisplay} className='form_cancle'>&#x2715;</span>
                  <p>
                    please fill out your info, to communicate with you better
                  </p>
                  <div>
                     <input placeholder='joe@gmail.com' type="email" required></input>
                     <button>send</button>
                  </div>
                </form>{/* end of email_form */}
                
                  <div className='message-area'>
                     {messages.map(e=>
                      <div className={e.class} key={messages.indexOf(e)}>
                      <span>{e.msg}</span>
                    </div>)}
                  </div>{/* end of message area */}
                  <div className='col-12 typing-box flex'>
                   <textarea title='message text area' className='text-area' ref={inputText} placeholder='Type message here ...'></textarea>
                   <button onClick={fillMessageArea} title='send message' className='fa fa-send'></button>
                  </div>{/* end of typing-box */}

              </div>{/* end of upSlide */}
              <div className='cancle-pop' onClick={flowUp}><span>&#x2715;</span></div>
           </div> {/* end of pop-img */}

             <div className='video_header flex'>
               <div className='flex col-12 put_back'>
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
                 <form className='input_box'><input type="text"></input><button>search</button></form>
               </div>
             </div>          
              {/* end of seach box */}  
              </div>
            <div className='body_section flex' >
               {/* begin of video container} */}
              <div className="video_container col-lg-9 col-md-7 flex">
                <div className='col-lg-4 col-md-6 col-sm-6'>
                {info.map(e=>info.indexOf(e)<10?
                  <div className='video_img_contain relative' key={e.id}>
                     <span className='video_name'>{e.alt_description}</span>
                       <img className='video_img' id={info.indexOf(e)} onClick={changeImg} src={e.urls.small} alt={e.tags}></img>
                     </div>
                :"")}
                </div>{/* end of first image looping */}  
                <div className='col-lg-4 col-md-6 col-sm-6'>
                {info.map(e=>info.indexOf(e)>10&&info.indexOf(e)<20?
                  <div className='video_img_contain relative' key={e.id}>
                     <span className='video_name'>{e.alt_description}</span>
                       <img className='video_img' id={info.indexOf(e)} onClick={changeImg} src={e.urls.small} alt={e.tags}></img>
                     </div>
                :"")}
                </div>{/* end of second image looping */}  
                <div className='col-lg-4 col-md-6 col-sm-6'>
                {info.map(e=>info.indexOf(e)>20&&info.indexOf(e)<30?
                  <div className='video_img_contain relative' key={e.id}>
                     <span className='video_name'>{e.alt_description}</span>
                       <img className='video_img' id={info.indexOf(e)} onClick={changeImg} src={e.urls.small} alt={e.tags}></img>
                     </div>
                :"")}
                </div>{/* end of last image looping */}
               
               </div> {/* end of video container} */}
              <div className='related_context col-md-5 col-lg-3'>
              <h4 className='related_header'>Related Section</h4>
              <div>
                 {info.map(e=>info.indexOf(e)>(info.length-7)&&info.indexOf(e)<info.length?
                      <div className='flex' key={e.id}>
                        <div className=' relative side_video_img'>
                          <img className='video_img' src={e.urls.small}></img>
                          </div>
                        <div onClick={refreshPage} className='related_text side_video_text'><Link to={`/pictures/${{id}.id}/${side[Math.floor(Math.random()*side.length)]}`}>{e.description?e.description.substring(0,70)+"...":"Max prompt photo concept"}</Link></div>
                      </div>
                       :'')}
                       </div>
              </div>{/*  end of related context */}

            </div>{/* end of body section */}
           
           <div className='pagination'>
               <div className='page_contain text-center col-md-12'>
                  {
                    link.map(e=>link.indexOf(e)==Number({id}.id)-1?<i onClick={refreshPage} className='pages page_dark'><Link  to={`/pictures/${e}/${{sec}.sec}`} key={e}>{e}</Link></i>:<i onClick={refreshPage} className='pages'><Link  to={`/pictures/${e}/${{sec}.sec}`} key={e}>{e}</Link></i>)
                  }
                 <i>. . .</i>
                <Link><span className="next_pager" className='fa fa-chevron-right'></span></Link>
               </div>{/*  end of page contain */}
           </div>{/*  end of pagination */}

           <Footer></Footer>

         </div>
     )
 }