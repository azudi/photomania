
 import * as React from 'react';
 import "./bootstrap.css";
 import "./video.css";
 import "./Font-face/font-face.css"
 import "./css/font-awesome.min.css";
 import Footer from './footer';
 import {Link} from "react-router-dom";
 import {Style} from "./css"
 import interact from 'interactjs';
import html2canvas from 'html2canvas';
import { proverbs } from './poverbText';
  
 export default function Draggable(){
    console.log(Style[0])
  const [font,setFont]=React.useState()
   const bodyBackground=localStorage.getItem("bgImage")

let inputBox=document.querySelectorAll(".main_design_box>div>textarea");
let itemside=document.querySelectorAll(".item_side>div")

const [resizeclass,setResizeclass]=React.useState("draggable")
const [checkresize,setCheckresize]=React.useState(true)
    const changeresize=(e)=>{
      
      if(checkresize){
          e.target.className="resize-drag"
        setCheckresize(false)
      }
      else{
        e.target.className="draggable"
        setCheckresize(true)
      }
    }
   // variable for start icon
   let starIcon="fa-star-o"
 
   React.useEffect(()=>{
          
       // target elements with the "draggable" class
interact('.draggable')
.draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  // enable autoScroll
  autoScroll: true,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end (event) {
      var textEl = event.target.querySelector('p')

      textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                   Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px')
    }
  }
})

