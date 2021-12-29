import * as actions from "./constant"
let food=[
    {id:1,name:"ade",age:34,country:"argentina"},
    {id:2,name:"john",age:16,country:"nigeria"},
    {id:3,name:"peter",age:20,country:"kenya"},
    {id:4,name:"james",age:13,country:"togo"},
    {id:5,name:"keneth",age:30,country:"uganda"},
    {id:6,name:"adekunle",age:21,country:"chile"},
    {id:7,name:"benedine",age:89,country:"brazil"},
    {id:8,name:"thomas",age:10,country:"nigeria"},
    {id:9,name:"jerry",age:19,country:"ghana"},
    {id:10,name:"kevin",age:99,country:"abia"},
    {id:11,name:"phliph",age:15,country:"korea"},
    {id:12,name:"livinus",age:60,country:"not available"},
    {id:13,name:"adeshina",age:73,country:"not available"},
    {id:14,name:"ade",age:34,country:"argentina"},
    {id:15,name:"john",age:16,country:"nigeria"},
    {id:16,name:"peter",age:20,country:"kenya"},
    {id:17,name:"james",age:13,country:"togo"},
    {id:18,name:"keneth",age:30,country:"uganda"},
    {id:19,name:"adekunle",age:21,country:"chile"},
    {id:20,name:"benedine",age:89,country:"brazil"}
 ]

 
  export default function sidereducer(state=food,action){
      switch(action.type){
        default:
            return state;
              case actions.BUNCH:
                  return([food.filter(e=>e.id!==action.payload.discription),food.filter(e=>e.id===action.payload.discription)]
                  )
      }
  }
  