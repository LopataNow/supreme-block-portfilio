'use client';

import React, { useRef, useEffect, useState }  from 'react';
import ParticleManager from './particle-manager';

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
  if(!canvas) return {x: evt.clientX, y: evt.clientY};
  const rect = canvas?.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY,
  };
}

var particleManager: ParticleManager;
var canvas: any;
var intervalReset: any;
var lastTime: number = 0;

function Canvas(props: any){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  const onMoveHandle = function(e: any){
    if(particleManager){
      particleManager.setMousePosition(getMousePos(canvas, e))
    }
  }
  
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let animationFrameId: number;

      particleManager = new ParticleManager(canvas, context, () => {setLoading(false)});

      const render = (time:number) => {
        const deltaTime = (time - lastTime) / 1000;
        lastTime = time;
        particleManager.draw(context, deltaTime);
        animationFrameId = window.requestAnimationFrame(render);
      }
      animationFrameId = window.requestAnimationFrame(render);

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