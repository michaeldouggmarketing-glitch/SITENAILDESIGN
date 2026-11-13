// Scoped enhancement for the approved Maíra Cinematic V1.
(function(){
 const app=document.querySelector('#app');
 const menu=document.querySelector('#mobile-nav');
 const toggle=document.querySelector('.mobile-nav-toggle');
 if(menu&&toggle){
   toggle.addEventListener('click',()=>{
     const opened=!menu.classList.contains('open');
     menu.classList.toggle('open',opened);
     toggle.setAttribute('aria-expanded',String(opened));
     toggle.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu');
   });
   menu.addEventListener('click',event=>{
     if(event.target.closest('a')){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
   });
   document.addEventListener('keydown',event=>{
     if(event.key==='Escape'){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
   });
   document.addEventListener('click',event=>{
     if(!event.target.closest('.nav')&&menu.classList.contains('open')){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
   });
 }
 let signatureObserver;
 if('IntersectionObserver' in window)signatureObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     if(entry.isIntersecting){
       entry.target.classList.add('is-written');
       signatureObserver.unobserve(entry.target);
     }
   });
 },{threshold:.22,rootMargin:'0px 0px -5% 0px'});
 function initSignatures(){
   document.querySelectorAll('[data-cvd-signature]').forEach(el=>{
     if(el.dataset.observed)return;
     el.dataset.observed='1';
     if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!signatureObserver){el.classList.add('is-written');return;}
     signatureObserver.observe(el);
   });
 }

 // Never send demo visitors to an invented phone number.
 let contactTimer;
 document.addEventListener('click',event=>{
   const anchor=event.target.closest('a[href*="#contato-oficial-pendente"]');
   if(!anchor)return;
   event.preventDefault();
   event.stopPropagation();
   let notice=document.getElementById('maira-contact-notice');
   if(!notice){
     notice=document.createElement('div');
     notice.id='maira-contact-notice';
     notice.setAttribute('role','status');
     notice.setAttribute('aria-live','polite');
     document.body.appendChild(notice);
   }
   notice.textContent='Esta é uma prévia do atelier. O agendamento será conectado ao WhatsApp oficial após a confirmação do contato.';
   notice.classList.add('show');
   clearTimeout(contactTimer);
   contactTimer=setTimeout(()=>notice.classList.remove('show'),6500);
 },true);

 initSignatures();
 if(app&&'MutationObserver' in window)new MutationObserver(initSignatures).observe(app,{childList:true,subtree:false});
 window.addEventListener('pageshow',initSignatures);
 // Never trap the visitor behind a branded preloader if a third-party motion CDN is unreachable.
 window.setTimeout(()=>document.querySelector('.preloader')?.remove(),2700);
})();
