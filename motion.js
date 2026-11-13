// Motion direction: preserve desktop cinema, prevent pinned scene overlaps and scroll hijacking on touch.
function initMotion(){
  const g=window.gsap, ST=window.ScrollTrigger;
  const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const mobile=window.matchMedia('(max-width:900px)').matches;
  const cinematic=!reduce&&!mobile;
  const pre=document.querySelector('.preloader');
  if(!g||!ST){
    pre?.remove();
    document.querySelectorAll('.hero-line>span,.hero-sub,.hero-actions').forEach(el=>{el.style.transform='none';el.style.opacity='1';el.style.filter='none'});
    return;
  }
  g.registerPlugin(ST);
  ST.getAll().forEach(t=>t.kill());
  if(cinematic&&window.Lenis&&!window.__mairaLenis){
    const l=new window.Lenis({duration:1.02,smoothWheel:true,wheelMultiplier:.92});
    l.on('scroll',ST.update);
    g.ticker.add(t=>l.raf(t*1000));
    g.ticker.lagSmoothing(0);
    window.__mairaLenis=l;
  }else if(!cinematic&&window.__mairaLenis){
    window.__mairaLenis.destroy();
    window.__mairaLenis=null;
  }
  if(pre){
    const bar=pre.querySelector('.bar i');
    if(bar)g.to(bar,{x:'0%',duration:.65,ease:'power3.out'});
    g.to(pre,{autoAlpha:0,duration:.6,delay:.55,ease:'power2.inOut',onComplete:()=>pre.remove()});
  }
  const lines=document.querySelectorAll('.hero-line>span');
  if(lines.length)g.to(lines,{y:0,filter:'blur(0px)',duration:1.05,stagger:.12,delay:.28,ease:'power4.out'});
  const heroText=document.querySelectorAll('.hero-sub,.hero-actions');
  if(heroText.length)g.to(heroText,{opacity:1,y:0,duration:.8,stagger:.1,delay:.72,ease:'power3.out'});
  g.to('.progress',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.4}});
  if(document.querySelector('#threadPath')){
    g.to('#threadPath',{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.55}});
  }
  if(document.querySelector('.hero')){
    g.to('.hero-media',{y:mobile?20:72,scale:mobile?1.035:1.10,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    if(cinematic&&document.querySelector('.cinema-cut'))g.to('.cinema-cut',{clipPath:'circle(150% at 78% 82%)',ease:'none',scrollTrigger:{trigger:'.hero',start:'75% top',end:'bottom top',scrub:true}});
    if(cinematic)g.to('.hero-copy-inner',{y:-38,opacity:.35,ease:'none',scrollTrigger:{trigger:'.hero',start:'48% top',end:'bottom top',scrub:true}});
  }
  if(document.querySelector('.manifest')){
    g.from('.portrait-a',{y:mobile?28:86,scale:.97,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.manifest',start:'top 78%'}});
    g.from('.portrait-b',{y:mobile?-18:-55,x:mobile?0:28,rotate:mobile?0:3,duration:.95,ease:'power3.out',scrollTrigger:{trigger:'.manifest',start:'top 72%'}});
  }
  if(cinematic&&document.querySelector('.universes')){
    const u=g.timeline({scrollTrigger:{trigger:'.universes',start:'top top',end:'bottom bottom',scrub:1}});
    u.to('.u1',{scale:.86,yPercent:-30,opacity:0,duration:1},0)
     .to('.u2',{scale:1,yPercent:0,opacity:1,duration:1},0)
     .to('.u2',{scale:.86,yPercent:-30,opacity:0,duration:1},1)
     .to('.u3',{scale:1,yPercent:0,opacity:1,duration:1},1);
  }
  const cinema=document.querySelector('.cinema-interlude');
  if(cinema){
    if(cinematic){
      const ct=g.timeline({scrollTrigger:{trigger:cinema,start:'top top',end:'bottom bottom',scrub:1}});
      ct.fromTo('.cinema-video',{scale:1.01,yPercent:0},{scale:1.12,yPercent:-4,duration:2,ease:'none'},0)
       .fromTo('.beat-1',{opacity:1,y:85,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.6},0)
       .to('.beat-1',{opacity:0,y:-75,filter:'blur(9px)',duration:.45},.75)
       .fromTo('.beat-2',{opacity:0,y:80,filter:'blur(9px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.65},.9);
    }else{
      g.from('.cinema-beats',{opacity:.7,y:22,duration:.75,ease:'power2.out',scrollTrigger:{trigger:cinema,start:'top 78%'}});
    }
  }
  document.querySelectorAll('.chapter').forEach(s=>{
    const frames=[s.querySelector('.frame.main'),s.querySelector('.frame.small'),s.querySelector('.frame.tiny')];
    frames.filter(Boolean).forEach((el,i)=>{
      if(cinematic)g.fromTo(el,{y:[70,110,-40][i],rotate:[0,3,-3][i],scale:.95},{y:[-14,-28,38][i],rotate:[0,-1,2][i],scale:1,ease:'none',scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1.1}});
      else if(!reduce)g.from(el,{y:i===1?28:16,opacity:.8,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%'}});
    });
  });
  if(cinematic&&document.querySelector('.brow-media'))g.to('.precision-svg path',{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:'.brow-media',start:'top 75%',end:'bottom 45%',scrub:.9}});
  const track=document.querySelector('.track');
  if(track&&cinematic){
    const getX=()=>Math.max(0,track.scrollWidth-window.innerWidth+80);
    g.to(track,{x:()=>-getX(),ease:'none',scrollTrigger:{trigger:'.portfolio',start:'top top',end:'bottom bottom',scrub:1,invalidateOnRefresh:true}});
  }
  if(document.querySelector('.final-bg'))g.to('.final-bg',{scale:1.07,y:-20,ease:'none',scrollTrigger:{trigger:'.final',start:'top bottom',end:'bottom top',scrub:1}});
  document.querySelectorAll('.route-hero-bg img').forEach(img=>g.to(img,{scale:1.07,y:30,ease:'none',scrollTrigger:{trigger:img.closest('.route-hero'),start:'top top',end:'bottom top',scrub:true}}));
  document.querySelectorAll('.service').forEach(el=>g.from(el,{y:24,opacity:0,duration:.6,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%'}}));
  ST.create({start:30,onUpdate:self=>document.querySelector('.nav')?.classList.toggle('scrolled',self.scroll()>30)});
  const scenes=[...document.querySelectorAll('[data-scene]')],dots=[...document.querySelectorAll('.hud i')];
  scenes.forEach(s=>ST.create({trigger:s,start:'top center',end:'bottom center',onToggle:x=>{
    if(x.isActive){const n=+s.dataset.scene;dots.forEach((d,i)=>d.classList.toggle('active',i===n));}
  }}));
  ST.refresh();
}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="/"]');
  if(!a||a.target)return;
  const href=a.getAttribute('href');
  if(!routes[href]&&href!=='/')return;
  e.preventDefault();
  history.pushState({},'',href);
  render();
  document.querySelector('.mobile-nav')?.classList.remove('open');
  document.querySelector('.mobile-nav-toggle')?.setAttribute('aria-expanded','false');
});
window.addEventListener('popstate',render);
render();
