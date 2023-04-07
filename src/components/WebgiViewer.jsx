import React , {useRef,useState,useCallback,forwardRef,useImperativeHandle} from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck
} from "webgi";
import gsap from "gsap"; //gsap is where the rotation/animation is needed.
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { scrollAnimation } from "../lib/scroll-animation"

gsap.registerPlugin(ScrollTrigger);

const WebGiViewer=forwardRef((props,ref)=>{ //uses properties and reference

    const canvasRef=useRef(null);
    const[viewerRef,setViewerRef]=useState(null); //All the four will be used to adjust the position,camera,target defined below
    const[targetRef,setTargetRef]=useState(null);
    const[cameraRef,setCameraRef]=useState(null);
    const[positionRef,setPositionRef]=useState(null);

    useImperativeHandle(ref,()=>({
        triggerPreview(){ //To place the phone when "Try me" is clicked in display section
            gsap.to(positionRef,{
                x:13.04,
                y:-2.01,
                z:2.29,
                duration:2,
                onUpdate:()=>{
                    viewerRef.setDirty; //Marking the viewer for dirty
                    cameraRef.positionTargetUpdated(true);
                }
            });
            gsap.to(targetRef,{
                x:13.04,
                y:-2.01,
                z:2.29,
                duration:2,
            });
        }
    }))

    const memoScollAnimation = useCallback(
        (position,target,onUpdate) => {
            if(position && target && onUpdate)
                scrollAnimation(position,target,onUpdate);
        }
    )

    const setupViewer = useCallback(async() => {

        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        });

        setViewerRef(viewer);

        const manager = await viewer.addPlugin(AssetManagerPlugin)

        const camera = viewer.scene.activeCamera; //Use to access position and target
        const position = camera.position;
        const target = camera.target;

        setCameraRef(camera);
        setPositionRef(position);
        setTargetRef(target);
    
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)
    
        viewer.renderer.refreshPipeline()
    
        await manager.addFromPath("scene-black.glb")

        viewer.getPlugin(TonemapPlugin).config.clipBackground=true;

        viewer.scene.activeCamera.setCameraOptions({controlsEnabled:false}); //Users not allowed to rotate while viewing the website

        window.scrollTo(0,0); //whenever refreshs it will be on top

        let needsUpdate = true;

        const onUpdate = ()=>{
            needsUpdate=true;
            viewer.setDirty(); //This tells that camera and viewer needs to be updated
        }
        //Once it is fired it will adjust the camera position if needed.
        viewer.addEventListener("preFrame",()=>{
            if(needsUpdate){
                camera.positionTargetUpdated(true);
                needsUpdate=false;
            }
        });

        memoScollAnimation(position,target,onUpdate);
    },[]);
    
    useEffect(()=>{
        setupViewer();
    },[]);

    return (  
        <div id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef} />
        </div>
    );
    
}) 

export default WebGiViewer;