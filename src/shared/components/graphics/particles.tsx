'use client';

import React, { useRef, useEffect, useState }  from 'react';
import ParticleManager from './particle-manager';

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY,
  };
}

var particleManager: any;
var canvas: any;
var intervalReset: any;

function Canvas(props: any){
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const onMoveHandle = function(e: any){
    if(particleManager){
      particleManager.setMousePosition(getMousePos(canvas, e))
    }
  }
  
  useEffect(() => {
      canvas = canvasRef.current
      const context = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let animationFrameId: number;

      particleManager = new ParticleManager(canvas, context, () => {setLoading(false)});

      const render = () => {
        particleManager.draw(context);
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()

      window.addEventListener("resize", ()=>{
        intervalReset = setTimeout(() => {
          setLoading(true);

          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          particleManager.init();
          clearInterval(intervalReset);
        }, 0.5);

        

      });

    return () => {
      particleManager.disable();
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
    {loading && <div>Loading...</div>}
    <div className='particles'>
      <canvas
          ref={canvasRef} {...props} 
          style={{width: '100%', height: '97vh'}}
          onMouseMove={onMoveHandle}/>
    </div>
    </>
  );
}

function Particles (props: any) {
  return (
    <div >
      <Canvas {...props}/>
    </div>
  );
}

export default Particles;