    

    export default function scrollVertical(e,items){
        let items=document.querySelectorAll(`${items}`)
        let top=e.target.getBoundingClientRect().top
         for(let p=0;p<items.length;p++){
             if(items[p].getBoundingClientRect().top<top+e.target.clientHeight/1.5){
                items[p].style.cssText="opacity:1;transform:scaleZ(1);left:0;top:0;transition:0.5s;"
             }
             else{
                items[p].style.cssText="opacity:0;transition:0.5s;transform:scaleZ(0)"
             }
         }
        // let scaler=1-((items[items.length-1].getBoundingClientRect().top)/e.target.scrollHeight)       
     }