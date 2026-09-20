
function initMotion(){
  if(window.__motionCleanup) window.__motionCleanup();

  const root=document.documentElement;
  const body=document.body;
  const q=(s,ctx=document)=>ctx.querySelector(s);
  const qa=(s,ctx=document)=>[...ctx.querySelectorAll(s)];
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const mix=(a,b,t)=>a+(b-a)*clamp(t);
  const ease=t=>1-Math.pow(1-clamp(t),3);
  const span=(p,a,b)=>clamp((p-a)/(b-a));
  const fadeWindow=(p,enterA,enterB,exitA,exitB)=>{
    const enter=span(p,enterA,enterB);
    const exit=1-span(p,exitA,exitB);
    return clamp(Math.min(enter,exit));
  };
  const progressOf=el=>{
    if(!el) return 0;
    const r=el.getBoundingClientRect();
    const travel=Math.max(1,el.offsetHeight-window.innerHeight);
    return clamp(-r.top/travel);
  };

  let dead=false,raf=0;
  const hero=q('.hero'),manifest=q('.manifest'),universes=q('.universes'),cinema=q('.cinema-interlude');
  const chapters=qa('.chapter'),portfolio=q('.portfolio'),artist=q('.artist'),final=q('.final');
  const progressBar=q('.progress'),thread=q('#threadPath'),nav=q('.nav');

  const renderMotion=()=>{
    raf=0;
    if(dead)return;

    const maxScroll=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const pageP=clamp(window.scrollY/maxScroll);
    if(progressBar) progressBar.style.transform='scaleX('+pageP+')';
    if(thread) thread.style.strokeDashoffset=String(1-pageP);
    if(nav) nav.classList.toggle('scrolled',window.scrollY>36);

    if(hero){
      const p=progressOf(hero),ep=ease(p);
      const media=q('.hero-media',hero),video=q('.hero-video',hero),copy=q('.hero-copy-inner',hero),orb=q('.lacquer-orb',hero),cut=q('.cinema-cut',hero);
      if(media) media.style.transform='translate3d(0,'+mix(0,70,p)+'px,0) scale('+mix(1,1.32,ep)+')';
      if(video) video.style.filter='saturate('+mix(.84,.62,p)+') contrast('+mix(1.08,1.2,p)+') brightness('+mix(.78,.48,p)+')';
      if(copy){copy.style.transform='translate3d('+mix(0,-7,p)+'vw,'+mix(0,-95,p)+'px,0) scale('+mix(1,.92,p)+')';copy.style.opacity=String(clamp(1-p*1.15));}
      if(orb){const op=span(p,.12,.92);orb.style.transform='translate3d('+mix(0,-34,op)+'vw,'+mix(0,-28,op)+'vh,0) rotate('+mix(0,36,op)+'deg) scale('+mix(1,6.4,op)+')';orb.style.opacity=String(mix(.9,.72,op));}
      if(cut){const cp=mix(0,155,span(p,.62,1));cut.style.clipPath='circle('+cp+'% at 78% 82%)';}
    }

    if(manifest){
      const p=progressOf(manifest);
      const copy=manifest.querySelector('.manifest-grid>div:first-child');
      const a=q('.portrait-a',manifest),b=q('.portrait-b',manifest);
      if(copy){const out=span(p,.68,1);copy.style.transform='translate3d('+mix(-24,18,p)+'px,'+mix(24,-38,out)+'px,0)';copy.style.opacity=String(1-out*.78);}
      if(a)a.style.transform='translate3d(0,'+mix(85,-34,p)+'px,0) rotate('+mix(-5,1,p)+'deg) scale('+mix(.88,1.08,p)+')';
      if(b){b.style.transform='translate3d('+mix(88,-28,p)+'px,'+mix(96,-46,p)+'px,0) rotate('+mix(11,-5,p)+'deg) scale('+mix(.72,1.08,p)+')';b.style.opacity=String(mix(.24,1,span(p,.02,.42)));}
    }

    if(universes){
      const p=progressOf(universes),cards=[q('.u1',universes),q('.u2',universes),q('.u3',universes)];
      const configs=[
        {ea:0,eb:.01,xa:.24,xb:.35,dir:-1},
        {ea:.18,eb:.30,xa:.52,xb:.64,dir:1},
        {ea:.47,eb:.60,xa:1.08,xb:1.1,dir:-1}
      ];
      cards.forEach((card,i)=>{
        if(!card)return;
        const c=configs[i];
        let opacity=1,x=0,y=0,scale=1,rot=0;
        if(p<c.eb){
          const t=span(p,c.ea,c.eb);
          opacity=t; x=mix(c.dir*34,0,ease(t)); y=mix(22,0,ease(t)); scale=mix(.78,1,ease(t)); rot=mix(c.dir*7,0,ease(t));
        }else if(p>=c.xa){
          const t=span(p,c.xa,c.xb);
          opacity=1-t; x=mix(0,c.dir*-38,ease(t)); y=mix(0,-26,ease(t)); scale=mix(1,.74,ease(t)); rot=mix(0,c.dir*-8,ease(t));
        }
        card.style.opacity=String(clamp(opacity));
        card.style.transform='translate3d('+x+'vw,'+y+'vh,0) rotate('+rot+'deg) scale('+scale+')';
        card.style.pointerEvents=opacity>.6?'auto':'none';
      });
      const head=q('.u-head',universes);
      if(head){head.style.transform='translate3d(-50%,'+mix(0,-46,p)+'px,0)';head.style.opacity=String(mix(1,.38,span(p,.65,1)));}
    }

    if(cinema){
      const p=progressOf(cinema),vid=q('.cinema-video',cinema),b1=q('.beat-1',cinema),b2=q('.beat-2',cinema),note=q('.cinema-note',cinema);
      if(vid){vid.style.transform='translate3d(0,'+mix(0,-6,p)+'vh,0) scale('+mix(1.02,1.32,p)+')';vid.style.filter='saturate('+mix(.78,.62,p)+') contrast('+mix(1.12,1.24,p)+') brightness('+mix(.56,.36,p)+')';}
      if(b1){const o=fadeWindow(p,0,.1,.38,.53);b1.style.opacity=String(o);b1.style.transform='translate3d(0,'+mix(110,-105,span(p,0,.53))+'px,0) scale('+mix(.82,1.08,span(p,0,.53))+')';b1.style.filter='blur('+mix(12,0,span(p,.05,.25))+'px)';}
      if(b2){const o=fadeWindow(p,.38,.54,.92,1);b2.style.opacity=String(o);b2.style.transform='translate3d(0,'+mix(120,-30,span(p,.38,1))+'px,0) scale('+mix(.84,1.03,span(p,.38,.78))+')';b2.style.filter='blur('+mix(13,0,span(p,.42,.65))+'px)';}
      if(note){note.style.opacity=String(mix(.72,.16,span(p,.62,1)));note.style.transform='translateY('+mix(0,-28,span(p,.62,1))+'px)';}
    }

    chapters.forEach((section,index)=>{
      const p=progressOf(section),main=q('.frame.main',section),small=q('.frame.small',section),tiny=q('.frame.tiny',section),copy=q('.copy',section);
      const dir=index%2?1:-1;
      if(main){
        main.style.transform='translate3d(0,'+mix(70,-35,p)+'px,0) rotate('+mix(dir*3,0,p)+'deg) scale('+mix(.78,1.15,ease(p))+')';
        const inset=mix(9,0,span(p,.02,.58));
        main.style.clipPath='inset('+inset+'% '+inset+'% '+inset+'% '+inset+'% round '+mix(34,4,span(p,.02,.58))+'px)';
      }
      if(copy){
        const settle=span(p,0,.34),tail=span(p,.82,1);
        copy.style.transform='translate3d('+mix(dir*34,0,settle)+'px,'+mix(28,-18,tail)+'px,0) scale('+mix(1,.97,tail)+')';
        copy.style.opacity=String(mix(.58,1,settle)*(1-tail*.2));
      }
      if(small){
        const inT=span(p,.08,.5),outT=span(p,.72,1);
        small.style.transform='translate3d('+mix(34,-8,ease(inT))+'vw,'+mix(28,-10,ease(inT))+'vh,0) rotate('+mix(14,-4,inT)+'deg) translate3d('+mix(0,-20,outT)+'vw,'+mix(0,-24,outT)+'vh,0)';
        small.style.opacity=String((.15+.85*inT)*(1-outT*.42));
      }
      if(tiny){
        const inT=span(p,.15,.56),outT=span(p,.75,1);
        tiny.style.transform='translate3d('+mix(-30,8,ease(inT))+'vw,'+mix(-24,10,ease(inT))+'vh,0) rotate('+mix(-15,5,inT)+'deg)';
        tiny.style.opacity=String((.08+.92*inT)*(1-outT*.5));
      }
      if(section.matches('[data-word="PRECISÃO"]')){
        qa('.precision-svg path',section).forEach((path,j)=>{path.style.strokeDashoffset=String(1-span(p,.18+j*.08,.78));});
      }
    });

    if(portfolio){
      const p=progressOf(portfolio),track=q('.track',portfolio),head=q('.portfolio-head',portfolio);
      if(track){const max=Math.max(0,track.scrollWidth-window.innerWidth+80);track.style.transform='translate3d('+(-max*p)+'px,0,0)';}
      if(head){const out=span(p,.18,.55);head.style.transform='translate3d(0,'+mix(0,-70,out)+'px,0)';head.style.opacity=String(1-out*.82);}
    }

    if(artist){
      const p=progressOf(artist),photo=q('.artist-photo',artist),copy=artist.querySelector('.artist-grid>div:last-child');
      if(photo)photo.style.transform='translate3d(0,'+mix(70,-30,p)+'px,0) rotate('+mix(-4,0,p)+'deg) scale('+mix(.84,1.07,ease(p))+')';
      if(copy){const out=span(p,.82,1);copy.style.transform='translate3d('+mix(48,-8,span(p,0,.42))+'px,'+mix(14,-16,out)+'px,0)';copy.style.opacity=String(mix(.45,1,span(p,.04,.32))*(1-out*.2));}
    }

    if(final){
      const r=final.getBoundingClientRect(),p=clamp((window.innerHeight-r.top)/(window.innerHeight+r.height));
      const bg=q('.final-bg',final);
      if(bg)bg.style.transform='translate3d(0,'+mix(22,-24,p)+'px,0) scale('+mix(1.09,1.17,p)+')';
    }

    qa('.rail .work').forEach(card=>{
      const r=card.getBoundingClientRect();
      const cx=r.left+r.width/2;
      const t=clamp(1-Math.abs(cx-window.innerWidth/2)/(window.innerWidth*.9));
      card.style.transform='translate3d(0,'+mix(10,-6,t)+'px,0) scale('+mix(.965,1,t)+')';
      card.style.opacity=String(mix(.72,1,t));
    });

    qa('.route-story').forEach(section=>{
      const r=section.getBoundingClientRect();
      const p=clamp((window.innerHeight-r.top)/(window.innerHeight+r.height));
      const copy=q('.route-story-copy',section);
      if(copy) copy.style.transform='translate3d(0,'+mix(28,-18,p)+'px,0)';
      qa('[data-service-card]',section).forEach((card,i)=>{
        const cr=card.getBoundingClientRect();
        const vis=clamp((window.innerHeight-cr.top)/(window.innerHeight*.82));
        card.style.transform='translate3d('+mix(i%2?24:-24,0,ease(vis))+'px,'+mix(34,0,ease(vis))+'px,0) rotate('+mix(i%2?2:-2,0,ease(vis))+'deg)';
        card.style.opacity=String(mix(.35,1,vis));
      });
    });

    qa('.route-cinema').forEach(section=>{
      const r=section.getBoundingClientRect();
      const p=clamp((window.innerHeight-r.top)/(window.innerHeight+r.height));
      const media=q('.route-cinema-media',section),copy=q('.route-cinema-copy',section);
      if(media) media.style.transform='translate3d(0,'+mix(28,-28,p)+'px,0) scale('+mix(1.04,1.16,p)+')';
      if(copy) copy.style.transform='translate3d('+mix(-28,12,p)+'px,'+mix(38,-18,p)+'px,0)';
    });

    qa('.route-hero').forEach(section=>{
      const r=section.getBoundingClientRect(),p=clamp(-r.top/Math.max(1,section.offsetHeight));
      const img=q('.route-hero-bg img',section);
      if(img)img.style.transform='translate3d(0,'+mix(0,55,p)+'px,0) scale('+mix(1,1.12,p)+')';
    });
  };

  const onScroll=()=>{if(!raf)raf=requestAnimationFrame(renderMotion)};
  const onResize=()=>{if(!raf)raf=requestAnimationFrame(renderMotion)};
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onResize,{passive:true});

  const preloader=q('.preloader');
  const reveal=()=>{
    body.classList.add('ready');
    qa('.hero-line>span').forEach((el,i)=>{el.style.transition='transform 1.15s '+(i*.1)+'s cubic-bezier(.16,1,.3,1),filter 1.1s '+(i*.1)+'s';el.style.transform='translateY(0)';el.style.filter='blur(0)';});
    const sub=q('.hero-sub'),actions=q('.hero-actions');
    if(sub){sub.style.transition='opacity .9s .55s,transform .9s .55s';sub.style.opacity='1';sub.style.transform='translateY(0)';}
    if(actions){actions.style.transition='opacity .9s .68s,transform .9s .68s';actions.style.opacity='1';actions.style.transform='translateY(0)';}
    if(preloader){preloader.style.transition='opacity .7s ease';preloader.style.opacity='0';setTimeout(()=>preloader.remove(),760);}
  };
  setTimeout(reveal,620);

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.animate([{opacity:.25,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
        observer.unobserve(e.target);
      }
    });
  },{threshold:.12});
  qa('.service,.ritual-card,.quote,.rail-head,.route-cinema-copy').forEach(el=>observer.observe(el));

  renderMotion();

  window.__motionCleanup=()=>{
    dead=true;
    if(raf)cancelAnimationFrame(raf);
    window.removeEventListener('scroll',onScroll);
    window.removeEventListener('resize',onResize);
    observer.disconnect();
  };
}

document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="/"]');
  if(!a||a.target)return;
  const href=a.getAttribute('href');
  if(!routes[href]&&href!=='/')return;
  e.preventDefault();
  const current=document.querySelector('#app');
  const go=()=>{history.pushState({},'',href);render();};
  if(current?.animate){
    const anim=current.animate([{opacity:1,filter:'blur(0)',transform:'scale(1)'},{opacity:0,filter:'blur(10px)',transform:'scale(.992)'}],{duration:260,easing:'cubic-bezier(.55,0,1,.45)',fill:'forwards'});
    anim.onfinish=go;
  }else go();
});
window.addEventListener('popstate',render);
render();
