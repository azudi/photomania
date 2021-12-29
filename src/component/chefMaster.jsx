import React, { Component } from 'react';
import store from '../store';
import * as actions from '../constant';
import { Link } from "react-router-dom";
import VanillaTilt from 'vanilla-tilt';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Draggable from 'gsap/Draggable';
gsap.registerPlugin(gsap,ScrollTrigger,Draggable)

     class PhotoHead extends React.Component {
   state={
      ray:store.getState().homepagereducer,
      styled:"nav-contain",
      checks:true
   }
     
   navChange=()=>{
           this.state.checks?this.setState({styled:"nav-contain backleft"}): this.setState({styled:"nav-contain"})   
            this.setState({checks:!this.state.checks})
         }
   componentDidMount=()=>{
           console.log(store.getState().homepagereducer);
      let cursor=document.querySelector(".cursor")
         document.addEventListener("mousemove",(e)=>{
            cursor.style.left= e.pageX+"px";
            cursor.style.top= e.pageY+"px";
         })
              
      VanillaTilt.init(document.querySelectorAll(".x"))
       
    
       const timeline=gsap.timeline()
          timeline.from('.headphoto',{
            duration:1,y:'-100%',ease:'bounce'
         })
          .from('.text-flow', {
            duration:1,opacity:0,y:'20px',ease:'bounce',delay:0,stagger:0.3
           })
        .from('.slide', {
         duration:1,opacity:0,x:'-40px',ease:'bounce',delay:0,stagger:0.3
     })
   }
      
   addFile=(e)=>{
      store.dispatch({
         type:actions.BUNCH,
         payload:{
            discription:Number(e.target.id)+1,
         }
      })
          store.subscribe(()=>{
            console.log("store unsubscribe")
         })   
   }

   
       scroller=(e)=>{ 
         let items=document.querySelectorAll(".scroll-menu>div>div")
          let top=e.target.getBoundingClientRect().top
           for(let p=0;p<items.length;p++){
               if(items[p].getBoundingClientRect().top<top+e.target.clientHeight/1.5){
                  items[p].style.cssText="opacity:1;transform:scaleZ(1);left:0;top:0;transition:0.5s;"
               }
               else{
                  items[p].style.cssText="opacity:0;transition:0.5s;transform:scaleZ(0)"
               }
           }
           let scaler=1-((items[items.length-1].getBoundingClientRect().top)/e.target.scrollHeight)
      }
            h1=()=>{
               return(<h1>AZUDI</h1>)
            }
   render() { 
      return(
       <div className="flex headphoto">
                <div className="col-md-12 flex">
                     <div className="col-5 col-md-2"><span className="brand slide">
                        <i className="fa fa-th-large"></i><em> Maxi</em>
                        </span></div>
                     <div className="col-7 col-md-10 col-lg-8 text-right nav-text">
                        <i onClick={this.navChange} className="fa fa-navicon nav slide"></i>
                        <div className={this.state.styled}>
                        <span className="slide l-slide"><Link to="">Home</Link></span>
                        <span className="slide l-slide"><Link to="/pictures/1/nature">Pictures</Link></span>
                        <span className="slide l-slide"><Link to="/video/1/nature">Videos</Link></span>
                        <span className="slide l-slide"><a href="https://deployportfolio.netlify.app">Other-work</a></span>
                        <button className="click-button slide l-slide"><Link to="/pictures/1/nature">Get started</Link></button>
                        </div>
                     </div>
                </div>
            <div className="headcontain col-md-6">
               <h1 className="x text-flow" data-tilt data-tilt-reverse="true"> Introducing a New Photo App More Videos and Quality</h1>
               <p className="text-flow">Phasellus consectetur volutpat tortor at. Cras eu
                  purus ipsum, quis. Morbi ullamcorper porta risus,
                    ac. Integer semper convallis purus vitae. Vestibulum
                      facilisis, neque nec mollis.
                       </p>
                        <Link to="/pictures/1/nature"><button className="click-button slide v-button">Start 14 days free trial</button></Link>
                        <em className="cursor"></em>
                   <span className="arrow" data-tilt data-tilt-reverse="true" data-tilt-max-glare="0.8"></span>
               </div>

            <div className="col-md-6 flex align-items">
                <div className="col-12">
                  
                     <div className="swiper mySwiper">
                          <div className="swiper-wrapper">
                             <div className="swiper-slide">
                                <div className='col-12'>
                                  <img className='respond' src="pics/third-phone.jpeg"></img>
                                </div>
                             </div>{/* end of swiper-slide  */}
                             <div className="swiper-slide">
                                <div>
                                <img className='respond' src="pics/second-phone.jpeg"></img>
                                </div>
                             </div>{/* end of swiper-slide  */}
                             <div className="swiper-slide">
                                <div>
                                <img className='respond' src="pics/first-phone.jpeg"></img>
                                </div>
                             </div>{/* end of swiper-slide  */}
                          </div>{/* end of swiper-wrapper  */}
                          <div className="swiper-pagination"></div>
                     </div>{/* end of swiper  */}
                </div>  

            </div>
      </div>);
   }
}
 
export default PhotoHead;