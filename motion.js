
function initMotion(){
  if(window.__motionCleanup) window.__motionCleanup();

  const q=(s,c=document)=>c.querySelector(s);
  const qa=(s,c=document)=>[...c.querySelectorAll(s)];
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const mix=(a,b,t)=>a+(b-a)*clamp(t);
  const ease=t=>1-Math.pow(1-clamp(t),3);
  const mobile=()=>innerWidth<=900;

  let raf=0,dead=false;
  const onFrame=()=>{
    raf=0;if(dead)return;
    const vh=innerHeight;
    const maxScroll=Math.max(1,document.documentElement.scrollHeight-vh);
    const pageP=clamp(scrollY/maxScroll);

    const progress=q('.progress'); if(progress)progress.style.transform='scaleX('+pageP+')';
    const thread=q('#threadPath'); if(thread)thread.style.strokeDashoffset=String(1-pageP);
    const nav=q('.nav'); if(nav)nav.classList.toggle('scrolled',scrollY>32);

    // Hero: immediate response, no delayed timeline
    const hero=q('.hero');
    if(hero){
      const r=hero.getBoundingClientRect();
      const travel=Math.max(1,hero.offsetHeight-vh);
      const p=clamp(-r.top/travel);
      const media=q('.hero-media',hero),video=q('.hero-video',hero),copy=q('.hero-copy-inner',hero),orb=q('.lacquer-orb',hero),cut=q('.cinema-cut',hero);
      if(media) media.style.transform='translate3d(0,'+mix(0,mobile()?28:58,p)+'px,0) scale('+mix(1,mobile()?1.12:1.24,ease(p))+')';
      if(video) video.style.filter='saturate('+mix(.86,.68,p)+') contrast('+mix(1.08,1.18,p)+') brightness('+mix(.77,.52,p)+')';
      if(copy){
        copy.style.transform='translate3d('+mix(0,mobile()?-18:-70,p)+'px,'+mix(0,mobile()?-34:-72,p)+'px,0) scale('+mix(1,.95,p)+')';
        copy.style.opacity=String(mix(1,.48,p));
      }
      if(orb){
        const op=clamp((p-.08)/.92);
        orb.style.transform='translate3d('+mix(0,mobile()?-16:-26,op)+'vw,'+mix(0,mobile()?-12:-20,op)+'vh,0) rotate('+mix(0,28,op)+'deg) scale('+mix(1,mobile()?2.8:4.4,op)+')';
      }
      if(cut){
        const cp=mix(0,150,clamp((p-.72)/.28));
        cut.style.clipPath='circle('+cp+'% at 78% 82%)';
      }
    }

    // CVD Cinematic proof: camera physically enters the nail reflection.
    const reflection=q('.reflection-hero');
    if(reflection){
      const r=reflection.getBoundingClientRect();
      const travel=Math.max(1,reflection.offsetHeight-vh);
      const p=clamp(-r.top/travel);
      const nail=q('.reflection-nail',reflection),copy=q('.reflection-copy',reflection),ring=q('.reflection-ring',reflection),portal=q('.reflection-portal',reflection);
      if(nail){
        const zoom=ease(clamp(p/.72));
        nail.style.transform='translate3d('+mix(0,mobile()?-16:-7,zoom)+'vw,'+mix(0,mobile()?-8:-4,zoom)+'vh,0) scale('+mix(1,mobile()?1.72:1.9,zoom)+')';
        nail.style.filter='saturate('+mix(1,.86,p)+') contrast('+mix(1,1.12,p)+') brightness('+mix(1,.64,p)+')';
      }
      if(copy){
        const out=clamp((p-.08)/.5);
        copy.style.transform='translate3d(0,'+mix(0,-56,out)+'px,0) scale('+mix(1,.96,out)+')';
        copy.style.opacity=String(1-out*.9);
      }
      if(ring){
        const rp=clamp((p-.06)/.58);
        ring.style.transform='translate(-50%,-50%) scale('+mix(1,2.8,rp)+') rotate('+mix(0,18,rp)+'deg)';
        ring.style.opacity=String(mix(1,.08,clamp((p-.38)/.38)));
      }
      if(portal){
        const open=clamp((p-.24)/.62);
        const radius=mix(0,165,ease(open));
        const x=mobile()?67:66,y=mobile()?39:43;
        portal.style.clipPath='circle('+radius+'% at '+x+'% '+y+'%)';
        portal.style.transform='scale('+mix(1,1.16,open)+') rotate('+mix(0,-3,open)+'deg)';
        portal.style.filter='brightness('+mix(.82,1.04,open)+') saturate('+mix(.92,1.08,open)+')';
      }
    }

    // Generic visible progress: starts as soon as section reaches viewport
    const visibleP=el=>{
      const r=el.getBoundingClientRect();
      return clamp((vh-r.top)/(vh+r.height));
    };

    const inside=q('.inside-lacquer');
    if(inside){
      const p=visibleP(inside),bg=q('.inside-bg',inside),copy=q('.inside-copy',inside);
      if(bg) bg.style.transform='translate3d('+mix(0,-3,p)+'vw,'+mix(34,-36,p)+'px,0) scale('+mix(1.05,1.22,p)+') rotate('+mix(-1.5,2,p)+'deg)';
      if(copy){
        copy.style.transform='translate3d('+mix(-28,14,p)+'px,'+mix(24,-14,p)+'px,0)';
        copy.style.opacity=String(mix(.58,1,clamp(p*1.7)));
      }
    }

    const emerge=q('.emerge-scene');
    if(emerge){
      const p=visibleP(emerge),media=q('.emerge-media',emerge),copy=q('.emerge-copy',emerge),line=q('.emerge-line',emerge);
      if(media) media.style.transform='translate3d(0,'+mix(28,-32,p)+'px,0) scale('+mix(1.06,1.18,p)+')';
      if(copy) copy.style.transform='translate3d('+mix(-26,10,p)+'px,'+mix(34,-18,p)+'px,0)';
      if(line) line.style.transform='translate3d('+mix(-12,8,p)+'vw,'+mix(24,-20,p)+'px,0) rotate('+mix(-7,-2,p)+'deg)';
    }

    const next=q('.proof-next');
    if(next){
      const p=visibleP(next),media=q('.proof-next-media',next),copy=q('.proof-next-copy',next);
      if(media) media.style.transform='translate3d(0,'+mix(28,-24,p)+'px,0) scale('+mix(1.03,1.13,p)+')';
      if(copy) copy.style.transform='translate3d('+mix(-20,8,p)+'px,'+mix(22,-12,p)+'px,0)';
    }

    const manifest=q('.manifest');
    if(manifest){
      const p=visibleP(manifest),a=q('.portrait-a',manifest),b=q('.portrait-b',manifest),copy=manifest.querySelector('.manifest-grid>div:first-child');
      if(copy) copy.style.transform='translate3d(0,'+mix(18,-16,p)+'px,0)';
      if(a) a.style.transform='translate3d(0,'+mix(46,-22,p)+'px,0) rotate('+mix(-3,1,p)+'deg) scale('+mix(.96,1.035,p)+')';
      if(b) b.style.transform='translate3d('+mix(24,-12,p)+'px,'+mix(58,-26,p)+'px,0) rotate('+mix(6,-3,p)+'deg)';
    }

    // Universes: no opacity choreography on mobile; stable native horizontal cards
    const universes=q('.universes');
    if(universes){
      const p=visibleP(universes);
      const cards=qa('.universe-card',universes);
      cards.forEach((card,i)=>{
        if(mobile()){
          card.style.opacity='1';
          card.style.transform='';
        }else{
          const local=clamp(p*1.4-i*.12);
          card.style.transform='translate3d(0,'+mix(34,-20,local)+'px,0) rotate('+mix((i-1)*2.5,(1-i)*1.2,local)+'deg) scale('+mix(.94,1.02,local)+')';
          card.style.opacity=String(mix(.62,1,local));
        }
      });
    }

    const cinema=q('.cinema-interlude');
    if(cinema){
      const p=visibleP(cinema),vid=q('.cinema-video',cinema),b1=q('.beat-1',cinema),b2=q('.beat-2',cinema),note=q('.cinema-note',cinema);
      if(vid) vid.style.transform='translate3d(0,'+mix(24,-26,p)+'px,0) scale('+mix(1.03,1.17,p)+')';
      if(b1){
        const o=clamp(1-Math.abs(p-.38)*3.2);
        b1.style.opacity=String(o);
        b1.style.transform='translate3d(0,'+mix(55,-45,p)+'px,0) scale('+mix(.9,1.04,p)+')';
      }
      if(b2){
        const o=clamp(1-Math.abs(p-.68)*3.2);
        b2.style.opacity=String(o);
        b2.style.transform='translate3d(0,'+mix(65,-24,p)+'px,0) scale('+mix(.92,1.02,p)+')';
      }
      if(note) note.style.transform='translateY('+mix(15,-14,p)+'px)';
    }

    qa('.chapter').forEach((section,i)=>{
      const p=visibleP(section),main=q('.frame.main',section),small=q('.frame.small',section),tiny=q('.frame.tiny',section),copy=q('.copy',section);
      const dir=i%2?1:-1;
      if(copy) copy.style.transform='translate3d('+mix(dir*18,0,p)+'px,'+mix(22,-14,p)+'px,0)';
      if(main) main.style.transform='translate3d(0,'+mix(34,-26,p)+'px,0) rotate('+mix(dir*2.2,0,p)+'deg) scale('+mix(.97,1.045,p)+')';
      if(small) small.style.transform='translate3d('+mix(dir*30,-dir*12,p)+'px,'+mix(48,-24,p)+'px,0) rotate('+mix(dir*7,-dir*3,p)+'deg)';
      if(tiny) tiny.style.transform='translate3d('+mix(-dir*24,dir*10,p)+'px,'+mix(-28,24,p)+'px,0) rotate('+mix(-dir*6,dir*2,p)+'deg)';
      if(section.dataset.word==='PRECISÃO'){
        qa('.precision-svg path',section).forEach((path,j)=>path.style.strokeDashoffset=String(1-clamp((p-.2-j*.07)/.55)));
      }
    });

    qa('.rail').forEach(rail=>{
      qa('[data-rail-item]',rail).forEach(card=>{
        const r=card.getBoundingClientRect();
        const center=r.left+r.width/2;
        const t=clamp(1-Math.abs(center-innerWidth/2)/(innerWidth*.8));
        card.style.transform='translate3d(0,'+mix(8,-7,t)+'px,0) scale('+mix(.97,1.015,t)+')';
        card.style.opacity=String(mix(.76,1,t));
      });
    });

    const artist=q('.artist');
    if(artist){
      const p=visibleP(artist),photo=q('.artist-photo',artist),copy=artist.querySelector('.artist-grid>div:last-child');
      if(photo) photo.style.transform='translate3d(0,'+mix(34,-24,p)+'px,0) rotate('+mix(-2.4,.5,p)+'deg) scale('+mix(.98,1.03,p)+')';
      if(copy) copy.style.transform='translate3d('+mix(22,-8,p)+'px,'+mix(18,-12,p)+'px,0)';
    }

    qa('.route-hero').forEach(section=>{
      const p=visibleP(section),img=q('.route-hero-bg img',section),copy=q('.route-hero-copy',section);
      if(img) img.style.transform='translate3d(0,'+mix(20,-40,p)+'px,0) scale('+mix(1.03,1.12,p)+')';
      if(copy) copy.style.transform='translate3d(0,'+mix(24,-12,p)+'px,0)';
    });

    qa('.route-story').forEach(section=>{
      const p=visibleP(section),copy=q('.route-story-copy',section);
      if(copy) copy.style.transform='translate3d(0,'+mix(18,-12,p)+'px,0)';
      qa('[data-service-card]',section).forEach((card,i)=>{
        const r=card.getBoundingClientRect();
        const vis=clamp((vh-r.top)/(vh*.9));
        card.style.transform='translate3d('+mix(i%2?18:-18,0,ease(vis))+'px,'+mix(26,0,ease(vis))+'px,0)';
        card.style.opacity=String(mix(.45,1,vis));
      });
    });

    qa('.route-cinema').forEach(section=>{
      const p=visibleP(section),media=q('.route-cinema-media',section),copy=q('.route-cinema-copy',section);
      if(media) media.style.transform='translate3d(0,'+mix(22,-22,p)+'px,0) scale('+mix(1.03,1.13,p)+')';
      if(copy) copy.style.transform='translate3d('+mix(-22,8,p)+'px,'+mix(30,-14,p)+'px,0)';
    });

    const final=q('.final');
    if(final){
      const p=visibleP(final),bg=q('.final-bg',final);
      if(bg) bg.style.transform='translate3d(0,'+mix(20,-22,p)+'px,0) scale('+mix(1.07,1.15,p)+')';
    }
  };

  const schedule=()=>{if(!raf)raf=requestAnimationFrame(onFrame)};
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});

  // entrance reveal
  document.body.classList.add('ready');
  qa('.hero-line>span').forEach((el,i)=>{
    el.style.transition='transform 1.05s '+(i*.09)+'s var(--ease),filter 1s '+(i*.09)+'s';
    requestAnimationFrame(()=>{el.style.transform='translateY(0)';el.style.filter='blur(0)'});
  });
  const sub=q('.hero-sub'),acts=q('.hero-actions');
  if(sub){sub.style.transition='opacity .8s .45s,transform .8s .45s';sub.style.opacity='1';sub.style.transform='translateY(0)'}
  if(acts){acts.style.transition='opacity .8s .58s,transform .8s .58s';acts.style.opacity='1';acts.style.transform='translateY(0)'}
  const pre=q('.preloader');if(pre){pre.style.transition='opacity .5s ease';pre.style.opacity='0';setTimeout(()=>pre.remove(),560)}

  // elements animate as soon as they enter, never late
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.classList.add('is-in');
      if(e.target.animate)e.target.animate([{opacity:.3,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
      io.unobserve(e.target);
    })
  },{rootMargin:'0px 0px -8% 0px',threshold:.06});
  qa('.service,.ritual-card,.quote,.rail-head,.route-cinema-copy').forEach(el=>io.observe(el));

  // tactile button effect
  const clickFx=e=>{
    const b=e.target.closest('.btn,.choice,.rail-btn');
    if(!b)return;
    const r=b.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    const dot=document.createElement('i');
    dot.style.cssText='position:absolute;left:'+x+'px;top:'+y+'px;width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.34);transform:translate(-50%,-50%) scale(0);pointer-events:none;z-index:9';
    b.style.position='relative';b.appendChild(dot);
    dot.animate([{transform:'translate(-50%,-50%) scale(0)',opacity:.8},{transform:'translate(-50%,-50%) scale(18)',opacity:0}],{duration:520,easing:'ease-out'}).onfinish=()=>dot.remove();
  };
  document.addEventListener('pointerdown',clickFx);

  onFrame();
  window.__motionCleanup=()=>{
    dead=true;if(raf)cancelAnimationFrame(raf);
    removeEventListener('scroll',schedule);removeEventListener('resize',schedule);
    document.removeEventListener('pointerdown',clickFx);io.disconnect();
  };
}

document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="/"]');
  if(!a||a.target)return;
  const href=a.getAttribute('href');
  if(!routes[href]&&href!=='/')return;
  e.preventDefault();
  const change=()=>{history.pushState({},'',href);render()};
  if(document.startViewTransition) document.startViewTransition(change);
  else change();
});
window.addEventListener('popstate',()=>{if(document.startViewTransition)document.startViewTransition(()=>render());else render()});
render();
