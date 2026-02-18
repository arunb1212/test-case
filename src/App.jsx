import React, { useState } from 'react'

const App = () => {

  const canvasRef = React.useRef(null)
const contextRef=React.useRef(null)
const [color,setColor]=useState('red')
const colors=["red","blue","green","yellow","black","white"]
const [isDrawing,setIsDrawing]=useState(false)
  React.useEffect(() => {
    const canvas = canvasRef.current
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    const context=canvas.getContext('2d')
    context.lineWidth=5
    context.lineCap='round'
    context.strokeStyle=color
    contextRef.current = context
  }, [])

  React.useEffect(()=>{
        contextRef.current.strokeStyle=color

  },[color])

  const startDrawing=(e)=>{
     const context=contextRef.current
     context.beginPath()
     context.moveTo(e.clientX,e.clientY)
setIsDrawing(true)
  }
  const finishDrawing=()=>{
    contextRef.current.closePath()
setIsDrawing(false)
  }

  const draw=(e)=>{
    if(!isDrawing){
      return
    }
    const context=contextRef.current
    context.lineTo(e.clientX,e.clientY)
    context.stroke()
  }
  const hadlecolor=(color)=>{

    setColor(color)
    console.log(color)
  }
  return (
    <div>
      <div>colors
        {
          colors.map((color)=>{
            return <div key={color} style={{backgroundColor:color,width:20,height:20,borderRadius:"50%"}} onClick={()=>hadlecolor(color)}></div>
          })
        }
         </div>
      <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw}></canvas>
    </div>
  )
}

export default App