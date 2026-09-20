function initMotion(){
  if(!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.getAll().forEach(t=>t.kill());
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce&&window.Lenis){
    const lenis=new Lenis({duration:1.28,smoothWheel:true,wheelMultiplier:.92,touchMultiplier:1.08});
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
  }
  gsap.to('.preloader .bar i',{x:'0%',duration:.9,ease:'power3.out'});
  gsap.to('.preloader',{autoAlpha:0,duration:.8,delay:.7,ease:'power2.inOut',onComplete:()=>document.querySelector('.preloader')?.remove()});
  gsap.to('.film-bar.top',{scaleY:0,duration:1.15,delay:.55,ease:'power4.inOut'});
  gsap.to('.film-bar.bottom',{scaleY:0,duration:1.15,delay:.55,ease:'power4.inOut'});
  gsap.to('.hero-line>span',{y:0,filter:'blur(0px)',duration:1.35,stagger:.11,delay:.48,ease:'power4.out'});
  gsap.to('.hero-sub,.hero-actions',{opacity:1,y:0,duration:1,stagger:.12,delay:.95,ease:'power3.out'});
  gsap.to('.progress',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.25}});
  gsap.to('#threadPath',{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.32}});

  const hero=document.querySelector('.hero');
  if(hero){
    const ht=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1}});
    ht.to('.hero-media',{scale:1.34,yPercent:7,ease:'none'},0)
      .to('.hero-video',{filter:'saturate(.68) contrast(1.22) brightness(.46)',ease:'none'},0)
      .to('.hero-copy-inner',{xPercent:-13,yPercent:-20,opacity:.08,ease:'none'},0)
      .to('.lacquer-orb',{scale:6.8,xPercent:-62,yPercent:-46,rotate:42,borderRadius:'50%',ease:'power1.inOut'},.16)
      .to('.cinema-cut',{clipPath:'circle(155% at 78% 82%)',ease:'power2.inOut'},.62);
  }

  const manifest=document.querySelector('.manifest');
  if(manifest){
    const mt=gsap.timeline({scrollTrigger:{trigger:manifest,start:'top top',end:'bottom bottom',scrub:1}});
    mt.fromTo('.portrait-a',{scale:.78,yPercent:20,rotate:-8,clipPath:'inset(12% 12% 12% 12% round 34px)'},{scale:1.06,yPercent:-5,rotate:1,clipPath:'inset(0% 0% 0% 0% round 28px)',duration:1},0)
      .fromTo('.portrait-b',{xPercent:55,yPercent:35,rotate:14,scale:.7,opacity:.1},{xPercent:-8,yPercent:-12,rotate:-5,scale:1.06,opacity:1,duration:1},0)
      .fromTo('.manifest-grid>div:first-child',{xPercent:-15,opacity:.35},{xPercent:7,opacity:1,duration:.55},0)
      .to('.manifest-grid>div:first-child',{yPercent:-22,opacity:.12,duration:.45},.58)
      .to('.manifest-orbit',{rotate:48,scale:1.24,duration:1,ease:'none'},0);
  }

  const universes=document.querySelector('.universes');
  if(universes){
    const u=gsap.timeline({scrollTrigger:{trigger:universes,start:'top top',end:'bottom bottom',scrub:1}});
    u.fromTo('.u1',{clipPath:'inset(5% 7% 5% 7% round 34px)',scale:.94},{clipPath:'inset(0% 0% 0% 0% round 24px)',scale:1.03,duration:.35},0)
     .to('.u1',{xPercent:-34,yPercent:-22,rotate:-7,scale:.72,opacity:0,duration:.55},.38)
     .fromTo('.u2',{xPercent:38,yPercent:24,rotate:7,scale:.72,opacity:0},{xPercent:0,yPercent:0,rotate:0,scale:1.03,opacity:1,duration:.58},.38)
     .to('.u2',{xPercent:30,yPercent:-25,rotate:6,scale:.7,opacity:0,duration:.55},1.02)
     .fromTo('.u3',{xPercent:-38,yPercent:22,rotate:-8,scale:.72,opacity:0},{xPercent:0,yPercent:0,rotate:0,scale:1.03,opacity:1,duration:.6},1.02)
     .to('.u-head',{yPercent:-38,opacity:.2,duration:.45},1.35);
  }

  const cinema=document.querySelector('.cinema-interlude');
  if(cinema){
    const ct=gsap.timeline({scrollTrigger:{trigger:cinema,start:'top top',end:'bottom bottom',scrub:1}});
    ct.fromTo('.cinema-video',{scale:1.02,yPercent:0,filter:'saturate(.8) contrast(1.08) brightness(.62)'},{scale:1.32,yPercent:-8,filter:'saturate(.62) contrast(1.25) brightness(.38)',duration:2,ease:'none'},0)
      .fromTo('.beat-1',{opacity:0,y:140,scale:.8,filter:'blur(14px)'},{opacity:1,y:0,scale:1,filter:'blur(0px)',duration:.45},0)
      .to('.beat-1',{opacity:0,y:-150,scale:1.16,filter:'blur(12px)',duration:.5},.6)
      .fromTo('.beat-2',{opacity:0,y:160,scale:.78,filter:'blur(16px)'},{opacity:1,y:0,scale:1,filter:'blur(0px)',duration:.5},.76)
      .to('.cinema-note',{opacity:.15,y:-45,duration:.45},1.35);
  }

  document.querySelectorAll('.chapter').forEach((section,index)=>{
    const main=section.querySelector('.frame.main');
    const small=section.querySelector('.frame.small');
    const tiny=section.querySelector('.frame.tiny');
    const copy=section.querySelector('.copy');
    const tl=gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'bottom bottom',scrub:1}});
    if(main) tl.fromTo(main,{scale:.64,yPercent:16,rotate:index%2?-3:3,clipPath:'inset(8% 10% 8% 10% round 34px)'},{scale:1.18,yPercent:-5,rotate:0,clipPath:'inset(0% 0% 0% 0% round 0px)',duration:1,ease:'none'},0);
    if(copy) tl.fromTo(copy,{xPercent:index%2?-16:16,yPercent:16,opacity:.35},{xPercent:0,yPercent:0,opacity:1,duration:.45},0).to(copy,{yPercent:-34,opacity:.12,scale:.9,duration:.45},.56);
    if(small) tl.fromTo(small,{xPercent:55,yPercent:75,rotate:16,opacity:0},{xPercent:-8,yPercent:-18,rotate:-5,opacity:1,duration:.7},.08).to(small,{xPercent:-45,yPercent:-58,rotate:-14,opacity:.15,duration:.35},.72);
    if(tiny) tl.fromTo(tiny,{xPercent:-50,yPercent:-55,rotate:-18,opacity:0},{xPercent:12,yPercent:22,rotate:5,opacity:1,duration:.65},.18).to(tiny,{xPercent:42,yPercent:55,rotate:12,opacity:.12,duration:.35},.7);
  });

  document.querySelectorAll('.precision-svg path').forEach((p,i)=>gsap.to(p,{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:'.brow-media',start:'top 70%',end:'bottom 28%',scrub:1},delay:i*.1}));

  const track=document.querySelector('.track');
  if(track){
    const getX=()=>Math.max(0,track.scrollWidth-innerWidth+80);
    gsap.to(track,{x:()=>-getX(),ease:'none',scrollTrigger:{trigger:'.portfolio',start:'top top',end:'bottom bottom',scrub:1,invalidateOnRefresh:true}});
    gsap.to('.portfolio-head',{yPercent:-70,opacity:.2,ease:'none',scrollTrigger:{trigger:'.portfolio',start:'top top',end:'55% top',scrub:1}});
  }

  const artist=document.querySelector('.artist');
  if(artist){
    const at=gsap.timeline({scrollTrigger:{trigger:artist,start:'top top',end:'bottom bottom',scrub:1}});
    at.fromTo('.artist-photo',{scale:.74,yPercent:18,rotate:-5},{scale:1.08,yPercent:-5,rotate:0,duration:1},0)
      .fromTo('.artist-grid>div:last-child',{xPercent:22,opacity:.25},{xPercent:-5,opacity:1,duration:.55},0)
      .to('.artist-grid>div:last-child',{yPercent:-24,opacity:.12,duration:.45},.6);
  }

  gsap.to('.final-bg',{scale:1.16,yPercent:-4,ease:'none',scrollTrigger:{trigger:'.final',start:'top bottom',end:'bottom top',scrub:1}});
  gsap.to('.closing-rings',{scale:1.35,rotate:26,ease:'none',scrollTrigger:{trigger:'.final',start:'top bottom',end:'bottom top',scrub:1}});

  document.querySelectorAll('.route-hero-bg img').forEach(img=>gsap.to(img,{scale:1.12,y:55,ease:'none',scrollTrigger:{trigger:'.route-hero',start:'top top',end:'bottom top',scrub:true}}));
  document.querySelectorAll('.service').forEach((el,i)=>gsap.from(el,{y:45,opacity:0,duration:.7,delay:i*.04,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}}));

  ScrollTrigger.create({start:40,onUpdate:self=>document.querySelector('.nav')?.classList.toggle('scrolled',self.scroll()>40)});
  const scenes=[...document.querySelectorAll('[data-scene]')],dots=[...document.querySelectorAll('.hud i')];
  scenes.forEach(s=>ScrollTrigger.create({trigger:s,start:'top center',end:'bottom center',onToggle:x=>{if(x.isActive){const n=+s.dataset.scene;dots.forEach((d,i)=>d.classList.toggle('active',i===n))}}}));
  ScrollTrigger.refresh();
}
document.addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',(e.clientX/innerWidth*100)+'%');document.documentElement.style.setProperty('--my',(e.clientY/innerHeight*100)+'%')});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="/"]');if(!a||a.target)return;const href=a.getAttribute('href');if(!routes[href]&&href!=='/')return;e.preventDefault();history.pushState({},'',href);render()});window.addEventListener('popstate',render);render();
