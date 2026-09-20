
function createLiquidUniverse(canvas){
  if(!canvas) return null;
  const gl=canvas.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false});
  if(!gl){
    canvas.style.background='radial-gradient(circle at 58% 45%,#b95773 0%,#701a39 24%,#250812 62%,#080204 100%)';
    return {setProgress(){},destroy(){}};
  }
  const vertex=[
    'attribute vec2 a_position;',
    'void main(){gl_Position=vec4(a_position,0.0,1.0);}'
  ].join('\n');
  const fragment=[
    'precision highp float;',
    'uniform vec2 u_resolution;',
    'uniform vec2 u_pointer;',
    'uniform float u_time;',
    'uniform float u_progress;',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}',
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.0,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}',
    'void main(){',
    ' vec2 res=u_resolution;',
    ' vec2 p=(2.0*gl_FragCoord.xy-res.xy)/min(res.x,res.y);',
    ' vec2 pointer=(u_pointer-.5)*vec2(.25,-.18);',
    ' p-=pointer;',
    ' float t=u_time*.24;',
    ' float r=length(p);',
    ' float ang=atan(p.y,p.x);',
    ' float depth=1.0/(r+.13)+u_progress*4.8;',
    ' float swirl=sin(ang*3.0-depth*1.8+t*1.2)*.12;',
    ' swirl+=sin(ang*7.0+depth*.82-t*.7)*.055;',
    ' vec2 warped=p;',
    ' warped+=normalize(p+vec2(.0001))*swirl;',
    ' warped+=vec2(sin(warped.y*5.0+t+depth*.25),cos(warped.x*4.0-t*.8-depth*.18))*.035;',
    ' float nr=length(warped);',
    ' float tunnel=1.0/(nr+.1)+u_progress*4.2;',
    ' float layers=.5+.5*sin(tunnel*5.4-ang*2.0+t*1.6);',
    ' float layers2=.5+.5*sin(tunnel*9.1+ang*4.0-t*.8);',
    ' float veins=smoothstep(.72,.98,layers*.74+layers2*.42);',
    ' float caustic=smoothstep(.78,1.0,.5+.5*sin(tunnel*11.0+fbm(warped*5.0+t)*5.0));',
    ' float fog=smoothstep(1.25,.06,nr);',
    ' float centerGlow=exp(-nr*3.5);',
    ' vec3 black=vec3(.025,.004,.012);',
    ' vec3 oxblood=vec3(.20,.018,.075);',
    ' vec3 burgundy=vec3(.48,.055,.18);',
    ' vec3 rose=vec3(.70,.18,.31);',
    ' vec3 champagne=vec3(.96,.72,.45);',
    ' vec3 col=mix(black,oxblood,fog);',
    ' col=mix(col,burgundy,clamp(layers*.72+centerGlow*.18,0.0,1.0));',
    ' col=mix(col,rose,veins*.36);',
    ' col+=champagne*caustic*(.18+.34*centerGlow);',
    ' col+=vec3(.16,.02,.06)*fbm(warped*3.2+vec2(t,-t*.6))*.35;',
    ' float vignette=smoothstep(1.25,.22,nr);',
    ' col*=.46+.74*vignette;',
    ' col+=champagne*pow(max(0.0,1.0-nr),8.0)*.08;',
    ' gl_FragColor=vec4(col,1.0);',
    '}'
  ].join('\n');

  const compile=(type,source)=>{
    const sh=gl.createShader(type);
    gl.shaderSource(sh,source);gl.compileShader(sh);
    if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)) return null;
    return sh;
  };
  const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
  if(!vs||!fs) return {setProgress(){},destroy(){}};
  const program=gl.createProgram();
  gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)) return {setProgress(){},destroy(){}};

  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(program,'a_position');
  const uRes=gl.getUniformLocation(program,'u_resolution');
  const uTime=gl.getUniformLocation(program,'u_time');
  const uPointer=gl.getUniformLocation(program,'u_pointer');
  const uProgress=gl.getUniformLocation(program,'u_progress');

  let progress=0,dead=false,frame=0;
  const pointer={x:.56,y:.46};
  const resize=()=>{
    const dpr=Math.min(devicePixelRatio||1,innerWidth<900?1.25:1.5);
    const w=Math.max(1,Math.floor(innerWidth*dpr)),h=Math.max(1,Math.floor(innerHeight*dpr));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
  };
  const move=e=>{pointer.x=e.clientX/Math.max(1,innerWidth);pointer.y=e.clientY/Math.max(1,innerHeight);};
  addEventListener('pointermove',move,{passive:true});
  addEventListener('resize',resize,{passive:true});
  resize();

  const start=performance.now();
  const draw=now=>{
    if(dead)return;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
    gl.uniform2f(uRes,canvas.width,canvas.height);
    gl.uniform2f(uPointer,pointer.x,pointer.y);
    gl.uniform1f(uTime,(now-start)/1000);
    gl.uniform1f(uProgress,progress);
    gl.drawArrays(gl.TRIANGLES,0,6);
    frame=requestAnimationFrame(draw);
  };
  frame=requestAnimationFrame(draw);
  return {
    setProgress(v){progress=Math.max(0,Math.min(1,v));},
    destroy(){
      dead=true;cancelAnimationFrame(frame);
      removeEventListener('pointermove',move);removeEventListener('resize',resize);
      try{gl.deleteProgram(program);gl.deleteBuffer(buf);gl.deleteShader(vs);gl.deleteShader(fs);}catch(e){}
    }
  };
}


