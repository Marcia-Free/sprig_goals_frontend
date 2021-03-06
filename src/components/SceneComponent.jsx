import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import { Engine, Scene } from '@babylonjs/core'
import React, { useEffect, useRef } from 'react'




export default (props) => {
    
    const pet = document.querySelector('.VirtualPet')
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;

      


    useEffect(() => {
        if (reactCanvas.current) {
            
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
            // engine.displayLoadingUI();

            if (scene.isReady()) {
                // setTimeout(function() {engine.hideLoadingUI()}, 1000);
                props.onSceneReady(scene)
                
            } else {
                scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene));
                
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') {
                    onRender(scene);
                }
                scene.render();
                
            })
            
            const resize = () => {
                scene.getEngine().resize();
            }
            if (window) {
                window.addEventListener('resize', resize);
            }
            return () => {
                scene.getEngine().dispose();
                if (window) {
                    window.removeEventListener('resize', resize);
                }
            }
        }
    }, [reactCanvas])
    return (
        <canvas ref={reactCanvas} {...rest} />
    );
}