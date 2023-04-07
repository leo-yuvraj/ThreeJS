import gsap from "gsap";

export const scrollAnimation = (position,target,onUpdate)=>{
    const tl = gsap.timeline();

    tl.to(position,{
        x:-3.38,
        y:-10.74,
        z:-5.93,
        scrollTrigger:{
            trigger:'.sound-section', //the area
            start:'top bottom', //place where it shpuld hold
            end:'top top', //when the top of viewport(below navbar) and sound-section(white region)
            scrub:2, //changing its position on scroll(even numbers can be provided, like '2' for some delay)
            immediateRender:false,
        },
        onUpdate
    })
    .to(target,{
        x:1.52,
        y:0.77,
        z:-1.08,
        scrollTrigger:{
            trigger:'.sound-section', 
            start:'top bottom', 
            end:'top top', 
            scrub:2, 
            immediateRender:false,
        },
    })
    .to('.jumbotron-section',{
        opacity:0, //This is for another iphone image to fade out with animation
        scrollTrigger:{
            trigger:'.sound-section', 
            start:'top bottom', 
            end:'top top', 
            scrub:2, 
            immediateRender:false,
        },
    })
    .to('.sound-section-content',{
        opacity:1, //This is for the text in sound-section to fade in with animation
        //NOTE:before putting opacity as 1, apply original opacity as 0 in CSS.
        scrollTrigger:{
            trigger:'.sound-section', 
            start:'top bottom', 
            end:'top top', 
            scrub:2, 
            immediateRender:false,
        },
    })
    .to(position,{
        x:1.56,
        y:5.0,
        z:0.01,
        scrollTrigger:{
            trigger:'.display-section', 
            start:'top bottom', 
            end:'top top', 
            scrub:2, 
            immediateRender:false,
        },
        onUpdate
    })
    .to(target,{
        x:-0.55,
        y:0.32,
        z:0.0,
        scrollTrigger:{
            trigger:'.display-section', 
            start:'top bottom', 
            end:'top top', 
            scrub:2, 
            immediateRender:false,
        },
    })
    .to('.display-section.wrapper',{
        opacity:1, //This is for the text in sound-section to fade in with animation
        scrollTrigger:{
            trigger:'.display-section', 
            start:'top bottom', 
            end:'top top', 
            scrub:2, 
            immediateRender:false,
        },
    })
}