function dragMoveListener (event) {
var target = event.target
// keep the dragged position in the data-x/data-y attributes
var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

// translate the element
target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

// update the posiion attributes
target.setAttribute('data-x', x)
target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

    //setting the background image
    document.querySelector(".main_design_box").style.backgroundImage=`url("${bodyBackground}")`
     //setting to move box on drag
    let moverBox=document.querySelectorAll(".drag_box")
     moverBox.forEach(element => {
      element.onclick=function(){
        alert("fine")
      }
     });   
         
     interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ]
  })
   
  
   },[])


    const starIcons=[...document.querySelectorAll("fa-star-o")]
   const changeIcon=(e)=>{
     alert(e.target)
     alert(starIcons.indexOf(e.target))
      e.target.setAttribute("class","fa fa-star")
   }
   //code below for movable boxes
     const [index,setIndex]=React.useState('')
       const [countBox,setcountBox]=React.useState(1)
    const [box,setBox]=React.useState([
      {
        id:"data-"+countBox,
        type:"texarea"
      }
    ])
      const contextMenu=(e)=>{
        e.preventDefault()
        if(e.target.className!="resize-drag" || e.target.className!="draggable"){
         inputBox.forEach(element => {
          element.style.outlineColor="transparent"
        })
      }
    
      }
         const addTexrarea=()=>{
           setcountBox(countBox+1)
              setBox([...box,
                {
                  id:"data-"+countBox
                }])
         }
         const allResize=()=>{
           itemside.forEach(element => {
                  element.style.height=element.scrollHeight+"px"
           });
         }
         //resizing the height of the text box
         const resizeHeight=(e)=>{
            e.target.style.height=e.target.scrollHeight+"px"
         }
         //check boxes displayed by the right
         const checkBoxes=(e)=>{
           setIndex(e.target.id)
              for(let i=0;i<inputBox.length;i++){

               if(i==Number(e.target.id)){
                 inputBox[i].style.outlineColor="var(--light-blue)";
               itemside[i].style.borderColor="var(--light-blue)";
               }
               else{
                inputBox[i].style.outlineColor="transparent";
                itemside[i].style.borderColor="transparent";
               }
              }
         }
             
         const highlightChild=(e)=>{
          e.target.style.height=e.target.scrollHeight+"px";
          setIndex(e.target.getAttribute("data-id"))
             for(let i=0;i<inputBox.length;i++){
              if(i==Number( e.target.getAttribute("data-id"))){
                inputBox[i].style.outlineColor="var(--light-blue)";
                itemside[i].style.borderColor="var(--light-blue)";
              }
              else{
                itemside[i].style.outlineColor="transparent";
                itemside[i].style.borderColor="transparent"
              }
             }
         }
         const pastText=(e)=>{
          if(index){
            inputBox[index].value=e.target.getAttribute("data-text")
              allResize()
         }
        }

         //chamging background color
         const changeBackgroundColor=(e)=>{
          if(index){
          inputBox[index].style.backgroundColor=e.target.value
         }
        }
          //chamging border color
          const changeBorderColor=(e)=>{
            if(index){
            inputBox[index].style.borderColor=e.target.value
           }
          }
           //chamging color
          const changeColor=(e)=>{
            if(index){
            inputBox[index].style.color=e.target.value
           }
          }
             //chamging width
          const changeWidth=(e)=>{
            if(index){
           inputBox[index].style.width=e.target.value-0+"%"
           }
          }
              //chamging opacity
              const changeOpacity=(e)=>{
                if(index){
               inputBox[index].style.opacity=e.target.value/100
               }
              }
                 //chamging word space
                 const changeWordSpace=(e)=>{
                  if(index){
                 inputBox[index].style.wordSpacing=(e.target.value/100)*50+"px"
                 }
                }
                 //chamging line space
                 const changeLineSpace=(e)=>{
                  if(index){
                 inputBox[index].style.lineHeight=(e.target.value/100)*50+"px"
                 }
                }
               //chamging rotate-x
               const changeRotateX=(e)=>{
                if(index){
               inputBox[index].style.transform=`rotateX(${(e.target.value/100)*360}deg)`
               }
              }
               //chamging rotate-y
               const changeRotateY=(e)=>{
                if(index){
               inputBox[index].style.transform=`rotateY(${(e.target.value/100)*360}deg)`
               }
              }
               //chamging rotate-x
               const changeRotateZ=(e)=>{
                if(index){
               inputBox[index].style.transform=`rotateZ(${(e.target.value/100)*360}deg)`
               }
              }
              //chamging background opacity
              const changeBgOpacity=(e)=>{
                if(index && inputBox[index].style.backgroundColor){
                  let bgcolor=inputBox[index].style.backgroundColor.trim();
                inputBox[index].style.backgroundColor=`rgba${bgcolor.substring(bgcolor.indexOf("("),bgcolor.length-1)}, ${e.target.value/100})`
              if(inputBox[index].style.backgroundColor.substring(0,4)=="rgba"){
                inputBox[index].style.backgroundColor=`rgba${bgcolor.substring(bgcolor.indexOf("("),bgcolor.length-5)}${e.target.value/100})`
              }
                else{
                  inputBox[index].style.backgroundColor=`rgba${bgcolor.substring(bgcolor.indexOf("("),bgcolor.length-1)},${e.target.value/100})`
                }
               }
              }
                //chamging border opacity
                const changeBorderOpacity=(e)=>{
                  if(index && inputBox[index].style.borderColor){
                    let bgcolor=inputBox[index].style.borderColor.trim();
                  inputBox[index].style.borderColor=`rgba${bgcolor.substring(bgcolor.indexOf("("),bgcolor.length-1)}, ${e.target.value/100})`
                if(inputBox[index].style.borderColor.substring(0,4)=="rgba"){
                  inputBox[index].style.borderColor=`rgba${bgcolor.substring(bgcolor.indexOf("("),bgcolor.length-5)}${e.target.value/100})`
                }
                  else{
                    inputBox[index].style.borderColor=`rgba${bgcolor.substring(bgcolor.indexOf("("),bgcolor.length-1)},${e.target.value/100})`
                  }
                 }
                }
               
                //chamging border width
                const changeBorderWidth=(e)=>{
                  if(index){
                 inputBox[index].style.borderWidth=e.target.value+"px"
                 }
                }
                //changing font weight
                const changeFontWeight=(e)=>{
                  if(index){
                 inputBox[index].style.fontWeight=e.target.value*9
                 }
                }
                //changing font size
                const changeFontSize=(e)=>{
                  if(index){
                 inputBox[index].style.fontSize=e.target.value+"px"
                 }
                }
                 //chamging border
                 const changeBorderRadius=(e)=>{
                  if(index){
                   let data=e.target.parentElement.children[0].children[0].children[0].getAttribute("data-name")
               
                   switch(data){
                    case "borderBottomRightRadius" : 
                    inputBox[index].style.borderBottomRightRadius=e.target.value+"px"
                  
                     case "borderBottomLeftRadius" : 
                       inputBox[index].style.borderBottomLeftRadius=e.target.value+"px"

                         case "borderTopLeftRadius" : 
                         inputBox[index].style.borderTopLeftRadius=e.target.value+"px"
                           
                           case "borderTopRightRadius" : 
                           inputBox[index].style.borderTopRightRadius=e.target.value+"px"
                             
                  }
                  }
                }
                //changine data-name
                 const changeAttribute=(e)=>{
                   e.target.parentElement.parentElement.children[0].innerHTML=e.target.innerHTML
                   e.target.parentElement.parentElement.children[0].setAttribute("data-name",e.target.getAttribute("data-name"))
                 }

                  //chamging padding
                  const changePadding=(e)=>{
                    if(index){
                      let data=e.target.parentElement.children[0].children[0].children[0].getAttribute("data-name")
                      switch(data){
                      case "paddingTop" : 
                      inputBox[index].style.paddingTop=e.target.value+"px"
                    
                       case "paddingBottom" : 
                         inputBox[index].style.paddingTop=e.target.value+"px"

                           case "paddingRight" : 
                           inputBox[index].style.paddingRight=e.target.value+"px"
                             
                             case "paddingLeft" : 
                             inputBox[index].style.paddingLeft=e.target.value+"px"
                               
                    }
                    }
                  }
                

                   //chamging border width
                   const changeBorder=(e)=>{
                    if(index){
                      let data=e.target.parentElement.children[0].children[0].children[0].getAttribute("data-name")
                      switch(data){
                      case "borderTopWidth" : 
                      inputBox[index].style.borderTopWidth=e.target.value+"px"
                    
                       case "borderBottomWidth" : 
                         inputBox[index].style.borderBottomWidth=e.target.value+"px"

                           case "borderRightWidth" : 
                           inputBox[index].style.borderRightWidth=e.target.value+"px"
                             
                             case "borderLeftWidth" : 
                             inputBox[index].style.borderLeftWidth=e.target.value+"px"
                               
                    }
                    }
                  }

                  const changeAttributeFont=(e)=>{
                    if(index){
                    e.target.parentElement.parentElement.children[0].innerHTML=e.target.innerHTML
                    e.target.parentElement.parentElement.children[0].setAttribute("data-name",e.target.getAttribute("data-name"))
                    inputBox[index].style.fontStyle=e.target.innerHTML.toLowerCase()
                  }
                }
                const changeAttributeBstyle=(e)=>{
                  if(index){
                  e.target.parentElement.parentElement.children[0].innerHTML=e.target.innerHTML
                  e.target.parentElement.parentElement.children[0].setAttribute("data-name",e.target.getAttribute("data-name"))
                  inputBox[index].style.borderStyle=e.target.innerHTML.toLowerCase()
                }
              }

              const changeAttributeFontF=(e)=>{
                if(index){
                e.target.parentElement.parentElement.children[0].innerHTML=e.target.innerHTML
                e.target.parentElement.parentElement.children[0].setAttribute("data-name",e.target.getAttribute("data-name"))
                inputBox[index].style.fontFamily=e.target.innerHTML.toLowerCase()
              }
            }
 
           const alignLeft=(e)=>{
            if(index){
              inputBox[index].style.textAlign="left"
              }
           }
           const alignCenter=(e)=>{
            if(index){
              inputBox[index].style.textAlign="center"
              }
           }
           const alignRight=(e)=>{
            if(index){
              inputBox[index].style.textAlign="right"
              }
           } 
           const [line,setLine]=React.useState(true)
           const underline=(e)=>{
            if(index){
              if(line){
                e.target.style.color="rgba(100,100,100,0.7)";
              inputBox[index].style.textDecoration="underline";
              setLine(!line)
              }
              else{
                e.target.style.color="rgba(0,0,0,0.85)";
                inputBox[index].style.textDecoration="none"
                setLine(!line)
              }
            }
           }
    const changeBgPosition=(e)=>{
      document.querySelector(".main_design_box").style.backgroundPosition=e.target.getAttribute("data-name")
    }
    const changeBodyBackground=(e)=>{
      let color=e.target.parentElement.children[0].children[1].style.backgroundColor.trim()
      let opaque=e.target.parentElement.children[1].children[1]
      document.querySelector(".main_design_box").style.backgroundImage=`linear-gradient(rgba${color.substring(color.indexOf("("),color.length-1)},${opaque.value/100}),rgba${color.substring(color.indexOf("("),color.length-1)},${opaque.value/100})), url('${bodyBackground}')`
    } 
    //changing the width of the body
    const changeBodyWidth=(e)=>{
      document.querySelector(".main_design_box").style.width=(e.target.value/100)*95+"%"
    }
    const changeSide=(e)=>{
         e.target.parentElement.children[1].style.backgroundColor=e.target.value
    }
    //to reset the body background image using url
    const resetBackground=(e)=>{
      if(e.target.parentElement.children[0].value.trim()!=""){
      document.querySelector(".main_design_box").style.backgroundImage=`url("${e.target.parentElement.children[0].value}")`
      localStorage.setItem("bgImage",e.target.parentElement.children[0].value) 
      }
    }
       
        const downloadquote=()=>{
        document.querySelector(".snapshot_contain").classList.add("bottom_up")
          html2canvas(document.querySelector(".main_design_box")).then(canvas => {
            document.querySelector(".snapshot_div").appendChild(canvas)
        });

        }
       const [date,setDate]=React.useState()
       const [dateId,setDateId]=React.useState()
         const mouseDown=(e)=>{
           let date=new Date().getSeconds()
           setDate(date)
           setDateId(e.target.id)
         }
         const mouseUp=(e)=>{
          let dateend=new Date().getSeconds()
          if(Number(dateend)-Number(date)>1){
            if(box.length>1){
                   e.target.children[0].classList.remove("hidepics")
                  //  alert(e.target.children[0].getBoundingClientRect().right)
            if(document.querySelector(".item_side").getBoundingClientRect().right-e.target.children[0].getBoundingClientRect().right<0){
              e.target.children[0].style.left="-100%"              
            }
                }   
          }
        }
        const alowPop=(e)=>{
          setBox(box.filter(e=>box.indexOf(e)!=dateId))
           e.target.parentElement.parentElement.classList.add("hidepics")
        }
        const canclePop=(e)=>{
          e.target.parentElement.parentElement.classList.add("hidepics")
       }

     return (
         <div>
           <div className='snapshot_contain flex'>
             <div className='snapshot_div'>
              
             </div>
           </div>
             <div className='video_header flex'>
               <div className='put_back flex'>
               {/* begin of paragraph */}
               <p className='col-md-10 col-lg-9'>
                 <h1>
                     Bring Your Inspirational Words. <span>to be Visual</span>
               </h1> {/* end of h1 */}

              
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

            <div  className='body_section flex align-items'>
                <div className='side_topic'>
                  <h4 className='quotes'>Quotes</h4>
                    {proverbs.map(e=>
                      <div onClick={pastText} data-text={e.text} key={proverbs.indexOf(e)} className='sugested_content'>{e.text.substring(0,50)+"..."}</div>
                      )}
                  </div>  {/* end of side topic */} 


               <div className='design_body' onDrop={(e)=>{e.preventDefault()}}>
                 <div className='flex semi_container'>  
                 <div className='main_design_box'>
                  <div onClick={contextMenu} className='container_fill' onDrop={(e)=>{e.preventDefault()}}> 
                      {box.map(e=><textarea onDoubleClick={changeresize} onClick={highlightChild} data-id={box.indexOf(e)} className={resizeclass} id={e.id} key={e.id}  onChange={resizeHeight}>type text</textarea>)}
                    </div> 
                    </div>{/* end of main design box */}
                  </div>{/* end of semi container */}
                  <div className='props_set'>
                    <div className='prop_set_div no-overflow'>
                    <span className='append_button' onClick={addTexrarea}>+</span>
                      <span className='setting_box'>
                        <i>Bg color</i>
                        <input type="color" onChange={changeBackgroundColor}></input>
                      </span>{/* end of background color */}
                      <span className='setting_box'>
                        <i>Border color</i>
                        <input type="color" onChange={changeBorderColor}></input>
                      </span>{/* end of background color */}
                      <span className='setting_box'>
                        <i>Color</i>
                        <input type="color" onChange={changeColor}></input>
                      </span>{/* end of color */}
                      <span className='setting_box'>
                        <i>Width</i>
                        <input type="range" onChange={changeWidth}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>Opacity</i>
                        <input type="range" onChange={changeOpacity}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>Bg-opacity</i>
                        <input type="range" onChange={changeBgOpacity}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>Bd-opacity</i>
                        <input type="range" onChange={changeBorderOpacity}></input>
                      </span>{/* end of width */}
                     
                      <span className='setting_box'>
                        <i>Font-weight</i>
                        <input type="range" onChange={changeFontWeight}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>Font-size</i>
                        <input type="range" onChange={changeFontSize}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>line-space</i>
                        <input type="range" onChange={changeLineSpace}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>word-space</i>
                        <input type="range" onChange={changeWordSpace}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>Border width</i>
                        <input type="range" onChange={changeBorderWidth}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>Rotate-z</i>
                        <input type="range" onChange={changeRotateZ}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>Rotate-y</i>
                        <input type="range" onChange={changeRotateY}></input>
                      </span>{/* end of width */}
                      <span className='setting_box'>
                        <i>Rotate-x</i>
                        <input type="range" onChange={changeRotateX}></input>
                      </span>{/* end of width */}
                      <span className='setting_box_multi'>
                        <span>
                          <span name="padding" id="" className='select relative'>
                           <span  className='feedback'> <i className='name-display' data-name="borderBottomLeftRadius">Border-radius-bottom-left</i>
                            <span className='feedcontent'>
                                <i onClick={changeAttribute} data-name="borderBottomRightRadius">Border-radius-bottom-right</i>
                                <i onClick={changeAttribute} data-name="borderBottomLeftRadius">Border-radius-bottom-left</i>
                                <i onClick={changeAttribute} data-name="borderTopLeftRadius">Border-radius-top-left</i>
                                <i onClick={changeAttribute} data-name="borderTopRightRadius">Border-radius-top-Right</i>
                            </span>{/* end of feedcontent */}
                            </span>{/* end of feedback */}
                          </span>{/* end of select */}
                        <input type="number" onChange={changeBorderRadius}></input>
                        </span>
                      </span>{/* end of setting_box_multi */}

                      <span className='setting_box_multi'>
                        <span>
                          <span name="padding" id="" className='select relative'>
                           <span  className='feedback'> <i className='name-display for_padding' data-name="paddingLeft">Padding-left</i>
                            <span className='feedcontent'>
                                <i onClick={changeAttribute} data-name="paddingLeft">Padding-left</i>
                                <i onClick={changeAttribute} data-name="paddingBottom">Padding-bottom</i>
                                <i onClick={changeAttribute} data-name="paddingTop">Padding-top</i>
                                <i onClick={changeAttribute} data-name="paddingRight">Padding-right</i>
                            </span>{/* end of feedcontent */}
                            </span>{/* end of feedback */}
                          </span>{/* end of select */}
                        <input type="number" onChange={changePadding}></input>
                        </span>
                      </span>{/* end of setting_box_multi */}

                      <span className='setting_box_multi'>
                        <span>
                          <span name="padding" id="" className='select relative'>
                           <span  className='feedback'> <i className='name-display ' data-name="borderBottomWidth">Border-bottom</i>
                            <span className='feedcontent'>
                                <i onClick={changeAttribute} data-name="borderLeftWidth">Border-left</i>
                                <i onClick={changeAttribute} data-name="borderRightWidth">Border-right</i>
                                <i onClick={changeAttribute} data-name="borderTopWidth">Border-top</i>
                                <i onClick={changeAttribute} data-name="borderBottomWidth">Border-bottom</i>
                            </span>{/* end of feedcontent */}
                            </span>{/* end of feedback */}
                          </span>{/* end of select */}
                        <input type="number" onChange={changeBorder}></input>
                        </span>
                      </span>{/* end of setting_box_multi */}
                       
                      <span className='setting_box_multi'>
                        <span>
                          <span name="padding" id="" className='select relative'>
                           <span  className='feedback'> <i className='name-display' data-name="normal">font-style</i>
                            <span className='feedcontent'>
                                <i onClick={changeAttributeFont} data-name="italic">Italic</i>
                                <i onClick={changeAttributeFont} data-name="normal">Normal</i>
                                <i onClick={changeAttributeFont} data-name="oblique">oblique</i>
                            </span>{/* end of feedcontent */}
                            </span>{/* end of feedback */}
                          </span>{/* end of select */}
            
                        </span>
                      </span>{/* end of setting_box_multi */}


  
                      <span className='setting_box_multi'>
                        <span>
                          <span name="padding" id="" className='select relative'>
                           <span  className='feedback'> <i className='name-display' data-name="solid">Border-style</i>
                            <span className='feedcontent'>
                                <i onClick={changeAttributeBstyle} data-name="dashed">Dashed</i>
                                <i onClick={changeAttributeBstyle} data-name="botted">Dotted</i>
                                <i onClick={changeAttributeBstyle} data-name="double">Double</i>
                                <i onClick={changeAttributeBstyle} data-name="groove">Groove</i>
                                <i onClick={changeAttributeBstyle} data-name="solid">Solid</i>
                            </span>{/* end of feedcontent */}
                            </span>{/* end of feedback */}
                          </span>{/* end of select */}
            
                        </span>
                      </span>{/* end of setting_box_multi */}
                      
                      <span className='setting_box_multi'>
                        <span>
                          <span name="padding" id="" className='select relative'>
                           <span  className='feedback'> <i className='name-display' data-name="helvetica">font-family</i>
                            <span className='feedcontent'>   
                               {Style[0].fontFamily.map(e=> <i onClick={changeAttributeFontF} data-name={e.name}>{e.name}</i>)}
                            </span>{/* end of feedcontent */}
                            </span>{/* end of feedback */}
                          </span>{/* end of select */}
            
                        </span>
                      </span>{/* end of setting_box_multi */}


                      <span className='setting_box'>
                        <span className='fa fa-align-left iconic' onClick={alignLeft}></span>
                      </span>{/* end of box setting */}
                      <span className='setting_box'>
                        <span className='fa fa-align-center iconic' onClick={alignCenter}></span>
                      </span>{/* end of box setting */}
                      <span className='setting_box'>
                        <span className='fa fa-align-right iconic' onClick={alignRight}></span>
                      </span>{/* end of box setting */}
                      <span className='setting_box'>
                        <span className='fa fa-underline iconic' onClick={underline}></span>
                      </span>{/* end of box setting */}
                      </div>{/* end of prop set div */}
                  </div>{/* end of prop set */}
              </div>  {/* end of design body */}
                        

            <div className="item_side_contain no-overflow">
              <div className='no-overflow item_side'>
                {box.map(e=><div onClick={checkBoxes} onMouseDown={mouseDown} onMouseUp={mouseUp} key={box.indexOf(e)} id={box.indexOf(e)} className='track_box relative'>{box.indexOf(e)+1}
                <div className='check_pop hidepics'>
                  Sure to delete, No recovery
                  <span>
                  <i onClick={alowPop}>Yes</i><i onClick={canclePop}>No</i>
                  </span> 
                  </div>{/* end of check_pop */}
                 </div>)}
                </div>

                <div className='background_side no-overflow'>
                      <div><br></br>
                        <span className='head_name'>Set background</span>
                        <span className='setting_box_multi'>
                        <span>
                          <span name="padding" id="" className='select relative'>
                           <span  className='feedback'> <i className='name-display' data-name="center">center</i>
                            <span className='feedcontent'>
                              {Style[0].bgposition.map(e=><i key={box.indexOf(e)} onClick={changeBgPosition} data-name={e}>{e}</i>)}
                                </span>{/* end of feedcontent */}
                            </span>{/* end of feedback */}
                          </span>{/* end of select */}
                       
                        </span>
                      </span>{/* end of setting_box_multi */}

                        <div className='image_detail_contain contain_set_background'>
                        <span className='setting_box'>
                          <i>color</i>
                          <em style={{display:"none"}}></em>
                        <input type="color" onChange={changeSide}></input>
                      </span>{/* end of setting box */}
                      <span className='setting_box'>
                      <i>opacity</i>
                        <input type="range" ></input>
                      </span>{/* end of setting box */}
                      <button className='set_button' onClick={changeBodyBackground}>set background</button>
                      </div>{/* end of contain set backgrond */}
                         
                         <div className='image_detail_contain'>
                           <input className='side_url_input' type='url' required placeholder='input url of image'></input><button onClick={resetBackground} className='set_button'>set url image</button>
                         </div>{/* end of image detail contain */}

                         <div className='image_detail_contain'>
                           <em>Adjust width</em><br></br>
                           <input className='adjust_range' onChange={changeBodyWidth} type='range'></input>
                         </div>{/* end of image detail contain */}
                        
                        
                         <div className='image_detail_contain'>
                           
                           <button className='set_button' onClick={downloadquote}><i className='fa fa-download'></i> save quote</button>
                              </div>{/* end of image detail contain */}

                      </div>

                </div>
            </div>{/* end of item side */}
            
            
        </div>{/* end of body section */}<br></br><br></br>
          <Footer></Footer>
         </div>
     )
 }