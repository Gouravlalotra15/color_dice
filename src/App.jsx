import { useState,useEffect } from "react"
import "./App.css"


let order=0;
let allClicked=false;
const App = () => {  

  const[boxState,setBoxState]=useState(getBoxes("initial"));

  useEffect(()=>{
    
    if(boxState.find((item)=>item.isClicked===false))
    allClicked=false;
    else
    allClicked=true;

    if(allClicked)
    {
        boxState.forEach((item,index)=>
        {
          return setTimeout(()=>{
            let tempBox=[...boxState];
            tempBox[index].isClicked=false;
            setBoxState(tempBox)
          },1000*(index+1))
        })
           
    }

  },[boxState])

  const changeColor=(i,j)=>{
    let tempBoxState=[...boxState];
    const selectedBox=tempBoxState.find((item)=>item.i===i&&item.j===j);
    selectedBox.isClicked=true;
    selectedBox.order=++order;
    tempBoxState.sort((a,b)=>a.order-b.order)
    console.log(tempBoxState);
    setBoxState(tempBoxState);
  }
  
function getBoxes(type) {  
  let boxesData=[]
   const boxes = [0,1,2].map((i)=>{
      return [0,1,2].map((j)=>{

        if(type==='initial')
        if(!(i===1&&j>0))
        return(boxesData.push({i:i,j:j,isClicked:false,order:null}))

        if(!(i===1&&j>0))
        return <div className="box" style={{backgroundColor:boxState?.find((item)=>item.i===i&&item.j===j)?.isClicked ?"green":""}} onClick={()=>changeColor(i,j)} key={j}></div>

        else
        return <div></div>
      })  
    })
    if(type==='initial')
    return boxesData;
    return boxes
}

  return (
    <div className="App">
    <div className="container">{getBoxes()}</div>
    </div>
  )
}

export default App