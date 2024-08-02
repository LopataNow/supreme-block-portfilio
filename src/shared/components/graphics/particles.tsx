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

function Canvas(props: any){
  const canvasRef = useRef(null);

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

      particleManager = new ParticleManager(canvas, context);

      const render = () => {
        particleManager.draw(context);
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()

      /*window.addEventListener("resize", ()=>{
        const intervalReset = setInterval(() => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          particleManager.init();
          window.cancelAnimationFrame(animationFrameId)
        }, 0.1);
      });*/

    return () => {
      particleManager.disable();
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className='particles'>
      <canvas
          ref={canvasRef} {...props} 
          style={{width: '100%', height: '97vh'}}
          onMouseMove={onMoveHandle} 
          onTouchMove={(e)=>{console.log(e)}}/>
    </div>
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