function initMotion(){
  if(window.__motionCleanup) window.__motionCleanup();

  const q=(s,c=document)=>c.querySelector(s);
  const qa=(s,c=document)=>[...c.querySelectorAll(s)];
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const mix=(a,b,t)=>a+(b-a)*clamp(t);
  const ease=t=>1-Math.pow(1-clamp(t),3);
  const mobile=()=>innerWidth<=900;
  const liquid=createLiquidUniverse(q('#liquidUniverse'));

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

    // Generic visible progress: starts as soon as section reaches viewport
    const visibleP=el=>{
      const r=el.getBoundingClientRect();
      return clamp((vh-r.top)/(vh+r.height));
    };


    const freeReflection=q('.free-reflection');
    if(freeReflection){
      const r=freeReflection.getBoundingClientRect();
      const travel=Math.max(1,freeReflection.offsetHeight-vh);
      const p=clamp(-r.top/travel);
      const media=q('.free-nail-media',freeReflection),copy=q('.free-reflection-copy',freeReflection),focus=q('.free-reflection-focus',freeReflection);
      const x=mobile()?68:72,y=mobile()?39:44;
      const open=clamp((p-.12)/.84),radius=mix(3.2,178,ease(open));
      document.documentElement.style.setProperty('--portal-x',x+'%');
      document.documentElement.style.setProperty('--portal-y',y+'%');
      document.documentElement.style.setProperty('--portal-radius',radius+'%');
      document.documentElement.style.setProperty('--liquid-opacity','1');
      document.documentElement.style.setProperty('--liquid-bright',String(mix(.82,1.05,open)));
      liquid?.setProgress(open);
      if(media){
        const z=ease(clamp(p/.92));
        media.style.transform='translate3d('+mix(0,mobile()?-12:-7,z)+'vw,'+mix(0,mobile()?-5:-3,z)+'vh,0) scale('+mix(1,mobile()?1.42:1.62,z)+')';
        media.style.filter='saturate('+mix(1,.82,p)+') brightness('+mix(1,.58,p)+')';
      }
      if(copy){
        const out=clamp((p-.08)/.54);
        copy.style.transform='translate3d(0,'+mix(0,-54,out)+'px,0) scale('+mix(1,.96,out)+')';
        copy.style.opacity=String(1-out*.92);
      }
      if(focus){
        const fp=clamp((p-.02)/.55);
        focus.style.transform='translate(-50%,-50%) scale('+mix(1,2.9,fp)+') rotate('+mix(0,22,fp)+'deg)';
        focus.style.opacity=String(mix(1,.05,clamp((p-.34)/.46)));
      }
    }

    const liquidWorld=q('.liquid-world');
    if(liquidWorld){
      const p=visibleP(liquidWorld),copy=q('.liquid-world-copy',liquidWorld),depth=q('.liquid-depth',liquidWorld);
      document.documentElement.style.setProperty('--portal-radius','180%');
      document.documentElement.style.setProperty('--liquid-opacity','1');
      liquid?.setProgress(.78+p*.22);
      if(copy){copy.style.transform='translate3d('+mix(-26,12,p)+'px,'+mix(30,-18,p)+'px,0)';copy.style.opacity=String(mix(.55,1,clamp(p*1.5)));}
      if(depth)depth.style.transform='translate3d(0,'+mix(34,-32,p)+'px,0) rotate('+mix(-2,2,p)+'deg)';
    }

    const gesture=q('.gesture-emerge');
    if(gesture){
      const p=visibleP(gesture),video=q('.gesture-video',gesture),copy=q('.gesture-copy',gesture),line=q('.gesture-contour',gesture);
      const fade=clamp((p-.05)/.56);
      document.documentElement.style.setProperty('--liquid-opacity',String(1-fade));
      liquid?.setProgress(1);
      if(video)video.style.transform='translate3d(0,'+mix(38,-26,p)+'px,0) scale('+mix(1.08,1.18,p)+')';
      if(copy)copy.style.transform='translate3d('+mix(-28,10,p)+'px,'+mix(34,-16,p)+'px,0)';
      if(line)line.style.transform='translate3d('+mix(-10,7,p)+'vw,'+mix(18,-18,p)+'px,0) rotate('+mix(-6,-2,p)+'deg)';
    }

    const pearl=q('.pearl-bridge');
    if(pearl){
      document.documentElement.style.setProperty('--liquid-opacity','0');
      const p=visibleP(pearl),media=q('.pearl-media',pearl),copy=q('.pearl-copy',pearl),rip=q('.pearl-ripple',pearl);
      if(media)media.style.transform='translate3d(0,'+mix(28,-24,p)+'px,0) scale('+mix(1.04,1.13,p)+')';
      if(copy)copy.style.transform='translate3d('+mix(-22,8,p)+'px,'+mix(24,-12,p)+'px,0)';
      if(rip)rip.style.transform='translate3d('+mix(28,-10,p)+'px,'+mix(24,-16,p)+'px,0) scale('+mix(.86,1.08,p)+')';
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
    liquid?.destroy();
    removeEventListener('scroll',schedule);removeEventListener('resize',schedule);
    document.removeEventListener('pointerdown',clickFx);io.disconnect();
  };
}

document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="/"]');
  if(!a||a.target)return;
  const href=a.getAttribute('href');
  if(!routes[href]&&href!=='/'&&href!=='/cinematic-free')return;
  e.preventDefault();
  const change=()=>{history.pushState({},'',href);render()};
  if(document.startViewTransition) document.startViewTransition(change);
  else change();
});
window.addEventListener('popstate',()=>{if(document.startViewTransition)document.startViewTransition(()=>render());else render()});
render();
