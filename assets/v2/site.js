(() => {
  'use strict';
  const toggle=document.querySelector('.menu-toggle');
  const mobile=document.getElementById('mobile-nav');
  function closeMenu(){if(mobile){mobile.hidden=true;} if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}}
  if(toggle && mobile){
    toggle.addEventListener('click',()=>{
      const opening=mobile.hidden;
      mobile.hidden=!opening;
      toggle.setAttribute('aria-expanded',String(opening));
      toggle.setAttribute('aria-label',opening?'Close navigation':'Open navigation');
    });
    mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  }
  const year=document.getElementById('year');
  if(year)year.textContent=String(new Date().getFullYear());
  const gallery=[
    ['01_Track_Dashboard.webp','Track dashboard — MotoCoach 2.0 development preview'],
    ['02_Pit_Wall_Lap_Timer.webp','Manual pit-wall lap timer — development preview'],
    ['03_Race_Intelligence_Demo.webp','Race intelligence — SAMPLE DATA, not a real session'],
    ['04_Garage_Setup.webp','My Garage setup and tyre notes — development preview'],
    ['05_Trackside_Welcome.webp','Narrated welcome tour — development preview'],
    ['06_Coach_Debrief_Demo.webp','Coaching notebook — SAMPLE DATA, not a real session']
  ];
  const dialog=document.querySelector('.lightbox');
  if(!dialog)return;
  const img=dialog.querySelector('figure img');
  const caption=dialog.querySelector('figcaption');
  const btnClose=dialog.querySelector('.lightbox-close');
  let current=0;
  let lastFocus=null;
  function render(){
    if(!img||!caption)return;
    img.src='/assets/v2/'+gallery[current][0];
    img.alt=gallery[current][1];
    caption.textContent=(current+1)+' / '+gallery.length+' — '+gallery[current][1];
  }
  function openAt(idx){
    lastFocus=document.activeElement;
    current=(idx+gallery.length)%gallery.length;
    render();
    dialog.hidden=false;
    document.body.classList.add('lightbox-open');
    btnClose.focus();
  }
  function close(){
    dialog.hidden=true;
    img.removeAttribute('src');
    document.body.classList.remove('lightbox-open');
    if(lastFocus && typeof lastFocus.focus==='function')lastFocus.focus();
  }
  document.querySelectorAll('[data-lightbox]').forEach(b=>{
    b.addEventListener('click',()=>openAt(Number(b.getAttribute('data-lightbox'))||0));
  });
  btnClose.addEventListener('click',close);
  dialog.querySelector('.lightbox-prev').addEventListener('click',()=>{current=(current-1+gallery.length)%gallery.length;render();});
  dialog.querySelector('.lightbox-next').addEventListener('click',()=>{current=(current+1)%gallery.length;render();});
  dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
  document.addEventListener('keydown',e=>{
    if(dialog.hidden)return;
    if(e.key==='Escape'){e.preventDefault();close();}
    if(e.key==='ArrowLeft'){e.preventDefault();current=(current-1+gallery.length)%gallery.length;render();}
    if(e.key==='ArrowRight'){e.preventDefault();current=(current+1)%gallery.length;render();}
    if(e.key==='Tab'){
      const focusables=[...dialog.querySelectorAll('button')].filter(x=>!x.disabled);
      const i=focusables.indexOf(document.activeElement);
      if(e.shiftKey && i===0){e.preventDefault();focusables.at(-1).focus();}
      if(!e.shiftKey && i===focusables.length-1){e.preventDefault();focusables[0].focus();}
    }
  });
})();