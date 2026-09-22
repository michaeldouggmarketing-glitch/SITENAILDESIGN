/* Maíra — Impeccable motion: progressive enhancement, never scroll hijacking */
function initMotion(){
 if(window.__mairaMotionCleanup)window.__mairaMotionCleanup();
 const q=(s,el=document)=>el.querySelector(s),qa=(s,el=document)=>[...el.querySelectorAll(s)];
 const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
 const lerp=(a,b,t)=>a+(b-a)*clamp(t);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const media=matchMedia('(max-width: 767px)');
 let frame=0,closed=false;
 const update=()=>{
  frame=0;if(closed)return;
  const vh=innerHeight;
  const max=Math.max(1,document.documentElement.scrollHeight-vh);
  const progress=q('.progress');if(progress)progress.style.transform='scaleX('+clamp(scrollY/max)+')';
  const nav=q('.nav');if(nav)nav.classList.toggle('scrolled',scrollY>36);
  const hero=q('.hero');
  if(hero&&!reduced){
   const rect=hero.getBoundingClientRect();
   const p=clamp(-rect.top/Math.max(vh,rect.height));
   const img=q('.hero-media',hero);
   if(img)img.style.transform='translate3d(0,'+lerp(0,30,p)+'px,0) scale('+lerp(1,1.075,p)+')';
  }
  if(!reduced){
   const cinema=q('.cinema-interlude');
   if(cinema){
    const r=cinema.getBoundingClientRect(),p=clamp((vh-r.top)/(vh+r.height));
    const video=q('.cinema-video',cinema);
    if(video)video.style.transform='translate3d(0,'+lerp(12,-12,p)+'px,0) scale('+lerp(1.03,1.085,p)+')';
    const a=q('.beat-1',cinema),b=q('.beat-2',cinema);
    if(a){a.style.opacity=String(clamp((.70-p)*3.1,.12,1));a.style.transform='translate3d(0,'+lerp(9,-10,p)+'px,0)'}
    if(b){b.style.opacity=String(clamp((p-.28)*3.2,0,1));b.style.transform='translate3d(0,'+lerp(12,-8,p)+'px,0)'}
   }
   qa('.chapter').forEach(section=>{
    const rect=section.getBoundingClientRect();
    if(rect.bottom<0||rect.top>vh)return;
    const p=clamp((vh-rect.top)/(vh+rect.height));
    const main=q('.frame.main',section),small=q('.frame.small',section),tiny=q('.frame.tiny',section);
    if(main)main.style.transform='translate3d(0,'+lerp(16,-13,p)+'px,0) scale('+lerp(.985,1.015,p)+')';
    if(small)small.style.transform='translate3d(0,'+lerp(13,-14,p)+'px,0) rotate('+lerp(1.5,-1,p)+'deg)';
    if(tiny)tiny.style.transform='translate3d(0,'+lerp(-12,10,p)+'px,0) rotate('+lerp(-1.2,1,p)+'deg)';
   });
   qa('.route-hero-bg img').forEach(img=>{
    const rect=img.closest('.route-hero').getBoundingClientRect();
    const p=clamp(-rect.top/Math.max(vh,rect.height));
    img.style.transform='translate3d(0,'+lerp(0,18,p)+'px,0) scale('+lerp(1,1.045,p)+')';
   });
  }
 };
 const request=()=>{if(!frame)frame=requestAnimationFrame(update)};
 addEventListener('scroll',request,{passive:true});addEventListener('resize',request,{passive:true});
 const io=new IntersectionObserver(entries=>{
  for(const e of entries){
   if(e.target.tagName==='VIDEO'){
    if(e.isIntersecting&&!reduced){e.target.play().catch(()=>{})}
    else e.target.pause();
    continue;
   }
   if(e.isIntersecting){e.target.classList.add('entered');io.unobserve(e.target)}
  }
 },{rootMargin:'80px 0px -5% 0px',threshold:.01});
 qa('video').forEach(v=>{v.muted=true;v.playsInline=true;v.preload='metadata';io.observe(v)});
 qa('.method-steps article,.experience-row,.feature-service,.about-grid,.gallery-heading,.section-heading').forEach(el=>io.observe(el));
 if(!reduced){
  qa('.precision-svg path').forEach((path,i)=>{
   const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){path.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:950+i*160,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});observer.disconnect()}})
   },{threshold:.2});observer.observe(path);
  });
 }
 document.querySelectorAll('.cinema-beat').forEach(x=>{x.style.filter='none'});
 request();
 window.__mairaMotionCleanup=()=>{closed=true;if(frame)cancelAnimationFrame(frame);removeEventListener('scroll',request);removeEventListener('resize',request);io.disconnect()};
}
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="/"]');if(!a||a.target||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const raw=a.getAttribute('href'),url=new URL(raw,location.origin),href=url.pathname;
 if(!routes[href]&&href!=='/')return;
 e.preventDefault();history.pushState({},'',url.pathname+url.search);render();
});
window.addEventListener('popstate',render);
render();
