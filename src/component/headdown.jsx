 import React, { Component } from 'react';
 import VanillaTilt from 'vanilla-tilt';
 import gsap from 'gsap';
 import ScrollTrigger from 'gsap/ScrollTrigger';
 import Draggable from 'gsap/Draggable';
 gsap.registerPlugin(gsap,ScrollTrigger,Draggable)
  
 

class Headdown extends React.Component {

    componentDidMount=()=>{
        
        let tl=gsap.timeline({
          scrollTrigger:{
            trigger:'.black-container'         
           }
        })
        let fl=gsap.timeline({
            scrollTrigger:{
                trigger:'.imageish' ,
                 start:"center bottom"       
            }
        })
        tl.from('.blackish-text',{x:200,opacity:0,duration:2})
        fl.from('.roll-img',{x:200,opacity:0,duration:2})
    }

    state={
        
    }
    render() { 
        return <div className="flex black-container">
             
        </div>;
    }
}
 
export default Headdown;